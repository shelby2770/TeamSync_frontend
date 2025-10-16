import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        password: form.value.password,
      };

      this.isLoading = true;

      this.http
        .post('http://localhost:5208/api/users/login', loginData)
        .subscribe({
          next: (response: any) => {
            alert('Login successful!');
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['/']);
            this.isLoading = false;
          },
          error: (error) => {
            alert('Login failed: ' + error.message);
            this.isLoading = false;
          },
        });
    } else {
      alert('Please fill in all required fields');
    }
  }
}
