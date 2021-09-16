"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("./user.model");
let UserService = class UserService {
    constructor() {
        this.users = new Map();
    }
    generateID() {
        return 20000 + (10 * this.users.size);
    }
    systemMessage(code) {
        switch (code) {
            case 101: return "Account has been successfully registered";
            case 102: return "Account credentials has been updated successfully";
            case 502: return "Sorry missing credentials, please try again";
            case 503: return "This Email is already registered, try logging in";
            case 504: return "This Email is already registered, cannot update credentials";
            case 506: return "ID do not exist";
        }
    }
    IsJsonString(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    isCredentialsComplete(user) {
        return (user.name && user.age && user.email && user.password);
    }
    isEmailRepeated(newUser) {
        for (const user of this.users.values()) {
            console.log(user.verifyEmail(newUser.email) + " " + !user.verifyID(newUser.id));
            if (user.verifyEmail(newUser.email) && !user.verifyID(newUser.id))
                return true;
        }
        return false;
    }
    patchUser(id, user) {
        user.id = id;
        this.IsJsonString(user);
        if (!this.users.has(id))
            return JSON.stringify(this.systemMessage(506));
        if (this.isEmailRepeated(user))
            return JSON.stringify(this.systemMessage(504));
        this.users.get(id).modifyUser(user);
        return JSON.stringify(this.systemMessage(102));
    }
    putUser(id, user) {
        user.id = id;
        if (!this.users.has(id))
            return JSON.stringify(this.systemMessage(506));
        if (this.isEmailRepeated(user))
            return JSON.stringify(this.systemMessage(504));
        if (!this.isCredentialsComplete(user))
            return JSON.stringify(this.systemMessage(502));
        var newUser = new user_model_1.User(user);
        this.users.set(user.id, newUser);
        return JSON.stringify(this.systemMessage(102));
    }
    getAllUser() {
        var populatedData = [];
        for (const user of this.users.values())
            populatedData.push(user.toJson());
        return populatedData;
    }
    getUser(id) {
        if (!this.users.has(id))
            return JSON.stringify(this.systemMessage(506));
        return this.users.get(id).toJson();
    }
    logAllUsers() {
        for (const [key, user] of this.users.entries())
            user.log();
    }
    register(user) {
        if (this.isEmailRepeated(user))
            return JSON.stringify(this.systemMessage(503));
        if (!this.isCredentialsComplete(user))
            return JSON.stringify(this.systemMessage(504));
        user.id = this.generateID();
        var newUser = new user_model_1.User(user);
        this.users.set(user.id, newUser);
        return JSON.stringify(this.systemMessage(101));
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map