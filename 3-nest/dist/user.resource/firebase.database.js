"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQuery = void 0;
require("firebase/auth");
require("firebase/firestore");
const user_model_1 = require("./user.model");
const admin = require('firebase-admin');
const systemMessage = new user_model_1.SystemMessage();
class DatabaseQuery {
    static async commit(id, user) {
        try {
            var db = admin.firestore();
            await db.collection('users').doc(user.id).set(user.toJson());
            return systemMessage.success(user.toJson());
        }
        catch (error) {
            return systemMessage.error(error);
        }
    }
    static async delete(id) {
        try {
            var db = admin.firestore();
            await db.collection('users').doc(id).delete();
            return systemMessage.success(103);
        }
        catch (error) {
            return systemMessage.error(error);
        }
    }
    static async verifyID(id) {
        try {
            var db = admin.firestore();
            const userRef = db.collection('users').doc(id);
            var doc = await userRef.get();
            return !doc.exists;
        }
        catch (error) {
            throw systemMessage.error(error);
        }
    }
}
exports.DatabaseQuery = DatabaseQuery;
//# sourceMappingURL=firebase.database.js.map