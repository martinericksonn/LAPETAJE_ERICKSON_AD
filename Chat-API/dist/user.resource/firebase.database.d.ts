import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
import { User } from './user.model';
export declare class DatabaseQuery {
    static commit(user: User): Promise<CRUDReturn>;
    static delete(id: string): Promise<CRUDReturn>;
    static hasID(id: string): Promise<boolean | any>;
    static alreadyExistEmail(email: string, id?: string): Promise<boolean | any>;
    static replaceValues(id: string, user: User): Promise<any>;
    static updateValues(id: string, user: User): Promise<any>;
    static getAllUsers(): Promise<any[]>;
    static getUser(id: string): Promise<any>;
    static loginUser(email: string, password: string): Promise<User>;
    static searchInUser(term: string): Promise<any>;
}
