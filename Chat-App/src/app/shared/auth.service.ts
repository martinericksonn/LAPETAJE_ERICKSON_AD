import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
import { CRUDReturn } from './crud_return.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static currentUser: any;
  public user?: User | null;
  public userObs?: Subscription;
  static uid: string = '';
  constructor(
    private storage: AngularFireStorage,
    private api: ApiService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    console.log('I am instance' + `${Date.now()}`);
    this.userObs = this.afAuth.user.subscribe((data) => {
      console.log('data');
      console.log(data);
      if (data == undefined || data == null) return;
      if (!this.authenticated) {
        this.api.get(`/user/${data.uid}`).then((result) => {
          var output: CRUDReturn = {
            success: result.success,
            data: result.data,
          };
          if (output.success === true) {
            AuthService.uid = data.uid;
            console.log('Subscription');
            this.user = User.fromJson(output.data.id, output.data);
            console.log('Successful Login');
            this.user?.log();
            this.router.navigate(['home/profile/', data.uid]);
          }
        });
      }
    });
  }

  get authenticated(): boolean {
    return this.user != undefined && this.user != null;
  }

  async resetPassword(email: string) {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then()
      .catch((error) => console.log(error.message));
  }

  async login(email: string, password: string): Promise<any> {
    try {
      //log in to firebase auth
      var resultOfLogin: any;
      try {
        resultOfLogin = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        AuthService.currentUser = resultOfLogin;
      } catch (error) {
        throw error;
      }
      // get the data from the db regarding the user
      var result: any = await this.api.get(`/user/${resultOfLogin.user?.uid}`);
      var output: CRUDReturn = { success: result.success, data: result.data };
      if (output.success === true) {
        this.user = User.fromJson(output.data.id, output.data);
      }
      return output;
    } catch (error) {
      console.log('Login Error');
      if (error instanceof Error)
        return { success: false, data: error.message };
      else return { success: false, data: 'unknown login error' };
    }
  }

  async register(payload: {
    name: string;
    age: number;
    email: string;
    password: string;
  }): Promise<CRUDReturn> {
    //send the registration request to the Api
    var result: any = await this.api.post('/user/register', payload);
    var output: CRUDReturn = { success: result.success, data: result.data };
    if (output.success === true) {
      this.user = User.fromJson(output.data.id, output.data);
      //sign in the frontend if registration is successful;
      try {
        const resultOfLogin = await this.afAuth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
        AuthService.currentUser = resultOfLogin;
        this.generateProfile(output.data.id);
        await resultOfLogin.user?.sendEmailVerification();
      } catch (error) {
        console.log(error);
        console.log('Register Error');
        if (error instanceof Error)
          return { success: false, data: error.message };
        else return { success: false, data: 'unknown register error' };
      }
    }
    console.log(output);

    return output;
  }

  async isEmailVerified(): Promise<boolean> {
    var bool: boolean = await AuthService.currentUser.user?.emailVerified;
    console.log(bool + 'asdasdsd');
    return bool;
  }

  async emailVerified(): Promise<string> {
    var msg: string = (await AuthService.currentUser.user?.emailVerified)
      ? ''
      : 'Please check your email to verify your Tabi account';
    console.log(msg + 'asdasdsd');
    return msg;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.user = null;
    });
  }

  metadata = {
    contentType: 'image/jpeg',
  };

  async generateProfile(id: string) {
    this.http
      .get(`assets/profile/${Math.floor(Math.random() * 8) + 1}.png`, {
        responseType: 'blob',
      })
      .subscribe((data) => {
        const file = data;
        const filePath = `images/${id}/profile`;
        this.storage.upload(filePath, file);
      });
  }
}
