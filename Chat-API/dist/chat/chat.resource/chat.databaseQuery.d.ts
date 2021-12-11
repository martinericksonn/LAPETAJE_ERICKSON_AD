import 'firebase/auth';
import 'firebase/firestore';
import { Message } from './chat.interface';
export declare class DatabaseQuery {
    static getMsgUid(user1: string, user2: string): string;
    static messageAddTime(message: Message): Message;
    static addMessage(user1: string, user2: string, message: any): Promise<any>;
    static addMessageGroup(message: any): Promise<any>;
}
