import { CRUDReturn } from '../user.resource/crud_return.interface';
export declare class UserService {
    constructor();
    register(newUser: any): Promise<CRUDReturn>;
    getUser(id: string): Promise<CRUDReturn>;
    getAllUser(): Promise<CRUDReturn>;
    putUser(id: string, user: any): Promise<CRUDReturn>;
    patchUser(id: string, user: any): Promise<CRUDReturn>;
    deleteUser(id: string): Promise<CRUDReturn>;
    loginUser(newUser: any): Promise<CRUDReturn>;
    searchTerm(query: any): Promise<CRUDReturn> | String[];
}
