"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQuery = void 0;
require("firebase/auth");
require("firebase/firestore");
const user_model_1 = require("./user.model");
const admin = require('firebase-admin');
const systemMessage = new user_model_1.SystemMessage();
const users = 'users';
class DatabaseQuery {
    static async commit(id, user) {
        try {
            var db = admin.firestore();
            await db.collection(users).doc(user.id).set(user.toJsonPass());
            return systemMessage.success(user.toJson());
        }
        catch (error) {
            return systemMessage.error(error);
        }
    }
    static async delete(id) {
        try {
            var db = admin.firestore();
            await db.collection(users).doc(id).delete();
            return systemMessage.success(103);
        }
        catch (error) {
            return systemMessage.error(error);
        }
    }
    static async hasID(id) {
        try {
            var db = admin.firestore();
            const userRef = db.collection(users).doc(id);
            var doc = await userRef.get();
            return !doc.exists;
        }
        catch (error) {
            throw systemMessage.error(error);
        }
    }
    static async alreadyExistEmail(email, id) {
        try {
            var db = admin.firestore();
            const userRef = db.collection(users);
            const userResults = await userRef.where('email', '==', email).get();
            console.log(!userResults.empty && id);
            if (!userResults.empty && id)
                for (const user of userResults.docs) {
                    if (user.id == id)
                        return false;
                }
            if (!userResults.empty)
                return true;
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
    static async replaceValues(id, user) {
        try {
            var db = admin.firestore();
            await db.collection(users).doc(id).set(user.toJsonPass());
            return systemMessage.success(user.toJson());
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
    static async updateValues(id, user) {
        try {
            var db = admin.firestore();
            await db.collection(users).doc(id).update(user);
            var newUser = await db.collection(users).doc(id).get();
            return systemMessage.success(newUser.data());
        }
        catch (error) {
            console.log(error);
            throw systemMessage.error(error);
        }
    }
}
exports.DatabaseQuery = DatabaseQuery;
//# sourceMappingURL=firebase.database.js.map