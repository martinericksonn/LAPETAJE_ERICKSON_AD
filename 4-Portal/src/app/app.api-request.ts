import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

var router: Router;
var api: HttpClient;

const LOGIN = '/user/login';
const REGISTER = '/user/register';

function nav(destination: string) {
  router.navigate([destination]);
}

async function loginUser(
  fcEmail: FormControl,
  fcPassword: FormControl
): Promise<any> {
  return await api
    .post(environment.API_URL + LOGIN, {
      email: fcEmail.value,
      password: fcPassword.value,
    })
    .toPromise();
}

async function registerUser(registerForm: FormGroup): Promise<any> {
  try {
    return await api
      .post(environment.API_URL + REGISTER, {
        name: registerForm.value.fcName,
        email: registerForm.value.fcEmail,
        age: registerForm.value.fcAge,
        password: registerForm.value.fcPassword,
      })
      .toPromise();
  } catch (error) {
    console.log(error);
  }
}

function passwordEqualResult(registerForm: FormGroup): string {
  var result = '';
  if (registerForm.value['fcPassword'] !== registerForm.value['fcPassword2']) {
    result = 'Password doesnt match!';
  }

  return result;
}

function formValidResult(registerForm: FormGroup): string {
  var result = '';
  if (!registerForm.valid) {
    result = 'Invalid or missing credentials';
  }

  return result;
}

export { nav, loginUser, registerUser, passwordEqualResult, formValidResult };
