import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: any): any;
    getAll(): any;
    getUser(id: string): any;
    patchUser(id: string, body: any): string;
    putUser(id: string, body: any): string;
}
