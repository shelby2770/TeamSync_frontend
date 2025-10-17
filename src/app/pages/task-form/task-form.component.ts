import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  isLoading = false;
  isEdit = false;
  projectId!: string;
  taskId?: string;
  task: any = {
    title: '',
    description: '',
    status: 'To Do',
    assignee: '',
    dueDate: '',
  };
  users: any[] = [];
  project: any = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.taskId = this.route.snapshot.paramMap.get('taskId')!;
    this.isEdit = !!this.taskId;

    if (this.isEdit) {
      this.loadTask();
    } else {
      this.loadProject();
    }
  }

  get user() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  loadProject() {
    this.http
      .get(`http://localhost:5208/api/projects/${this.projectId}`)
      .subscribe({
        next: (project: any) => {
          this.project = project;
          this.loadProjectMembers();
        },
        error: (error) => console.error('Failed to load project:', error),
      });
  }

  loadProjectMembers() {
    this.http.get('http://localhost:5208/api/users').subscribe({
      next: (allUsers: any) => {
        this.users = allUsers.filter((user: any) =>
          this.project.members.includes(user.userId)
        );
      },
      error: (error) => console.error('Failed to load users:', error),
    });
  }

  loadTask() {
    this.http.get(`http://localhost:5208/api/tasks/${this.taskId}`).subscribe({
      next: (task: any) => {
        this.task = {
          ...task,
          dueDate: task.dueDate,
        };
        this.projectId = task.projectId;
        this.loadProject();
      },
      error: (error) => console.error('Failed to load task:', error),
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Please fill in required fields');
      return;
    }

    this.isLoading = true;
    const user = this.user;
    if (!user) {
      alert('You must be logged in');
      this.isLoading = false;
      return;
    }

    const taskData = {
      ...this.task,
      projectId: this.projectId,
      createdBy: user.userId,
      dueDate: this.task.dueDate || null,
    };

    const request = this.isEdit
      ? this.http.put(
          `http://localhost:5208/api/tasks/${this.taskId}`,
          taskData
        )
      : this.http.post('http://localhost:5208/api/tasks', taskData);

    request.subscribe({
      next: () => {
        alert(`Task ${this.isEdit ? 'updated' : 'created'} successfully!`);
        this.router.navigate(['/projects', this.projectId, 'tasks']);
        this.isLoading = false;
      },
      error: (error) => {
        alert(
          `Failed to ${this.isEdit ? 'update' : 'create'} task: ${
            error.message
          }`
        );
        this.isLoading = false;
      },
    });
  }
}
