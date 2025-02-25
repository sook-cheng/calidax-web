import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    imports: [AppModule, FormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.less'
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('id', response.id);
        this.router.navigate(['/campaigns']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert(err.error?.message || 'Login failed');
      }
    });
  }

}
