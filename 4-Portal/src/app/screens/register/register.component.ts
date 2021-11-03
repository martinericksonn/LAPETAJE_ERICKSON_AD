import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly PATH_REGISTER = '/user/register';
  successUsername = '';

  requestResult = '';
  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private api: HttpClient
  ) {}

  ngOnInit(): void {}

  async createAccount(modal: any) {
    if (!this.isFormValid()) return;
    if (!this.isPasswordEqual()) return;

    var result: any = await this.registerUser();
    this.createAccountResult(result, modal);
  }

  gotoLogin() {
    this.nav('login');
  }

  centeredModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  private clearFields() {
    this.registerForm.controls.fcName.reset();
    this.registerForm.controls.fcAge.reset();
    this.registerForm.controls.fcEmail.reset();
    this.registerForm.controls.fcPassword.reset();
    this.registerForm.controls.fcPassword2.reset();
    this.registerForm.controls.fcPassword2.reset();
    this.requestResult = '';
  }

  private createAccountResult(result: any, modal?: any) {
    if (result.success) {
      this.successUsername = this.registerForm.value.fcName;
      this.centeredModal(modal);
      this.clearFields();
    } else {
      this.requestResult = result.data;
    }
  }

  private async registerUser(): Promise<any> {
    this.successUsername = this.registerForm.value.fcName;
    return await this.api
      .post(environment.API_URL + this.PATH_REGISTER, {
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
