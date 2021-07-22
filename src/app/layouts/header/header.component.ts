import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  private userSub: Subscription;
  role: string = '';
  auth: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.role);
    this.userSub = this.authService.userSubject.subscribe((user) => {
      if (user != null) {
        this.role = user.role;
        this.auth = !!user;
      } else {
        this.role = '';
        this.auth = false;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
