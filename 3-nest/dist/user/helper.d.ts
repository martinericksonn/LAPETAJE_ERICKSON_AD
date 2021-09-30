import { User } from './user.model';
export declare class Helper {
    private static systemMessage;
    static describeClass(typeOfClass: any): Array<any>;
    static describeClassUser(): Array<any>;
    static generateUID(): string;
    static removeItemOnce(arr: Array<any>, value: any): Array<any>;
    static populate(): Map<string, User>;
    static validBody(body: any): void;
}
