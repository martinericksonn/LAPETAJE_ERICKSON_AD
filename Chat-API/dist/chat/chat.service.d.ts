import { Message } from './message.interface';
export declare class ChatService {
    private DB;
    sendMessageIndiv(user1: string, user2: string, message: Message): void;
    sendMessageGroup(message: Message): void;
}
