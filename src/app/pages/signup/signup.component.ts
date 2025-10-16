import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSignup(form: NgForm) {
    if (form.valid) {
      const signupData = {
        fullName: form.value.fullName,
        email: form.value.email,
        password: form.value.password,
        confirmPassword: form.value.confirmPassword,
      };

      if (signupData.password.length < 8) {
        alert('Password length is less than 8.');
        return;
      }
      if (signupData.password !== signupData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.isLoading = true;

      const user = {
        name: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
      };

      this.http.post('http://localhost:5208/api/users/signup', user).subscribe({
        next: (userReturn: any) => {
          alert('Signup successful!');
          localStorage.setItem('user', JSON.stringify(userReturn));
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: (error: any) => {
          alert('Signup failed: ' + error.message);
          this.isLoading = false;
        },
      });
    } else {
      alert('Please fill in all required fields');
    }
  }
}
