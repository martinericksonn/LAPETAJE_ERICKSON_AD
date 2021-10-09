import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
import { User } from './user.model';
export declare class DatabaseQuery {
    static commit(id: string, user: User): Promise<CRUDReturn>;
    static delete(id: string): Promise<CRUDReturn>;
    static verifyID(id: string): Promise<boolean | any>;
}
