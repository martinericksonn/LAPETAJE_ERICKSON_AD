"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verification = void 0;
const user_model_1 = require("./user.model");
class Verification {
    static verifyCredentials(newUser, option) {
        switch (option.toUpperCase()) {
            case 'REGISTER':
                break;
            case 'LOGIN':
                if (!(newUser.email && newUser.password))
                    throw this.systemMessage.error(502);
        }
    }
    static verifyEmail(newUser, users, id) {
        if (!newUser.email)
            return;
        if (!(newUser.email.trim() && newUser.email.includes('@')))
            throw this.systemMessage.error(508);
        for (const user of users.values()) {
            if (user.verifyEmail(newUser.email.trim()) && !user.verifyID(id))
                throw this.systemMessage.error(503);
        }
    }
    static verifyID(id, users) {
        if (!users.has(id))
            throw this.systemMessage.error(506);
    }
}
exports.Verification = Verification;
Verification.systemMessage = new user_model_1.SystemMessage();
//# sourceMappingURL=verify.js.map