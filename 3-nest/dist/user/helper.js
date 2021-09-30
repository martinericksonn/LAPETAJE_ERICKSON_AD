"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const user_model_1 = require("./user.model");
const uuid_1 = require("uuid");
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
            console.log(error);
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
                    valid: false,
                    data: `${key} is not a valid attribute`,
                });
            }
        }
    }
}
exports.Helper = Helper;
Helper.systemMessage = new user_model_1.SystemMessage();
//# sourceMappingURL=helper.js.map