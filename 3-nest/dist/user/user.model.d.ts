export declare class User {
    private id;
    private name;
    private age;
    private email;
    private password;
    constructor(user: any);
    searchTerm(term: any): boolean;
    verifyEmail(email: string): boolean;
    verifyID(id: number): boolean;
    modifyUser(user: any): void;
    login(email: string, password: string): boolean;
    log(): void;
    toJson(): {
        id: number;
        name: string;
        age: number;
        email: string;
    };
}
export declare class SystemMessage {
    private status;
    private statusCode;
    private message;
    private systemMessage;
    success(code: number): any;
    error(code: number): any;
    private toJson;
}
