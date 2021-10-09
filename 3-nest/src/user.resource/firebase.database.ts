import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
import { SystemMessage, User } from './user.model';
import { collection, query, where } from 'firebase/firestore';

const admin = require('firebase-admin');
const systemMessage = new SystemMessage();

export class DatabaseQuery {
  static async commit(id: string, user: User): Promise<CRUDReturn> {
    try {
      var db = admin.firestore();
      await db.collection('users').doc(user.id).set(user.toJson());

      return systemMessage.success(user.toJson());
    } catch (error) {
      return systemMessage.error(error);
    }
  }

  static async delete(id: string): Promise<CRUDReturn> {
    try {
      var db = admin.firestore();
      await db.collection('users').doc(id).delete();
      return systemMessage.success(103);
    } catch (error) {
      return systemMessage.error(error);
    }
  }

  static async verifyID(id: string): Promise<boolean | any> {
    try {
      var db = admin.firestore();
      const userRef = db.collection('users').doc(id);
      var doc = await userRef.get();

      return !doc.exists;
    } catch (error) {
      throw systemMessage.error(error);
    }
  }
}
