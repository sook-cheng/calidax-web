import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [AppModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.less'
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.authService.logout(userId).subscribe(() => {  
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.router.navigate(['']);
      });
    }
  }

}
