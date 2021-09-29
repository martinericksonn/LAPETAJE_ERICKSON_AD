export declare class Verification {
    private static systemMessage;
    static verifyCredentials(newUser: any, option: string): void;
    static verifyEmail(newUser: any, users?: any, id?: string): void;
    static verifyID(id: string, users: any): void;
}
