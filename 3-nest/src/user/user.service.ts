import { Helper, Process, Verification } from '../user.resource/helper';
import { CRUDReturn } from '../user.resource/crud_return.interface';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { auth } from 'firebase-admin';
import { User } from 'src/user.resource/user.model';

@Injectable()
export class UserService {
  private DB = admin.firestore();
  private AUTH: auth.Auth = admin.auth();

  constructor() {
    Process.populateDatabase();
  }

  // async register(newUser: any): Promise<CRUDReturn> {
  //   try {
  //     Verification.verifyCredentials(newUser, 'REGISTER');
  //     Verification.verifyAge(newUser);
  //     Verification.verifyName(newUser);
  //     Verification.verifyPassword(newUser);
  //     await Verification.verifyEmail(newUser);

  //     return Process.registerUser(newUser);
  //   } catch (error) {
  //     return error;
  //   }
  // }

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

  async register(body: any): Promise<CRUDReturn> {
    try {
      var validBody: { success: boolean; data: string } =
        Helper.validBodyPut(body);
      if (validBody.success) {
        var exists = await this.emailExists(body.email);
        console.log(`Does ${body.email} exist in db? ${exists}`);
        if (!exists) {
          //create the Firebase Auth user
          var authCreationResult: auth.UserRecord;
          try {
            authCreationResult = await this.AUTH.createUser({
              email: body.email,
              password: body.password,
            });
          } catch (error) {
            throw error;
          }
          //create the Firestore Database entry for the user if it is successful
          var newUser: User = new User(
            body.name,
            body.age,
            authCreationResult.email,
            authCreationResult.uid,
          );
          if (await this.saveToDB(newUser)) {
            return {
              success: true,
              data: newUser.toJson(),
            };
          } else {
            throw new Error('generic database error');
          }
        } else
          throw new Error(`${body.email} is already in use by another user!`);
      } else {
        throw new Error(validBody.data);
      }
    } catch (error) {
      console.log('RegisterError');
      console.log(error.message);
      return { success: false, data: `Error adding account, ${error}` };
    }
  }
  async saveToDB(user: User): Promise<boolean> {
    console.log(`Attempting to save user ${user.id} ${user.email}`);
    try {
      var result = await user.commit(false);
      return result.success;
    } catch (error) {
      console.log('Save to db error');
      console.log(error.message);
      return false;
    }
  }

  async emailExists(
    email: string,
    options?: { exceptionId: string },
  ): Promise<boolean> {
    try {
      var userResults = await this.DB.collection('users')
        .where('email', '==', email)
        .get();
      console.log('Are the user results empty?');
      console.log(userResults.empty);
      if (userResults.empty) return false;
      for (const doc of userResults.docs) {
        console.log(doc.data());
        console.log('Are the options defined?');
        console.log(options != undefined);
        if (options != undefined) {
          if (doc.id == options?.exceptionId) continue;
        }
        if (doc.data()['email'] === email) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    } catch (error) {
      console.log('Email exists subfunction error');
      console.log(error.message);
      return false;
    }
  }
}
