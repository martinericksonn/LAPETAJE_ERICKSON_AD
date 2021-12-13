"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQuery = void 0;
const user_model_1 = require("../user.resource/user.model");
require("firebase/auth");
require("firebase/firestore");
const helper_1 = require("../user.resource/helper");
const admin = require('firebase-admin');
class DatabaseQuery {
    static async addMessage(user1, user2, message) {
        try {
            const db = admin.firestore();
            const chatUid = helper_1.Process.getMsgUid(user1, user2);
            const newMessage = helper_1.Process.messageAddTime(message);
            const messageLocation = await db.collection('chats').doc(chatUid);
            await messageLocation.set({ user1: user1, user2: user2 });
            await messageLocation.collection('messages').add(newMessage);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    static async addMessageGroup(message) {
        try {
            const db = admin.firestore();
            const newMessage = helper_1.Process.messageAddTime(message);
            const messageLocation = await db.collection('chats').doc('Tabi-Global');
            await messageLocation.collection('messages').add(newMessage);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
exports.DatabaseQuery = DatabaseQuery;
//# sourceMappingURL=chat.databaseQuery.js.map