import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import * as admin from "firebase-admin";
export declare class AuthGuard implements CanActivate {
    private readonly logger;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    validateRequest(request: Request): Promise<boolean>;
    verifyToken(token: any): Promise<boolean>;
    decodeToken(token: string): Promise<admin.auth.DecodedIdToken | null>;
}
