import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-tasks.component.html',
})
export class ProjectTasksComponent {
  projectId!: string;
  project: any = null;
  tasks: any[] = [];
  users: any[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.loadProject();
    this.loadTasks();
    this.loadUsers();
  }

  get user() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  loadProject() {
    this.http
      .get(`http://localhost:5208/api/projects/${this.projectId}`)
      .subscribe({
        next: (project: any) => (this.project = project),
        error: (error) => console.error('Failed to load project:', error),
      });
  }

  loadTasks() {
    this.http
      .get(`http://localhost:5208/api/tasks/project/${this.projectId}`)
      .subscribe({
        next: (tasks: any) => {
          this.tasks = tasks;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load tasks:', error);
          this.isLoading = false;
        },
      });
  }

  loadUsers() {
    this.http.get('http://localhost:5208/api/users').subscribe({
      next: (users: any) => (this.users = users),
      error: (error) => console.error('Failed to load users:', error),
    });
  }

  getAssigneeName(assigneeId: string): string {
    const user = this.users.find((u) => u.userId === assigneeId);
    return user?.name;
  }

  deleteTask(taskId: string) {
    this.http.delete(`http://localhost:5208/api/tasks/${taskId}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.taskId !== taskId);
        alert('Task deleted!');
      },
      error: (error) => alert('Failed to delete task: ' + error.message),
    });
  }
}
