import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Verification } from 'src/user.resource/helper';
import { DatabaseQuery } from '../chat.resource/chat.databaseQuery';
import { Message } from '../chat.resource/chat.interface';

@Injectable()
export class ChatService {
  async sendMessageIndiv(user1: string, user2: string, message: any) {
    try {
      await Verification.verifyID(user1);
      await Verification.verifyID(user2);

      await DatabaseQuery.addMessage(user1, user2, message);
    } catch (error) {
      return error;
    }
  }

  sendMessageGroup(message: Message) {
    try {
      Verification.verifyID(message['uid']);

      DatabaseQuery.addMessageGroup(message);
    } catch (error) {
      return error;
    }
  }
}
