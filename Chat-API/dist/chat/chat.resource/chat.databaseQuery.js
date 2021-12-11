"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQuery = void 0;
const user_model_1 = require("../../user.resource/user.model");
require("firebase/auth");
require("firebase/firestore");
const admin = require('firebase-admin');
const systemMessage = new user_model_1.SystemMessage();
class DatabaseQuery {
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
    static async addMessage(user1, user2, message) {
        try {
            const db = admin.firestore();
            const chatUid = this.getMsgUid(user1, user2);
            const newMessage = DatabaseQuery.messageAddTime(message);
            const messageLocation = await db.collection('chats').doc(chatUid);
            await messageLocation.set({ user1: user1, user2: user2 });
            await messageLocation.collection('messages').add(newMessage);
        }
        catch (error) {
            console.log('error');
            console.log(error);
            return error;
        }
    }
    static async addMessageGroup(message) {
        try {
            var db = admin.firestore();
            const messageLocation = await db.collection('chats').doc('Tabi-Global');
            const newMessage = DatabaseQuery.messageAddTime(message);
            await messageLocation.collection('messages').add(newMessage);
            console.log('yeet');
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
exports.DatabaseQuery = DatabaseQuery;
//# sourceMappingURL=chat.databaseQuery.js.map