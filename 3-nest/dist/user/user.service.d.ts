import { CRUDReturn } from '../user.resource/crud_return.interface';
export declare class UserService {
    private DB;
    constructor();
    register(newUser: any): Promise<CRUDReturn>;
    getAllUser(): Promise<CRUDReturn>;
    putUser(id: string, user: any): Promise<CRUDReturn>;
    patchUser(id: string, user: any): Promise<CRUDReturn>;
    deleteUser(id: string): Promise<CRUDReturn>;
    loginUser(user: any): Promise<CRUDReturn>;
    searchTerm(query: any): Promise<CRUDReturn> | String[];
    getOne(id: string): Promise<CRUDReturn>;
}
