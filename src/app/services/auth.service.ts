import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // seedData: any[] = [];
  userRole = new Subject<string>();
  userSubject = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  createUser(username: string, role: string) {
    const user: User = {
      username: username,
      role: role,
    };

    this.userSubject.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  public autoLogin() {
    const userData: {
      username: string;
      role: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.username, userData.role);

    if (loadedUser) {
      this.userSubject.next(loadedUser);
      // this.router.navigate(['/products']);
    }
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }
  // async getData() {
  //   var file = await fetch('../../assets/users.json');
  //   let data = await file.text();

  //   this.seedData = JSON.parse(data);
  //   // console.log(this.seedData);
  // }
}
