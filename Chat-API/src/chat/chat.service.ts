import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Message } from './message.interface';

@Injectable()
export class ChatService {
  private DB = admin.firestore();
  sendMessageIndiv(user1: string, user2: string, message: Message) {
    console.log(user1, user2, message);
  }

  sendMessageGroup(message: Message) {
    console.log(message);
  }
}
