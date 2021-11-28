import { CRUDReturn } from '../user.resource/crud_return.interface';
import { User } from 'src/user.resource/user.model';
export declare class UserService {
    private DB;
    private AUTH;
    constructor();
    getAllUser(): Promise<CRUDReturn>;
    putUser(id: string, user: any): Promise<CRUDReturn>;
    patchUser(id: string, user: any): Promise<CRUDReturn>;
    deleteUser(id: string): Promise<CRUDReturn>;
    loginUser(user: any): Promise<CRUDReturn>;
    searchTerm(query: any): Promise<CRUDReturn> | String[];
    getOne(id: string): Promise<CRUDReturn>;
    register(body: any): Promise<CRUDReturn>;
    saveToDB(user: User): Promise<boolean>;
    emailExists(email: string, options?: {
        exceptionId: string;
    }): Promise<boolean>;
}
