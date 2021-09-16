export declare class UserService {
    private users;
    private generateID;
    private systemMessage;
    IsJsonString(str: any): boolean;
    private isCredentialsComplete;
    private isEmailRepeated;
    patchUser(id: number, user: any): string;
    putUser(id: number, user: any): string;
    getAllUser(): any;
    getUser(id: number): any;
    logAllUsers(): void;
    register(user: any): any;
}
