import { SystemMessage } from 'src/user.resource/user.model';
import 'firebase/auth';
import 'firebase/firestore';
import { Message } from './chat.interface';

const admin = require('firebase-admin');
const systemMessage = new SystemMessage();

// const firestore = firebase.firestore();

export class DatabaseQuery {
  static getMsgUid(user1: string, user2: string): string {
    var user = [];
    user.push(user1.slice(-(user1.length / 2)));
    user.push(user2.slice(-(user1.length / 2)));
    user.sort();
    return user.join('');
  }

  static messageAddTime(message: Message): Message {
    message.date = new Date();
    return message;
  }

  static async addMessage(user1: string, user2: string, message: any) {
    try {
      const db = admin.firestore();
      const chatUid = this.getMsgUid(user1, user2);

      const newMessage = DatabaseQuery.messageAddTime(message);
      const messageLocation = await db.collection('chats').doc(chatUid);

      await messageLocation.set({ user1: user1, user2: user2 });
      await messageLocation.collection('messages').add(newMessage);
    } catch (error) {
      console.log('error');
      console.log(error);
      return error;
    }
  }

  static async addMessageGroup(message) {
    try {
      var db = admin.firestore();
      const messageLocation = await db.collection('chats').doc('Tabi-Global');
      const newMessage = DatabaseQuery.messageAddTime(message);

      await messageLocation.collection('messages').add(newMessage);
      console.log('yeet');
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
