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
        this.systemMessage = new user_model_1.SystemMessage();
        this.idNumber = 0;
    }
    generateID() {
        return 20000 + (this.idNumber += 10);
    }
    isCredentialsComplete(user, option) {
        switch (option.toUpperCase()) {
            case "REGISTER": return user.name && user.age && user.email && user.password;
            case "LOGIN": return user.email && user.password;
        }
    }
    isEmailValid(newUser) {
        return newUser.email.trim() ? newUser.email.includes("@") : false;
    }
    isIdExist(id) {
        return this.users.has(id);
    }
    isEmailExist(newUser) {
        for (const user of this.users.values())
            if (user.verifyEmail(newUser.email.trim()) && !user.verifyID(newUser.id))
                return true;
        return false;
    }
    register(user) {
        if (!this.isCredentialsComplete(user, "REGISTER"))
            return this.systemMessage.error(502);
        if (!this.isEmailValid(user))
            return this.systemMessage.error(508);
        if (this.isEmailExist(user))
            return this.systemMessage.error(503);
        user.id = this.generateID();
        this.users.set(user.id, new user_model_1.User(user));
        return this.systemMessage.success(101);
    }
    getUser(id) {
        if (!this.isIdExist(id))
            return this.systemMessage.error(506);
        return this.users.get(id).toJson();
    }
    getAllUser() {
        var populatedData = [];
        for (const user of this.users.values())
            populatedData.push(user.toJson());
        return populatedData;
    }
    putUser(id, user) {
        user.id = id;
        if (!this.isCredentialsComplete(user, "REGISTER"))
            return this.systemMessage.error(502);
        if (!this.isIdExist(id))
            return this.systemMessage.error(506);
        if (!this.isEmailValid(user))
            return this.systemMessage.error(508);
        if (this.isEmailExist(user))
            return this.systemMessage.error(504);
        this.users.set(user.id, new user_model_1.User(user));
        return this.systemMessage.success(102);
    }
    testa() {
        console.log("yoyoyo");
        return true;
    }
    testb() {
        return false;
    }
    patchUser(id, user) {
        user.id = id;
        if (!this.isIdExist(id))
            return this.systemMessage.error(506);
        if (user.email && !this.isEmailValid(user))
            return this.systemMessage.error(508);
        if (user.email && this.isEmailExist(user))
            return this.systemMessage.error(504);
        this.users.get(id).modifyUser(user);
        return this.systemMessage.success(102);
    }
    deleteUser(id) {
        if (!this.isIdExist(id))
            return this.systemMessage.error(506);
        this.users.delete(id);
        return this.systemMessage.success(103);
    }
    userLogin(newUser) {
        if (!this.isCredentialsComplete(newUser, "LOGIN"))
            return this.systemMessage.error(502);
        for (const user of this.users.values())
            if (user.login(newUser.email, newUser.password))
                return this.systemMessage.success(104);
        return this.systemMessage.error(505);
    }
    searchTerm(term) {
        var resultData = [];
        for (const user of this.users.values())
            if (user.searchTerm(term))
                resultData.push(user.toJson());
        if (!resultData.length)
            return this.systemMessage.error(507);
        resultData.unshift({ keyword: term, result: resultData.length });
        return resultData;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map