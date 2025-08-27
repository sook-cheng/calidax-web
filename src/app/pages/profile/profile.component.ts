import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppModule } from '../../app.module';
import { SuccessFailToastService, UserService } from '../../services'; 
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { SuccessFailToastComponent } from '../shared';

@Component({
    selector: 'app-profile',
    imports: [AppModule, DialogModule, SuccessFailToastComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.less'
})
export class ProfileComponent implements OnInit{
  userId: string | null = null;
  userData: any;
  displayConfirmation: boolean = false;
  isPasswordVisible: boolean = false;
  
  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('failedTpl') failedTpl!: TemplateRef<any>;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: SuccessFailToastService
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
        this.toastService.show({ template: this.successTpl, classname: 'bg-success text-light', header: 'Success' });
        this.displayConfirmation = false;
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastService.show({ template: this.failedTpl, classname: 'bg-danger text-light', header: 'Fail' });
      }
    });
  }
}
