import { Process, Verification } from '../user.resource/helper';
import { CRUDReturn } from '../user.resource/crud_return.interface';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  private DB = admin.firestore();

  constructor() {
    Process.populateDatabase();
  }

  async register(newUser: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(newUser, 'REGISTER');
      Verification.verifyAge(newUser);
      Verification.verifyName(newUser);
      Verification.verifyPassword(newUser);
      await Verification.verifyEmail(newUser);

      return Process.registerUser(newUser);
    } catch (error) {
      return error;
    }
  }

  // async getUser(id: string): Promise<CRUDReturn> {
  //   try {
  //     await Verification.verifyID(id);

  //     return Process.getUser(id);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async getAllUser(): Promise<CRUDReturn> {
    return Process.getAllUsers();
  }

  async putUser(id: string, user: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(user, 'REGISTER');
      Verification.verifyAge(user);
      Verification.verifyName(user);
      Verification.verifyPassword(user);
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
      Verification.verifyName(user);
      Verification.verifyPassword(user);
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

  async loginUser(user: any): Promise<CRUDReturn> {
    try {
      Verification.verifyCredentials(user, 'LOGIN');

      return await Process.loginUser(user);
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

  async getOne(id: string): Promise<CRUDReturn> {
    try {
      var result = await this.DB.collection('users').doc(id).get();
      if (result.exists) {
        var temp: {} = result.data();
        temp['id'] = result.id;
        return {
          success: true,
          data: temp,
        };
      } else {
        return {
          success: false,
          data: `User ${id} does not exist in database!`,
        };
      }
    } catch (error) {
      console.log('Get one error');
      console.log(error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }
}
