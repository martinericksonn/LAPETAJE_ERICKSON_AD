import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Helper } from './helper';
import { Verification } from './verify';
import { Process } from './modify';

@Injectable()
export class UserService {
  private users = new Map<string, User>();

  constructor() {
    this.users = Helper.populate();
  }

  register(newUser: any): any {
    try {
      Verification.verifyCredentials(newUser, 'REGISTER');
      Verification.verifyEmail(newUser, this.users);

      return Process.registerUser(newUser, this.users);
    } catch (error) {
      return error;
    }
  }

  getUser(id: string) {
    try {
      Verification.verifyID(id, this.users);

      return Process.getUser(id, this.users);
    } catch (error) {
      return error;
    }
  }

  getAllUser(): any {
    return Process.getAllUser(this.users);
  }

  putUser(id: string, user: any) {
    try {
      Verification.verifyCredentials(user, 'REGISTER');
      Verification.verifyID(id, this.users);
      Verification.verifyEmail(user, this.users);

      return Process.overwriteUser(id, user, this.users);
    } catch (error) {
      return error;
    }
  }

  patchUser(id: string, user: any) {
    try {
      Verification.verifyID(id, this.users);
      Verification.verifyEmail(user, this.users);

      return Process.updateUser(id, user, this.users);
    } catch (error) {
      return error;
    }
  }

  deleteUser(id: string): any {
    try {
      Verification.verifyID(id, this.users);

      return Process.deleteUser(id, this.users);
    } catch (error) {
      return error;
    }
  }

  userLogin(newUser: any) {
    try {
      Verification.verifyCredentials(newUser, 'LOGIN');

      return Process.LoginUser(newUser, this.users);
    } catch (error) {
      return error;
    }
  }

  searchTerm(query: any) {
    try {
      return Process.searchInUser(query, this.users);
    } catch (error) {
      return error;
    }
  }
}
