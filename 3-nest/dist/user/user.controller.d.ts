import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: any): any;
    getAll(): any;
    getUser(id: string): any;
    putUser(id: string, body: any): any;
    patchUser(id: string, body: any): any;
    deleteUser(id: string): any;
    userLogin(body: any): any;
    searchTerm(term: string): any;
}
