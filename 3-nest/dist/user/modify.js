"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const helper_1 = require("./helper");
const user_model_1 = require("./user.model");
class Process {
    static updateUser(id, user, users) {
        var newUser = users.get(id);
        newUser.replaceValues(user);
        newUser.toJson();
        return this.systemMessage.success(102, newUser.toJson());
    }
    static registerUser(newUser, users) {
        newUser.id = helper_1.Helper.generateUID();
        var user = new user_model_1.User(newUser);
        users.set(newUser.id, user);
        return this.systemMessage.success(101, user.toJson());
    }
    static getUser(id, users) {
        return users.get(id).toJson();
    }
    static getAllUser(users) {
        var populatedData = [];
        for (const user of users.values()) {
            populatedData.push(user.toJson());
        }
        return populatedData;
    }
    static overwriteUser(id, newUser, users) {
        newUser.id = id;
        users.set(newUser.id, new user_model_1.User(newUser));
        return this.systemMessage.success(102);
    }
    static deleteUser(id, users) {
        users.delete(id);
        return this.systemMessage.success(103);
    }
    static LoginUser(newUser, users) {
        for (const user of users.values())
            if (user.login(newUser.email, newUser.password))
                return this.systemMessage.success(104);
        throw this.systemMessage.error(505);
    }
    static searchInUser(query, users) {
        var result = [];
        for (const user of users.values())
            if (user.searchTerm(query))
                result.push(user.toJson());
        if (!result.length)
            throw this.systemMessage.error(507);
        result.unshift({ keyword: query, result: result.length });
        return result;
    }
}
exports.Process = Process;
Process.systemMessage = new user_model_1.SystemMessage();
//# sourceMappingURL=modify.js.map