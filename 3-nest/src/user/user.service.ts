import { Process, Verification } from '../user.resource/helper';
import { CRUDReturn } from '../user.resource/crud_return.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {
    Process.populateDatabase();
  }

  async register(newUser: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(newUser, 'REGISTER');
      Verification.verifyAge(newUser);
      await Verification.verifyEmail(newUser);

      return Process.registerUser(newUser);
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string): Promise<CRUDReturn> {
    try {
      await Verification.verifyID(id);

      return Process.getUser(id);
    } catch (error) {
      return error;
    }
  }

  async getAllUser(): Promise<CRUDReturn> {
    return Process.getAllUsers();
  }

  async putUser(id: string, user: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(user, 'REGISTER');
      Verification.verifyAge(user);
      await Verification.verifyID(id);
      await Verification.verifyEmail(user);

      return await Process.overwriteUser(id, user);
    } catch (error) {
      return error;
    }
  }

  async patchUser(id: string, user: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(user, 'PATCH');
      Verification.verifyAge(user);
      await Verification.verifyID(id);
      await Verification.verifyEmail(user, id);

      return await Process.updateUser(user, id);
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

  async loginUser(newUser: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(newUser, 'LOGIN');

      return await Process.loginUser(newUser);
    } catch (error) {
      return error;
    }
  }

  searchTerm(query: any): Promise<CRUDReturn> | String[] {
    try {
      return Process.searchInUser(query);
    } catch (error) {
      return error;
    }
  }
}
