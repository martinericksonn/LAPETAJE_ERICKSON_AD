"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let AuthGuard = class AuthGuard {
    constructor() {
        this.logger = new common_1.Logger("AuthGuard");
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    async validateRequest(request) {
        const jwt = JSON.parse(JSON.stringify(request.headers));
        console.log(jwt.authportal);
        if (jwt.authportal != null)
            return await this.verifyToken(jwt.authportal);
        else
            return false;
    }
    async verifyToken(token) {
        try {
            const decodedIdToken = await admin
                .auth()
                .verifyIdToken(token);
            this.logger.debug(`Authenticated request from ${decodedIdToken.email}`);
            return decodedIdToken != null;
        }
        catch (e) {
            console.log(e.code);
            console.log(e.message);
            return false;
        }
    }
    async decodeToken(token) {
        try {
            const decodedIdToken = await admin
                .auth()
                .verifyIdToken(token);
            return decodedIdToken;
        }
        catch (e) {
            console.log(e.code);
            console.log(e);
            return null;
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map