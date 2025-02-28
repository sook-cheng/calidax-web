import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGear, bootstrapQuestionCircle } from '@ng-icons/bootstrap-icons';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-protected-layout',
    imports: [RouterOutlet, NavBarComponent, NgbDropdownModule, NgIcon],
    providers: [provideIcons({ bootstrapGear, bootstrapQuestionCircle })],
    templateUrl: './protected-layout.component.html',
    styleUrl: './protected-layout.component.less'
})
export class ProtectedLayoutComponent {

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

  profile() {
    this.router.navigate(['/profile']);
  }
}
