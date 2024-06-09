import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  token: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  passwordStrengthMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.isPasswordStrong(this.password)) {
      this.errorMessage = 'Password is not strong enough';
      return;
    }

    this.authService.changePassword(this.token, this.password).subscribe(
      (response) => {
        this.successMessage = 'Password changed successfully';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Redirect after 3 seconds
      },
      (error) => {
        console.error('Error changing password:', error);
        this.errorMessage = 'Error changing password. Please try again.';
      }
    );
  }

  onPasswordInput() {
    this.passwordStrengthMessage = this.getPasswordStrengthMessage(
      this.password
    );
  }

  isPasswordStrong(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  }

  getPasswordStrengthMessage(password: string): string {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password should contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password should contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password should contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password should contain at least one special character';
    }
    return 'Password is strong';
  }
}
