import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private router: Router,
    private api: HttpClient,
    private auth: AuthService
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
      var result: any = await this.auth.login(
        this.fcEmail.value,
        this.fcPassword.value
      );
      console.log(result);
      if (!result.success) {
        this.requestResult = result.data;
        return;
      }
      // this.nav('user');
      if (!this.auth.authenticated) {
        this.requestResult = result.data;
      } else {
        this.nav('user');
      }
    } catch (e) {
      console.log(e);
    }
  }

  private loginResult(result: any) {
    if (result.success) {
      this.nav('user');
    } else {
      this.requestResult = result.data;
    }
  }

  // async login() {
  //   var result: any = await this.loginUser();
  //   this.loginResult(result);
  //   // this.nav('user');
  // }
  private nav(destination: string) {
    this.router.navigate([destination]);
  }
}
