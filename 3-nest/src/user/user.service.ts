import * as firebase from 'firebase/app';
import { Process, Verification } from '../user.resource/helper';
import { CRUDReturn } from '../user.resource/crud_return.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../user.resource/user.model';
import { Database } from 'src/user.resource/firebase.database';

@Injectable()
export class UserService {
  private users = new Map<string, User>();

  constructor() {
    //this.users = Process.populateDatabase();
  }

  register(newUser: any): CRUDReturn {
    try {
      Verification.verifyCredentials(newUser, 'REGISTER');
      Verification.verifyAge(newUser);
      Verification.verifyEmail(newUser, this.users);

      return Process.registerUser(newUser, this.users);
    } catch (error) {
      return error;
    }
  }

  getUser(id: string): CRUDReturn {
    try {
      Verification.verifyID(id, this.users);

      return Process.getUser(id, this.users);
    } catch (error) {
      return error;
    }
  }

  getAllUser(): CRUDReturn {
    return Process.getAllUser(this.users);
  }

  putUser(id: string, user: any): CRUDReturn {
    try {
      Verification.verifyCredentials(user, 'REGISTER');
      Verification.verifyAge(user);
      Verification.verifyID(id, this.users);
      Verification.verifyEmail(user, this.users, id);

      return Process.overwriteUser(id, user, this.users);
    } catch (error) {
      return error;
    }
  }

  patchUser(id: string, user: any): CRUDReturn {
    try {
      Verification.verifyCredentials(user, 'PATCH');
      Verification.verifyAge(user);
      Verification.verifyID(id, this.users);
      Verification.verifyEmail(user, this.users, id);

      return Process.updateUser(id, user, this.users);
    } catch (error) {
      return error;
    }
  }

  deleteUser(id: string): CRUDReturn {
    try {
      Verification.verifyID(id, this.users);

      return Process.deleteUser(id, this.users);
    } catch (error) {
      return error;
    }
  }

  userLogin(newUser: any): CRUDReturn {
    try {
      Verification.verifyCredentials(newUser, 'LOGIN');

      return Process.loginUser(newUser, this.users);
    } catch (error) {
      return error;
    }
  }

  searchTerm(query: any): CRUDReturn | String[] {
    try {
      return Process.searchInUser(query, this.users);
    } catch (error) {
      return error;
    }
  }
}
