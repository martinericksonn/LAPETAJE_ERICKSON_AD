import { CRUDReturn } from '../user.resource/crud_return.interface';
export declare class UserService {
    private users;
    constructor();
    register(newUser: any): Promise<CRUDReturn>;
    getUser(id: string): CRUDReturn;
    getAllUser(): CRUDReturn;
    putUser(id: string, user: any): CRUDReturn;
    patchUser(id: string, user: any): CRUDReturn;
    deleteUser(id: string): Promise<CRUDReturn>;
    userLogin(newUser: any): CRUDReturn;
    searchTerm(query: any): CRUDReturn | String[];
}
