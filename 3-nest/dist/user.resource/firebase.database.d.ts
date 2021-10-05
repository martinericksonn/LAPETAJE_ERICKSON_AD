import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
import { User } from './user.model';
export declare class Database {
    static commit(id: string, user: User): Promise<CRUDReturn>;
}
export declare class DatabaseQuerry {
    verifyID(id: string): void;
}
