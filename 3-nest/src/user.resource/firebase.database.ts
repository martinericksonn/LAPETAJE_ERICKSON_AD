import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
import { SystemMessage, User } from './user.model';
import { collection, query, where } from 'firebase/firestore';

const admin = require('firebase-admin');
const db = admin.firestore();

export class Database {
  static async commit(id: string, user: User): Promise<CRUDReturn> {
    var systemMessage = new SystemMessage();

    try {
      await db.collection('users').doc(user.id).set(user.toJson());

      return systemMessage.success(user.toJson());
    } catch (error) {
      return systemMessage.error(error);
    }
  }
}
export class DatabaseQuerry {
  verifyID(id: string) {
    const usersref = collection(db, 'users');
  }
}
