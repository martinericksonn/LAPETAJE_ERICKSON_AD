"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMessage = exports.User = void 0;
class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name.trim();
        this.age = user.age;
        this.email = user.email.trim();
        this.password = user.password.trim();
    }
    searchTerm(term) {
        for (var attributename in this) {
            if (attributename != 'password' &&
                this[attributename] == term.trim().toLowerCase())
                return true;
        }
        return false;
    }
    verifyEmail(email) {
        return email ? this.email.toLowerCase() == email.toLowerCase() : false;
    }
    verifyID(id) {
        return this.id == id;
    }
    replaceValues(user) {
        for (var attributename in user) {
            this[attributename] = user[attributename];
        }
    }
    login(email, password) {
        return (this.email.toLowerCase() == email.toLowerCase() &&
            this.password == password);
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
            default:
                return 'Unknown request';
        }
    }
    custom(data) {
        return data;
    }
    success(code, data) {
        if (data) {
            this.isSuccess = true;
            this.message = this.systemMessage(code);
            this.data = data;
            return this.toJsonWithMessage();
        }
        this.isSuccess = true;
        this.data = this.systemMessage(code);
        return this.toJson();
    }
    error(code) {
        this.isSuccess = false;
        this.message = this.systemMessage(code);
        return this.toJson();
    }
    toJson() {
        return {
            success: this.isSuccess,
            message: this.message,
        };
    }
    toJsonWithMessage() {
        return {
            success: this.isSuccess,
            message: this.message,
            data: this.data,
        };
    }
}
exports.SystemMessage = SystemMessage;
//# sourceMappingURL=user.model.js.map