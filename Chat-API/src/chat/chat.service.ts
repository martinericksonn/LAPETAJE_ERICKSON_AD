import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DatabaseQuery } from './chat.resource/chat.databaseQuery';
import { Message } from './chat.resource/chat.interface';

@Injectable()
export class ChatService {
  sendMessageIndiv(user1: string, user2: string, message: any) {
    DatabaseQuery.addMessage(user1, user2, message);
  }

  sendMessageGroup(message: Message) {
    DatabaseQuery.addMessageGroup(message);
    console.log(message);
  }
}
