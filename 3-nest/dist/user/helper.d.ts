import { User } from './user.model';
export declare class Helper {
    static describeClass(typeOfClass: any): Array<any>;
    static generateUID(): string;
    static removeItemOnce(arr: Array<any>, value: any): Array<any>;
    static populate(): Map<string, User>;
    static validBodyPut(body: any): boolean;
}
