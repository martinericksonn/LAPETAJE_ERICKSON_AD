"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMessage = exports.User = void 0;
const helper_1 = require("./helper");
require("firebase/auth");
require("firebase/firestore");
class User {
    constructor(user, age, email, password) {
        if (user.id) {
            this.id = user.id;
        }
        if (typeof user === 'string') {
            this.id = helper_1.Helper.generateUID();
            this.name = user;
            this.age = age;
            this.email = email;
            this.password = password;
        }
        else {
            this.id = user.id ? user.id : helper_1.Helper.generateUID();
            this.name = user.name.trim();
            this.age = user.age;
            this.email = user.email.trim();
            this.password = user.password.trim();
        }
    }
    log() {
        console.log(`${this.id} ${this.name} ${this.age} ${this.email} ${this.password}`);
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email,
        };
    }
    toJsonPass() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email,
            password: this.password,
        };
    }
}
exports.User = User;
class SystemMessage {
    systemMessage(code) {
        switch (code) {
            case 101:
                return 'Account has been successfully registered';
            case 102:
                return 'Account credentials has been updated successfully';
            case 103:
                return 'Account has been successfully deleted';
            case 104:
                return 'Login Successful';
            case 501:
                return 'The email address or password is incorrect.';
            case 502:
                return 'Sorry Invalid or Missing credentials, please try again';
            case 503:
                return 'This Email is already registered, try logging in';
            case 504:
                return 'This Email is already registered, cannot update credentials';
            case 505:
                return 'The email address or password is incorrect';
            case 506:
                return 'This ID does not exist';
            case 507:
                return "Sorry we couldn't find any results";
            case 508:
                return 'Sorry this email is not a valid email';
            case 509:
                return 'Sorry this age is not a valid age';
            case 509:
                return 'No result found';
            default:
                return 'Unknown request';
        }
    }
    custom(data) {
        return data;
    }
    success(code) {
        if (isNaN(code)) {
            this.isSuccess = true;
            this.data = code;
            return this.toJson();
        }
        this.isSuccess = true;
        this.data = this.systemMessage(code);
        return this.toJson();
    }
    error(code) {
        if (isNaN(code)) {
            this.isSuccess = false;
            this.data = code;
            return this.toJson();
        }
        this.isSuccess = false;
        this.data = this.systemMessage(code);
        return this.toJson();
    }
    toJson() {
        return {
            success: this.isSuccess,
            data: this.data,
        };
    }
}
exports.SystemMessage = SystemMessage;
//# sourceMappingURL=user.model.js.map