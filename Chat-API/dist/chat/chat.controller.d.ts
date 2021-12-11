import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessageIndiv(user1: string, user2: string, message: any): void;
    sendMessageGroup(uid: string, message: any): void;
}
