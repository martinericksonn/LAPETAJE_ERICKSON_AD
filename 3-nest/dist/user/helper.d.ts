import { User } from './user.model';
export declare class Helper {
    private static systemMessage;
    static describeClass(typeOfClass: any): Array<any>;
    static describeClassUser(): Array<any>;
    static generateUID(): string;
    static removeItemOnce(arr: Array<any>, value: any): Array<any>;
    static populate(): Map<string, User>;
    static validBody(body: any): void;
    static validBodyPut(body: any): {
        success: boolean;
        data: string;
    };
}
export declare class Verification {
    private static systemMessage;
    static verifyCredentials(newUser: any, option: string): void;
    static verifyEmail(newUser: any, users?: any, id?: string): void;
    static verifyAge(newUser: any): void;
    static verifyID(id: string, users: any): void;
}
export declare class Process {
    private static systemMessage;
    static updateUser(id: string, user: any, users: any): any;
    static registerUser(newUser: any, users: any): any;
    static getUser(id: any, users: any): any;
    static getAllUser(users: any): any;
    static overwriteUser(id: string, newUser: any, users: any): any;
    static deleteUser(id: string, users: any): any;
    static loginUser(newUser: any, users: any): any;
    static searchInUser(query: any, users: any): any;
    static populateDatabase(): Map<string, User>;
}