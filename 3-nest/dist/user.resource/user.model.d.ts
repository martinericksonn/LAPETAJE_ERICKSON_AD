import 'firebase/auth';
import 'firebase/firestore';
export declare class User {
    id: string;
    private name;
    private age;
    private email;
    private password;
    constructor(user: any | string, age?: number, email?: string, password?: string);
    searchTerm(term: any): boolean;
    verifyEmail(email: string): boolean;
    replaceValues(user: any): void;
    login(email: string, password: string): boolean;
    log(): void;
    toJson(): {
        id: string;
        name: string;
        age: number;
        email: string;
    };
    toJsonPass(): {
        id: string;
        name: string;
        age: number;
        email: string;
        password: string;
    };
}
export declare class SystemMessage {
    private isSuccess;
    private data;
    private systemMessage;
    custom(data: any): any;
    success(code: number | any): any;
    error(code: number | any): any;
    private toJson;
}
