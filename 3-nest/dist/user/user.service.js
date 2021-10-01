"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const helper_1 = require("./helper");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor() {
        this.users = new Map();
        this.users = helper_1.Process.populateDatabase();
    }
    register(newUser) {
        try {
            helper_1.Verification.verifyCredentials(newUser, 'REGISTER');
            helper_1.Verification.verifyAge(newUser);
            helper_1.Verification.verifyEmail(newUser, this.users);
            return helper_1.Process.registerUser(newUser, this.users);
        }
        catch (error) {
            return error;
        }
    }
    getUser(id) {
        try {
            helper_1.Verification.verifyID(id, this.users);
            return helper_1.Process.getUser(id, this.users);
        }
        catch (error) {
            return error;
        }
    }
    getAllUser() {
        return helper_1.Process.getAllUser(this.users);
    }
    putUser(id, user) {
        try {
            helper_1.Verification.verifyCredentials(user, 'REGISTER');
            helper_1.Verification.verifyAge(user);
            helper_1.Verification.verifyID(id, this.users);
            helper_1.Verification.verifyEmail(user, this.users, id);
            return helper_1.Process.overwriteUser(id, user, this.users);
        }
        catch (error) {
            return error;
        }
    }
    patchUser(id, user) {
        try {
            helper_1.Verification.verifyCredentials(user, 'PATCH');
            helper_1.Verification.verifyAge(user);
            helper_1.Verification.verifyID(id, this.users);
            helper_1.Verification.verifyEmail(user, this.users, id);
            return helper_1.Process.updateUser(id, user, this.users);
        }
        catch (error) {
            return error;
        }
    }
    deleteUser(id) {
        try {
            helper_1.Verification.verifyID(id, this.users);
            return helper_1.Process.deleteUser(id, this.users);
        }
        catch (error) {
            return error;
        }
    }
    userLogin(newUser) {
        try {
            helper_1.Verification.verifyCredentials(newUser, 'LOGIN');
            return helper_1.Process.loginUser(newUser, this.users);
        }
        catch (error) {
            return error;
        }
    }
    searchTerm(query) {
        try {
            return helper_1.Process.searchInUser(query, this.users);
        }
        catch (error) {
            return error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map