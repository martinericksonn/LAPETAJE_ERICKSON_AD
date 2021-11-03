import { Helper } from './helper';
import 'firebase/auth';
import 'firebase/firestore';

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
    if (user.id) {
      this.id = user.id;
    }
    if (typeof user === 'string') {
      this.id = Helper.generateUID();
      this.name = user;
      this.age = age;
      this.email = email.toLowerCase();
      this.password = password;
    } else {
      this.id = user.id ? user.id : Helper.generateUID();
      this.name = user.name.trim();
      this.age = user.age;
      this.email = user.email.trim().toLowerCase();
      this.password = user.password.trim();
    }
    // ConnectDatabase.commit(this.id, this);
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

  toJsonPass() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email,
      password: this.password,
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
      case 510:
        return 'Sorry this name is not a valid name';
      case 511:
        return 'No result found';
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
    if (isNaN(code)) {
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
