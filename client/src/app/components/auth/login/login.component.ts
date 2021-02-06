import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 

  loginForm = {
    username: '',
    password: '',
  };

  constructor(
    private _as: AuthService,
    private _ls: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this._ls.signIn(this.loginForm).subscribe(
      (data) => {
        if (data.ok) {
          console.log(data);
          this._as.setUser(data.user);
          localStorage.setItem('token', data.token);
          this._router.navigate(['user']);
        } else {
          alert(data.msg);
        }
      },
      (err) => {
        console.log(err.error.msg);
      }
    );
  }
}
