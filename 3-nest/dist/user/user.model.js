"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(user, id, name, age, email, password) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
            this.age = user.age;
            this.email = user.email;
            this.password = user.password;
        }
        if (id) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.email = email;
            this.password = password;
        }
    }
    verifyEmail(email) {
        return this.email == email;
    }
    verifyID(id) {
        return this.id == id;
    }
    modifyUser(user) {
        this.id = user.id ? user.id : this.id;
        this.name = user.name ? user.name : this.name;
        this.age = user.age ? user.age : this.age;
        this.email = user.email ? user.email : this.email;
        this.password = user.password ? user.password : this.password;
        console.log(this.password);
    }
    login(email, password) {
        return {
            toJson() {
            }
        };
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
//# sourceMappingURL=user.model.js.map