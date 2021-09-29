export declare class Verification {
    private static systemMessage;
    static verifyCredentials(newUser: any, option: string): void;
    static verifyEmail(newUser: any, users?: any): void;
    static verifyID(id: string, users: any): boolean;
}
