import 'firebase/auth';
import 'firebase/firestore';
import { Message } from './chat.interface';
export declare class DatabaseQuery {
    static addMessage(user1: string, user2: string, message: any): Promise<any>;
    static addMessageGroup(message: Message): Promise<any>;
}
