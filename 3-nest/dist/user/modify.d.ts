export declare class Process {
    private static systemMessage;
    static updateUser(id: string, user: any, users: any): any;
    static registerUser(newUser: any, users: any): any;
    static getUser(id: any, users: any): any;
    static getAllUser(users: any): any[];
    static overwriteUser(id: string, newUser: any, users: any): any;
    static deleteUser(id: string, users: any): any;
    static LoginUser(newUser: any, users: any): any;
    static searchInUser(query: any, users: any): any[];
}
