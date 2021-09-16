export declare class User {
    private id;
    private name;
    private age;
    private email;
    private password;
    constructor(user?: any, id?: number, name?: string, age?: number, email?: string, password?: string);
    verifyEmail(email: string): boolean;
    verifyID(id: number): boolean;
    modifyUser(user: any): void;
    login(email: string, password: string): any;
    log(): void;
    toJson(): {
        id: number;
        name: string;
        age: number;
        email: string;
    };
}
