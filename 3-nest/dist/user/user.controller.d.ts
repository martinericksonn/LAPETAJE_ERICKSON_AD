import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: any): import("../user.resource/crud_return.interface").CRUDReturn;
    getAll(): import("../user.resource/crud_return.interface").CRUDReturn;
    getUser(id: string): import("../user.resource/crud_return.interface").CRUDReturn;
    putUser(id: string, body: any): import("../user.resource/crud_return.interface").CRUDReturn;
    patchUser(id: string, body: any): import("../user.resource/crud_return.interface").CRUDReturn;
    deleteUser(id: string): import("../user.resource/crud_return.interface").CRUDReturn;
    userLogin(body: any): import("../user.resource/crud_return.interface").CRUDReturn;
    searchTerm(term: string): import("../user.resource/crud_return.interface").CRUDReturn | String[];
}
