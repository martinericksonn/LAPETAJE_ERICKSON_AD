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
                new user_model_1.User({
                    name: 'Leanne Graham',
                    age: 18,
                    email: 'sincere@april.biz',
                    password: 'LG_123456',
                }),
                new user_model_1.User({
                    name: 'Ervin Howell',
                    age: 21,
                    email: 'shanna@melissa.tv',
                    password: 'EH_123123',
                }),
                new user_model_1.User({
                    name: 'Nathan Plains',
                    age: 25,
                    email: 'nathan@yesenia.net',
                    password: 'NP_812415',
                }),
                new user_model_1.User({
                    name: 'Patricia Lebsack',
                    age: 18,
                    email: 'patty@kory.org',
                    password: 'PL_12345',
                }),
            ];
            users.forEach((user) => {
                user.id = Helper.generateUID();
                result.set(user.id, user);
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static validBodyPut(body) {
        var user = new user_model_1.User(body);
        var keys = Object.getOwnPropertyNames(user);
        keys = Helper.removeItemOnce(keys, 'id');
        console.log(keys);
        for (const key of Object.keys(body)) {
            console.log(key);
            if (keys.includes(`${key}`)) {
                keys = Helper.removeItemOnce(keys, key);
            }
        }
        return keys.length > 0;
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map