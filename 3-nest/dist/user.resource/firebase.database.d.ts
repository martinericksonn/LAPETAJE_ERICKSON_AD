import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
import { User } from './user.model';
export declare class Database {
    static db: any;
    static commit(id: string, user: User): Promise<CRUDReturn>;
}
