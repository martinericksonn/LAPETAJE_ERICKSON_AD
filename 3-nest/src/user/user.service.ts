import * as firebase from 'firebase/app';
import { Process, Verification } from '../user.resource/helper';
import { CRUDReturn } from '../user.resource/crud_return.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../user.resource/user.model';
import { DatabaseQuery } from 'src/user.resource/firebase.database';

@Injectable()
export class UserService {
  private users = new Map<string, User>();

  constructor() {
    //this.users = Process.populateDatabase();
  }

  async register(newUser: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(newUser, 'REGISTER');
      Verification.verifyAge(newUser);
      await Verification.verifyEmail(newUser, this.users);

      return Process.registerUser(newUser, this.users);
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string): Promise<CRUDReturn> {
    try {
      await Verification.verifyID(id);

      return Process.getUser(id, this.users);
    } catch (error) {
      return error;
    }
  }

  getAllUser(): CRUDReturn {
    return Process.getAllUser(this.users);
  }

  async putUser(id: string, user: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(user, 'REGISTER');
      Verification.verifyAge(user);
      await Verification.verifyID(id);
      await Verification.verifyEmail(user, this.users, id);

      return await Process.overwriteUser(id, user, this.users);
    } catch (error) {
      return error;
    }
  }

  async patchUser(id: string, user: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(user, 'PATCH');
      Verification.verifyAge(user);
      await Verification.verifyID(id);
      await Verification.verifyEmail(user, this.users, id);

      return await Process.updateUser(id, user, this.users);
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string): Promise<CRUDReturn> {
    try {
      await Verification.verifyID(id);

      return Process.deleteUser(id);
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
