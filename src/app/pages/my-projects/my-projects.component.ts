import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
})
export class MyProjectsComponent {
  projects: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  get user() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  loadProjects() {
    this.http
      .get(`http://localhost:5208/api/projects/user/${this.user.userId}`)
      .subscribe({
        next: (projects: any) => {
          this.projects = projects;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load projects:', error);
          this.isLoading = false;
        },
      });
  }
}
