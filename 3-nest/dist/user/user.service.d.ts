import { CRUDReturn } from './crud_return.interface';
export declare class UserService {
    private users;
    constructor();
    register(newUser: any): CRUDReturn;
    getUser(id: string): any;
    getAllUser(): any;
    putUser(id: string, user: any): any;
    patchUser(id: string, user: any): any;
    deleteUser(id: string): any;
    userLogin(newUser: any): any;
    searchTerm(query: any): any;
}
