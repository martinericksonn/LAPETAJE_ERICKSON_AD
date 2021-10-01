import { CRUDReturn } from './crud_return.interface';
export declare class UserService {
    private users;
    constructor();
    register(newUser: any): CRUDReturn;
    getUser(id: string): CRUDReturn;
    getAllUser(): CRUDReturn;
    putUser(id: string, user: any): CRUDReturn;
    patchUser(id: string, user: any): CRUDReturn;
    deleteUser(id: string): CRUDReturn;
    userLogin(newUser: any): CRUDReturn;
    searchTerm(query: any): CRUDReturn | String[];
}
