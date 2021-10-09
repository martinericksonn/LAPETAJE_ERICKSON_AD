import { CRUDReturn } from '../user.resource/crud_return.interface';
export declare class UserService {
    private users;
    constructor();
    register(newUser: any): Promise<CRUDReturn>;
    getUser(id: string): Promise<CRUDReturn>;
    getAllUser(): CRUDReturn;
    putUser(id: string, user: any): Promise<CRUDReturn>;
    patchUser(id: string, user: any): Promise<CRUDReturn>;
    deleteUser(id: string): Promise<CRUDReturn>;
    userLogin(newUser: any): CRUDReturn;
    searchTerm(query: any): CRUDReturn | String[];
}
