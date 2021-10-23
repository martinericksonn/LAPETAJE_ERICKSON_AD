import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly API_PATH = '/user/login';

  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';

  constructor(private router: Router, private api: HttpClient) {}

  ngOnInit(): void {}

  async login() {
    var result: any = await this.loginUser();
    this.loginResult(result);
  }

  gotoRegister() {
    this.nav('register');
  }

  private async loginUser(): Promise<any> {
    return await this.api
      .post(environment.API_URL + this.API_PATH, {
        email: this.fcEmail.value,
        password: this.fcPassword.value,
      })
      .toPromise();
  }

  private loginResult(result: any) {
    if (result.success) {
      this.nav('home');
    } else {
      this.requestResult = result.data;
    }
  }

  private nav(destination: string) {
    this.router.navigate([destination]);
  }
}
