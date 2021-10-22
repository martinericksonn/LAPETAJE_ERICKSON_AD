import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private api: HttpClient) {}

  ngOnInit(): void {}

  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });

  requestResult = '';

  gotoLogin() {
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcPassword2']
    ) {
      this.requestResult = 'Password doesnt match!';
    } else {
      this.requestResult = '';
    }

    // this.router.navigate(['login']);
  }

  async createAccount() {
    if (!this.registerForm.valid) {
      this.requestResult = 'Invalid or missing credentials';
      return;
    }
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcPassword2']
    ) {
      this.requestResult = 'Password doesnt match!';
      return;
    } else {
      this.requestResult = '';
    }
    var result: any = await this.api
      .post(environment.API_URL + '/user/register', {
        name: this.registerForm.value.fcName,
        email: this.registerForm.value.fcEmail,
        age: this.registerForm.value.fcAge,
        password: this.registerForm.value.fcName,
      })
      .toPromise();
    this.requestResult = this.registerForm.value.fcName;
    if (result.success) {
      this.nav('home');
    } else {
      this.requestResult = result.data;
    }
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
