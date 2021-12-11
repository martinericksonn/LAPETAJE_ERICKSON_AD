import { Message } from './chat.resource/chat.interface';
export declare class ChatService {
    sendMessageIndiv(user1: string, user2: string, message: any): void;
    sendMessageGroup(message: Message): void;
}
