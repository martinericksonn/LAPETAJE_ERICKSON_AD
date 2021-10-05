"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQuerry = exports.Database = void 0;
require("firebase/auth");
require("firebase/firestore");
const user_model_1 = require("./user.model");
const firestore_1 = require("firebase/firestore");
const admin = require('firebase-admin');
const db = admin.firestore();
class Database {
    static async commit(id, user) {
        var systemMessage = new user_model_1.SystemMessage();
        try {
            await db.collection('users').doc(user.id).set(user.toJson());
            return systemMessage.success(user.toJson());
        }
        catch (error) {
            return systemMessage.error(error);
        }
    }
}
exports.Database = Database;
class DatabaseQuerry {
    verifyID(id) {
        const usersref = (0, firestore_1.collection)(db, 'users');
    }
}
exports.DatabaseQuerry = DatabaseQuerry;
//# sourceMappingURL=firebase.database.js.map