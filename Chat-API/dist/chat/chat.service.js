"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../user.resource/helper");
const chat_databaseQuery_1 = require("../chat.resource/chat.databaseQuery");
let ChatService = class ChatService {
    async sendMessageIndiv(user1, user2, message) {
        try {
            await helper_1.Verification.verifyID(user1);
            await helper_1.Verification.verifyID(user2);
            await chat_databaseQuery_1.DatabaseQuery.addMessage(user1, user2, message);
        }
        catch (error) {
            return error;
        }
    }
    sendMessageGroup(message) {
        try {
            helper_1.Verification.verifyID(message['uid']);
            chat_databaseQuery_1.DatabaseQuery.addMessageGroup(message);
        }
        catch (error) {
            return error;
        }
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)()
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map