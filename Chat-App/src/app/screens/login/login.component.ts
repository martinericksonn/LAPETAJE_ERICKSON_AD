import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { getAuth, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // fcEmail = new FormControl('', [Validators.required, Validators.email]);
  // fcPassword = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(6),
  // ]);
  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';
  hide = true;
  uid: String = '';
  constructor(
    private router: Router,
    private api: HttpClient,
    private authServ: AuthService
  ) {}
  readonly API_PATH = '/user/login';

  ngOnInit(): void {}

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.fcEmail.hasError('email') ? 'Not a valid email' : '';
  // }

  // private async loginUser(): Promise<any> {
  //   return await this.api
  //     .post(environment.API_URL + this.API_PATH, {
  //       email: this.fcEmail.value,
  //       password: this.fcPassword.value,
  //     })
  //     .toPromise();
  // }

  async login(): Promise<any> {
    try {
      this.requestResult = '';
      var result: any = await this.authServ.login(
        this.fcEmail.value,
        this.fcPassword.value
      );
      this.uid = result.data['id'];
      console.log(result.data['id']);

      if (!result.success) {
        this.requestResult = result.data;
        return;
      }

      if (!this.authServ.authenticated) {
        this.requestResult = result.data;
      } else {
        this.router.navigate(['home/profile/', this.uid]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  private loginResult(result: any) {
    if (result.success) {
      this.router.navigate(['user']);
    } else {
      this.requestResult = result.data;
    }
  }

  // async login() {
  //   var result: any = await this.loginUser();
  //   this.loginResult(result);
  //   // this.nav('user');
  // }
  private nav(destination: any) {
    this.router.navigate([destination]);
  }
}
