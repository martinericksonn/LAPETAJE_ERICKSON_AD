import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

const LOGIN = '/user/login';
const REGISTER = '/user/register';

var router: Router;

// export class ApiRequest {

//   static staticConstructor( _api: HttpClient,  _router: Router) {
//   }

//   static async loginUser(
//     fcEmail: FormControl,
//     fcPassword: FormControl
//   ): Promise<any> {
//     return await this._api
//       .post(environment.API_URL + LOGIN, {
//         email: fcEmail.value,
//         password: fcPassword.value,
//       })
//       .toPromise();
//   }

//   static async registerUser(registerForm: FormGroup): Promise<any> {
//     try {
//       return await ApiRequest.api
//         .post(environment.API_URL + REGISTER, {
//           name: registerForm.value.fcName,
//           email: registerForm.value.fcEmail,
//           age: registerForm.value.fcAge,
//           password: registerForm.value.fcPassword,
//         })
//         .toPromise();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // static async searchTerm(term: string): Promise<any> {
//   //   try {
//   //     return await ApiRequest.api
//   //       .get(environment.API_URL + `/search/${term}`)
//   //       .toPromise();
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // }

//   static passwordEqualResult(registerForm: FormGroup): string {
//     var result = '';
//     if (
//       registerForm.value['fcPassword'] !== registerForm.value['fcPassword2']
//     ) {
//       result = 'Password doesnt match!';
//     }

//     return result;
//   }

//   static formValidResult(registerForm: FormGroup): string {
//     var result = '';
//     if (!registerForm.valid) {
//       result = 'Invalid or missing credentials';
//     }

//     return result;
//   }
// }
