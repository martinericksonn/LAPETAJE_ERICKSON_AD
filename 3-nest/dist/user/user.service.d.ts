export declare class UserService {
    private users;
    private systemMessage;
    private generateID;
    private isCredentialsComplete;
    private isIdExist;
    private isEmailExist;
    register(user: any): any;
    getUser(id: number): any;
    getAllUser(): any;
    putUser(id: number, user: any): any;
    patchUser(id: number, user: any): any;
    deleteUser(id: number): any;
    userLogin(newUser: any): any;
    searchTerm(term: any): any;
}
