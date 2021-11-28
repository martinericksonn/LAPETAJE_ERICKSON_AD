import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
export declare class User {
    id: string;
    private name;
    private age;
    email: string;
    private password;
    constructor(user?: any, age?: number, email?: string, id?: string);
    log(): void;
    toJson(): {
        id: string;
        name: string;
        age: number;
        email: string;
    };
    commit(hidePassword?: boolean): Promise<CRUDReturn>;
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
