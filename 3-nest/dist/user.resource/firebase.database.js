"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
require("firebase/auth");
require("firebase/firestore");
const user_model_1 = require("./user.model");
const admin = require('firebase-admin');
class Database {
    db = admin.firestore();
    static async commit(id, user) {
        var systemMessage = new user_model_1.SystemMessage();
        try {
            await Database.db.collection('users').doc(user.id).set(user.toJson());
            return systemMessage.success(user.toJson());
        } catch (error) {
            return systemMessage.error(error);
        }
    }
}
exports.Database = Database;

//# sourceMappingURL=firebase.database.js.map