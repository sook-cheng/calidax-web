import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { UserService } from '../../services'; 
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [AppModule, DialogModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.less'
})
export class ProfileComponent implements OnInit{
    userId: string | null = null;
    userData: any;
    displayConfirmation: boolean = false;
    isPasswordVisible: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    this.getUser();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getUser() {
    if (!this.userId) return;

    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  updatePassword() {
    this.displayConfirmation = true;
  }

  cancelChange() {
    this.displayConfirmation = false;
  }

  confirmChangePassword() {
    if (!this.userId) return;

    this.userService.updatePassword(this.userId, this.userData.password).subscribe({
      next: () => {
        alert('Password updated successfully!');
        this.displayConfirmation = false;
        this.router.navigate(['']);
      },
      error: (err) => {
        alert(err.error?.message);
      }
    });
  }
}
