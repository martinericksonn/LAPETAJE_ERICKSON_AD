import { User } from './user.model';
import { Message } from 'src/chat.resource/chat.interface';
export declare class Helper {
    private static systemMessage;
    static describeClass(typeOfClass: any): Array<any>;
    static describeClassUser(): Array<any>;
    static generateUID(): string;
    static removeItemOnce(arr: Array<any>, value: any): Array<any>;
    static populate(): any;
    static validBody(body: any): void;
    static validBodyPut(body: any): {
        success: boolean;
        data: string;
    };
}
export declare class Verification {
    private static systemMessage;
    static verifyCredentials(newUser: any, option: string): void;
    static verifyEmail(newUser: any, id?: string): Promise<void>;
    static verifyName(newUser: any): void;
    static verifyPassword(user: any): void;
    static verifyAge(newUser: any): void;
    static verifyID(id: string): Promise<void>;
}
export declare class Process {
    private static systemMessage;
    static getMsgUid(user1: string, user2: string): string;
    static messageAddTime(message: Message): Message;
    static updateUser(user: any, id: string): Promise<any>;
    static registerUser(newUser: any): Promise<import("./crud_return.interface").CRUDReturn>;
    static getUser(id: any): Promise<any>;
    static getAllUsers(): Promise<any>;
    static overwriteUser(id: string, newUser: any): Promise<any>;
    static deleteUser(id: string): Promise<import("./crud_return.interface").CRUDReturn>;
    static loginUser(newUser: any): Promise<any>;
    static searchInUser(query: string): Promise<any>;
    static populateDatabase(): Map<string, User>;
}
