"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = exports.Verification = exports.Helper = void 0;
const user_model_1 = require("./user.model");
const uuid_1 = require("uuid");
const firebase_database_1 = require("./firebase.database");
class Helper {
    static describeClass(typeOfClass) {
        let a = new typeOfClass();
        let array = Object.getOwnPropertyNames(a);
        return array;
    }
    static describeClassUser() {
        let a = new user_model_1.User('', 0, '', '');
        let array = Object.getOwnPropertyNames(a);
        return array;
    }
    static generateUID() {
        return (0, uuid_1.v4)().toString().replace(/-/g, '').substring(0, 27);
    }
    static removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    static populate() {
        var result = new Map();
        try {
            var users = [
                new user_model_1.User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'),
                new user_model_1.User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'),
                new user_model_1.User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'),
                new user_model_1.User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345'),
            ];
            users.forEach((user) => {
                result.set(user.id, user);
            });
            return result;
        }
        catch (error) {
            return null;
        }
    }
    static validBody(body) {
        var systemMessage = new user_model_1.SystemMessage();
        var keys = Helper.describeClassUser();
        var types = new Map();
        types.set('name', typeof '');
        types.set('age', typeof 0);
        types.set('email', typeof '');
        types.set('password', typeof '');
        for (const key of Object.keys(body)) {
            if (!keys.includes(`${key}`) && typeof body[key] != types.get(key)) {
                throw systemMessage.error(502);
            }
            if (typeof body[key] != types.get(key)) {
                throw this.systemMessage.custom({
                    success: false,
                    data: `${key} is not a valid attribute`,
                });
            }
        }
    }
    static validBodyPut(body) {
        var systemMessage = new user_model_1.SystemMessage();
        var keys = Helper.describeClassUser();
        keys = Helper.removeItemOnce(keys, 'id');
        for (const key of Object.keys(body)) {
            if (keys.includes(`${key}`)) {
                keys = Helper.removeItemOnce(keys, key);
            }
        }
        if (keys.length > 0) {
            throw this.systemMessage.custom({
                success: false,
                data: `Payload is missing ${keys}`,
            });
        }
        return this.systemMessage.custom({ success: true, data: null });
    }
}
exports.Helper = Helper;
Helper.systemMessage = new user_model_1.SystemMessage();
class Verification {
    static verifyCredentials(newUser, option) {
        switch (option.toUpperCase()) {
            case 'LOGIN':
                if (!(newUser.email && newUser.password))
                    throw this.systemMessage.error(502);
                break;
            case 'REGISTER':
                Helper.validBody(newUser);
                Helper.validBodyPut(newUser);
                break;
            case 'PATCH':
                Helper.validBody(newUser);
                break;
        }
    }
    static verifyEmail(newUser, users, id) {
        if (!newUser.email)
            return;
        if (!(newUser.email.trim() && newUser.email.includes('@')))
            throw this.systemMessage.error(508);
        if (id) {
            for (const user of users.values()) {
                if (user.verifyEmail(newUser.email.trim()) && !user.verifyID(id))
                    throw this.systemMessage.error(503);
            }
            return;
        }
        for (const user of users.values())
            if (user.verifyEmail(newUser.email.trim()))
                throw this.systemMessage.error(503);
    }
    static verifyAge(newUser) {
        if (!newUser.age)
            return;
        if (newUser.age < 0)
            throw this.systemMessage.error(509);
    }
    static async verifyID(id) {
        if (await firebase_database_1.DatabaseQuery.verifyID(id)) {
            throw this.systemMessage.error(506);
        }
    }
}
exports.Verification = Verification;
Verification.systemMessage = new user_model_1.SystemMessage();
class Process {
    static updateUser(id, user, users) {
        var newUser = users.get(id);
        newUser.replaceValues(user);
        return this.systemMessage.success(newUser.toJson());
    }
    static registerUser(newUser, users) {
        var user = new user_model_1.User(newUser);
        users.set(user.id, user);
        return firebase_database_1.DatabaseQuery.commit(user.id, user);
    }
    static getUser(id, users) {
        return this.systemMessage.success(users.get(id).toJson());
    }
    static getAllUser(users) {
        var populatedData = [];
        for (const user of users.values()) {
            populatedData.push(user.toJson());
        }
        return this.systemMessage.success(populatedData);
    }
    static overwriteUser(id, newUser, users) {
        var user = new user_model_1.User(newUser);
        user.id = id;
        users.set(newUser.id, user);
        return this.systemMessage.success(user.toJson());
    }
    static deleteUser(id) {
        return firebase_database_1.DatabaseQuery.delete(id);
    }
    static loginUser(newUser, users) {
        for (const user of users.values())
            if (user.login(newUser.email, newUser.password))
                return this.systemMessage.success(user.toJson());
        throw this.systemMessage.error(505);
    }
    static searchInUser(query, users) {
        var result = [];
        for (const user of users.values())
            if (user.searchTerm(query))
                result.push(user.toJson());
        if (!result.length)
            return this.systemMessage.error(result);
        return this.systemMessage.success(result);
    }
    static populateDatabase() {
        return Helper.populate();
    }
}
exports.Process = Process;
Process.systemMessage = new user_model_1.SystemMessage();
//# sourceMappingURL=helper.js.map