"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMessage = exports.User = void 0;
class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name.trim();
        this.age = user.age.trim();
        this.email = user.email.trim();
        this.password = user.password.trim();
    }
    searchTerm(term) {
        return (this.id == term || this.name.toLowerCase() == term.toLowerCase()
            || this.age == term || this.email.toLowerCase() == term.toLowerCase());
    }
    verifyEmail(email) {
        return email ? this.email.toLowerCase() == email.toLowerCase() : false;
    }
    verifyID(id) {
        return this.id == id;
    }
    modifyUser(user) {
        this.id = user.id ? user.id : this.id;
        this.name = user.name ? user.name.trim() : this.name;
        this.age = user.age ? user.age.trim() : this.age;
        this.email = user.email ? user.email.trim() : this.email;
        this.password = user.password ? user.password.trim() : this.password;
    }
    login(email, password) {
        return this.email.toLowerCase() == email.toLowerCase() && this.password == password;
    }
    log() {
        console.log(`${this.id} ${this.name} ${this.age} ${this.email} ${this.password}`);
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email
        };
    }
}
exports.User = User;
class SystemMessage {
    systemMessage(code) {
        switch (code) {
            case 101: return "Account has been successfully registered";
            case 102: return "Account credentials has been updated successfully";
            case 103: return "Account has been successfully deleted";
            case 104: return "Login Successful";
            case 501: return "The email address or password is incorrect.";
            case 502: return "Sorry Invalid or Missing credentials, please try again";
            case 503: return "This Email is already registered, try logging in";
            case 504: return "This Email is already registered, cannot update credentials";
            case 505: return "The email address or password is incorrect";
            case 506: return "This ID does not exist";
            case 507: return "Sorry we couldn't find any results";
            case 508: return "Sorry this email is not a valid email";
            default: return "Unknown request";
        }
    }
    success(code) {
        this.statusCode = code;
        this.message = this.systemMessage(code);
        this.status = "success";
        return this.toJson();
    }
    error(code) {
        this.statusCode = code;
        this.message = this.systemMessage(code);
        this.status = "error";
        return this.toJson();
    }
    toJson() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            request: this.status
        };
    }
}
exports.SystemMessage = SystemMessage;
//# sourceMappingURL=user.model.js.map