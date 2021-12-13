"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = exports.Verification = exports.Helper = void 0;
const user_model_1 = require("./user.model");
const uuid_1 = require("uuid");
const firebase_database_1 = require("./firebase.database");
const chat_interface_1 = require("../chat.resource/chat.interface");
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
            users.forEach(async (user) => {
                try {
                    await Verification.verifyEmail(user);
                    await firebase_database_1.DatabaseQuery.commit(user);
                }
                catch (error) { }
                result.set(user.id, user);
            });
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
    static async verifyEmail(newUser, id) {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!newUser.email)
            return;
        if (!(newUser.email.trim() && emailRegexp.test(newUser.email)))
            throw this.systemMessage.error(508);
        if (await firebase_database_1.DatabaseQuery.alreadyExistEmail(newUser.email, id))
            throw this.systemMessage.error(503);
    }
    static verifyName(newUser) {
    }
    static verifyPassword(user) {
        if (!user.password)
            return;
        if (user.password.length < 6)
            throw this.systemMessage.error(511);
    }
    static verifyAge(newUser) {
        if (!newUser.age)
            return;
        if (!(newUser.age > 0 && newUser.age < 100))
            throw this.systemMessage.error(509);
    }
    static async verifyID(id) {
        if (await firebase_database_1.DatabaseQuery.hasID(id)) {
            throw this.systemMessage.error(506);
        }
    }
}
exports.Verification = Verification;
Verification.systemMessage = new user_model_1.SystemMessage();
class Process {
    static getMsgUid(user1, user2) {
        var user = [];
        user.push(user1.slice(-(user1.length / 2)));
        user.push(user2.slice(-(user1.length / 2)));
        user.sort();
        return user.join('');
    }
    static messageAddTime(message) {
        message.date = new Date();
        return message;
    }
    static async updateUser(user, id) {
        return await firebase_database_1.DatabaseQuery.updateValues(id, user);
    }
    static registerUser(newUser) {
        var user = new user_model_1.User(newUser);
        return firebase_database_1.DatabaseQuery.commit(user);
    }
    static async getUser(id) {
        var user = await firebase_database_1.DatabaseQuery.getUser(id);
        return this.systemMessage.success(user);
    }
    static async getAllUsers() {
        var populatedData = await firebase_database_1.DatabaseQuery.getAllUsers();
        return this.systemMessage.success(populatedData);
    }
    static async overwriteUser(id, newUser) {
        var user = new user_model_1.User(newUser);
        user.id = id;
        return await firebase_database_1.DatabaseQuery.replaceValues(id, user);
    }
    static async deleteUser(id) {
        return firebase_database_1.DatabaseQuery.delete(id);
    }
    static async loginUser(newUser) {
        var user;
        if ((user = await firebase_database_1.DatabaseQuery.loginUser(newUser.email, newUser.password)))
            return this.systemMessage.success(user.toJson());
        throw this.systemMessage.error(505);
    }
    static async searchInUser(query) {
        var result = await firebase_database_1.DatabaseQuery.searchInUser(query);
        if (!result.length)
            return this.systemMessage.error(511);
        return this.systemMessage.success(result);
    }
    static populateDatabase() {
        return Helper.populate();
    }
}
exports.Process = Process;
Process.systemMessage = new user_model_1.SystemMessage();
//# sourceMappingURL=helper.js.map