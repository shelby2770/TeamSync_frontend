import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  onSignup(form: NgForm) {
    if (form.valid) {
      const signupData = {
        fullName: form.value.fullName,
        email: form.value.email,
        password: form.value.password,
        confirmPassword: form.value.confirmPassword,
      };

      if (signupData.password.length<8) {
        alert('Password length is less than 8.');
        return;
      }
      if (signupData.password !== signupData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log(signupData);
    } else {
      alert('Please fill in all required fields');
    }
  }
}
