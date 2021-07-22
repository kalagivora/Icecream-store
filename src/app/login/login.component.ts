import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean = false;
  userRoleFlag: string = 'user';
  username: string = '';
  password: string = '';
  // user: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(form: NgForm) {
    // console.log(this.authService.seedData);
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;

    this.authService.createUser(username, this.userRoleFlag);
    if (this.userRoleFlag === 'admin') {
      this.router.navigate(['/admin-home']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      if (this.socialUser) {
        this.authService.createUser(this.socialUser.email, 'user');
        console.log(this.socialUser);
        this.router.navigate(['/home']);
      }
    });
  }

  public changeRoleFlag(): void {
    this.userRoleFlag === 'user'
      ? (this.userRoleFlag = 'admin')
      : (this.userRoleFlag = 'user');
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
