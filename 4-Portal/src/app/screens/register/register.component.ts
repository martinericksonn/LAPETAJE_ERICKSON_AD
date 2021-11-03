import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly API_PATH = '/user/register';

  requestResult = '';
  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private api: HttpClient) {}

  ngOnInit(): void {}

  async createAccount() {
    if (!this.isFormValid()) return;
    if (!this.isPasswordEqual()) return;

    var result: any = await this.registerUser();
    this.createAccountResult(result);
  }

  gotoLogin() {
    this.nav('login');
  }

  private createAccountResult(result: any) {
    // this.requestResult = this.registerForm.value.fcName;
    if (result.success) {
      this.nav('home');
    } else {
      this.requestResult = result.data;
    }
  }

  private async registerUser(): Promise<any> {
    return await this.api
      .post(environment.API_URL + this.API_PATH, {
        name: this.registerForm.value.fcName,
        email: this.registerForm.value.fcEmail,
        age: this.registerForm.value.fcAge,
        password: this.registerForm.value.fcPassword,
      })
      .toPromise();
  }

  private isPasswordEqual(): boolean {
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcPassword2']
    ) {
      this.requestResult = 'Passwords does not match!';
      return false;
    }

    this.requestResult = '';
    return true;
  }

  private isFormValid(): boolean {
    if (!this.registerForm.valid) {
      this.requestResult = 'Invalid or missing credentials';
      return false;
    }
    return true;
  }

  private nav(destination: string) {
    this.router.navigate([destination]);
  }
}
