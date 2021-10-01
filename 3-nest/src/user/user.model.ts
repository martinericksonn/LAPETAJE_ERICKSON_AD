import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Helper } from './helper';

export class User {
  public id: string;
  private name: string;
  private age: number;
  private email: string;
  private password: string;

  constructor(
    user: any | string,
    age?: number,
    email?: string,
    password?: string,
  ) {
    if (typeof user === 'string') {
      this.id = Helper.generateUID();
      this.name = user;
      this.age = age;
      this.email = email;
      this.password = password;
      return;
    }
    this.id = Helper.generateUID();
    this.name = user.name.trim();
    this.age = user.age;
    this.email = user.email.trim();
    this.password = user.password.trim();
  }

  // }

  searchTerm(term: any): boolean {
    for (var attributename in this) {
      if (
        attributename != 'password' &&
        this[attributename] == term.trim().toLowerCase()
      )
        return true;
    }
    return false;
  }

  verifyEmail(email: string): boolean {
    return email ? this.email.toLowerCase() == email.toLowerCase() : false;
  }

  verifyID(id: string): boolean {
    return this.id == id;
  }

  replaceValues(user: any) {
    for (var attributename in user) {
      this[attributename] = user[attributename];
    }
  }

  login(email: string, password: string): boolean {
    return (
      this.email.toLowerCase() == email.toLowerCase() &&
      this.password == password
    );
  }

  log() {
    console.log(
      `${this.id} ${this.name} ${this.age} ${this.email} ${this.password}`,
    );
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email,
    };
  }
}

export class SystemMessage {
  private isSuccess: boolean;
  private data: string;

  private systemMessage(code: number): string {
    switch (code) {
      case 101:
        return 'Account has been successfully registered';
      case 102:
        return 'Account credentials has been updated successfully';
      case 103:
        return 'Account has been successfully deleted';
      case 104:
        return 'Login Successful';
      case 501:
        return 'The email address or password is incorrect.';
      case 502:
        return 'Sorry Invalid or Missing credentials, please try again';
      case 503:
        return 'This Email is already registered, try logging in';
      case 504:
        return 'This Email is already registered, cannot update credentials';
      case 505:
        return 'The email address or password is incorrect';
      case 506:
        return 'This ID does not exist';
      case 507:
        return "Sorry we couldn't find any results";
      case 508:
        return 'Sorry this email is not a valid email';
      case 509:
        return 'Sorry this age is not a valid age';
      default:
        return 'Unknown request';
    }
  }

  custom(data: any) {
    return data;
  }

  success(code: number | any): any {
    if (isNaN(code)) {
      this.isSuccess = true;
      this.data = code;
      return this.toJson();
    }

    this.isSuccess = true;
    this.data = this.systemMessage(code);
    return this.toJson();
  }

  error(code: number | any): any {
    if (!isNaN(code)) {
      this.isSuccess = false;
      this.data = code;
      return this.toJson();
    }

    this.isSuccess = false;
    this.data = this.systemMessage(code);

    return this.toJson();
  }

  private toJson() {
    return {
      success: this.isSuccess,
      data: this.data,
    };
  }
}
