import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  onLogin(form: NgForm) {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        password: form.value.password,
      };
      console.log(loginData);
    } else {
      alert('Please fill in all required fields');
    }
  }
}
