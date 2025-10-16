import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent {
  isLoading = false;
  users: any[] = [];
  selectedMembers: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
  }

  get user() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  loadUsers() {
    this.http.get('http://localhost:5208/api/users').subscribe({
      next: (users: any) =>
        (this.users = users.filter((u: any) => u.userId !== this.user?.userId)),
      error: (error) => console.error('Failed to load users:', error),
    });
  }

  onMemberChange(userId: string, event: any) {
    event.target.checked
      ? this.selectedMembers.push(userId)
      : (this.selectedMembers = this.selectedMembers.filter(
          (id) => id !== userId
        ));
  }

  onCreateProject(form: NgForm) {
    if (!form.valid) {
      alert('Please fill in all required fields');
      return;
    }

    this.isLoading = true;

    const projectData = {
      name: form.value.name,
      description: form.value.description,
      createdBy: this.user.userId,
      members: [this.user.userId, ...this.selectedMembers],
    };

    this.http
      .post('http://localhost:5208/api/projects', projectData)
      .subscribe({
        next: () => {
          alert('Project created successfully!');
          this.router.navigate(['/my-projects']);
          this.isLoading = false;
        },
        error: (error) => {
          alert('Failed to create project: ' + error.message);
          this.isLoading = false;
        },
      });
  }
}
