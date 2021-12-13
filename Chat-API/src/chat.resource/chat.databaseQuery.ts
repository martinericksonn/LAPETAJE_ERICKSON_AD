import { SystemMessage } from 'src/user.resource/user.model';
import 'firebase/auth';
import 'firebase/firestore';
import { Message } from './chat.interface';
import { Process } from 'src/user.resource/helper';

const admin = require('firebase-admin');

// const firestore = firebase.firestore();

export class DatabaseQuery {
  static async addMessage(user1: string, user2: string, message: any) {
    try {
      const db = admin.firestore();

      const chatUid = Process.getMsgUid(user1, user2);
      const newMessage = Process.messageAddTime(message);

      const messageLocation = await db.collection('chats').doc(chatUid);
      await messageLocation.set({ user1: user1, user2: user2 });
      await messageLocation.collection('messages').add(newMessage);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async addMessageGroup(message: Message) {
    try {
      const db = admin.firestore();

      const newMessage = Process.messageAddTime(message);

      const messageLocation = await db.collection('chats').doc('Tabi-Global');
      await messageLocation.collection('messages').add(newMessage);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
