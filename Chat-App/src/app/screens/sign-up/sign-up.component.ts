import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  hide = true;
  error: string = '';
  registerForm: FormGroup = new FormGroup({
    fcEmail: new FormControl('', Validators.required),
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });

  // constructor(private router: Router, private auth: AuthService) {}
  constructor(private router: Router) {}

  ngOnInit(): void {}
  // getErrorMessage() {
  //   if (this.fcEmail.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  onSubmit() {
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcPassword2']
    ) {
      this.error = 'Password doesnt match!';
      console.log(this.error);
      return;
    }
    if (!this.registerForm.valid) {
      {
        this.error = 'No fields must be empty';
        console.log(this.error);
        return;
      }
    }
    if (this.registerForm.valid) {
      var payload: {
        name: string;
        email: string;
        age: number;
        password: string;
      };
      payload = {
        name: this.registerForm.value.fcName,
        age: parseInt(this.registerForm.value.fcAge),
        email: this.registerForm.value.fcEmail,
        password: this.registerForm.value.fcPassword,
      };
      // this.auth.register(payload).then((data) => {
      //   if (!data.success) this.error = data.data;
      //   else this.nav('login');
      // });
    }
  }

  gotoLogin() {
    this.nav('login');
  }
  private nav(destination: string) {
    this.router.navigate([destination]);
  }
}
