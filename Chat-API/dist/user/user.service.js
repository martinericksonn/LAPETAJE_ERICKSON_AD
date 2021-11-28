"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const helper_1 = require("../user.resource/helper");
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const user_model_1 = require("../user.resource/user.model");
let UserService = class UserService {
    constructor() {
        this.DB = admin.firestore();
        this.AUTH = admin.auth();
        helper_1.Process.populateDatabase();
    }
    async getAllUser() {
        return helper_1.Process.getAllUsers();
    }
    async putUser(id, user) {
        try {
            helper_1.Verification.verifyCredentials(user, 'REGISTER');
            helper_1.Verification.verifyAge(user);
            helper_1.Verification.verifyName(user);
            helper_1.Verification.verifyPassword(user);
            await helper_1.Verification.verifyID(id);
            await helper_1.Verification.verifyEmail(user);
            return await helper_1.Process.overwriteUser(id, user);
        }
        catch (error) {
            return error;
        }
    }
    async patchUser(id, user) {
        try {
            helper_1.Verification.verifyCredentials(user, 'PATCH');
            helper_1.Verification.verifyAge(user);
            helper_1.Verification.verifyName(user);
            helper_1.Verification.verifyPassword(user);
            await helper_1.Verification.verifyID(id);
            await helper_1.Verification.verifyEmail(user, id);
            return await helper_1.Process.updateUser(user, id);
        }
        catch (error) {
            return error;
        }
    }
    async deleteUser(id) {
        try {
            await helper_1.Verification.verifyID(id);
            return helper_1.Process.deleteUser(id);
        }
        catch (error) {
            return error;
        }
    }
    async loginUser(user) {
        try {
            helper_1.Verification.verifyCredentials(user, 'LOGIN');
            return await helper_1.Process.loginUser(user);
        }
        catch (error) {
            return error;
        }
    }
    searchTerm(query) {
        try {
            return helper_1.Process.searchInUser(query);
        }
        catch (error) {
            return error;
        }
    }
    async getOne(id) {
        try {
            var result = await this.DB.collection('users').doc(id).get();
            if (result.exists) {
                var temp = result.data();
                temp['id'] = result.id;
                return {
                    success: true,
                    data: temp,
                };
            }
            else {
                return {
                    success: false,
                    data: `User ${id} does not exist in database!`,
                };
            }
        }
        catch (error) {
            console.log('Get one error');
            console.log(error.message);
            return {
                success: false,
                data: error.message,
            };
        }
    }
    async register(body) {
        try {
            var validBody = helper_1.Helper.validBodyPut(body);
            if (validBody.success) {
                var exists = await this.emailExists(body.email);
                console.log(`Does ${body.email} exist in db? ${exists}`);
                if (!exists) {
                    var authCreationResult;
                    try {
                        authCreationResult = await this.AUTH.createUser({
                            email: body.email,
                            password: body.password,
                        });
                    }
                    catch (error) {
                        throw error;
                    }
                    var newUser = new user_model_1.User(body.name, body.age, authCreationResult.email, authCreationResult.uid);
                    if (await this.saveToDB(newUser)) {
                        return {
                            success: true,
                            data: newUser.toJson(),
                        };
                    }
                    else {
                        throw new Error('generic database error');
                    }
                }
                else
                    throw new Error(`${body.email} is already in use by another user!`);
            }
            else {
                throw new Error(validBody.data);
            }
        }
        catch (error) {
            console.log('RegisterError');
            console.log(error.message);
            return { success: false, data: `Error adding account, ${error}` };
        }
    }
    async saveToDB(user) {
        console.log(`Attempting to save user ${user.id} ${user.email}`);
        try {
            var result = await user.commit(false);
            return result.success;
        }
        catch (error) {
            console.log('Save to db error');
            console.log(error.message);
            return false;
        }
    }
    async emailExists(email, options) {
        try {
            var userResults = await this.DB.collection('users')
                .where('email', '==', email)
                .get();
            console.log('Are the user results empty?');
            console.log(userResults.empty);
            if (userResults.empty)
                return false;
            for (const doc of userResults.docs) {
                console.log(doc.data());
                console.log('Are the options defined?');
                console.log(options != undefined);
                if (options != undefined) {
                    if (doc.id == (options === null || options === void 0 ? void 0 : options.exceptionId))
                        continue;
                }
                if (doc.data()['email'] === email) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        }
        catch (error) {
            console.log('Email exists subfunction error');
            console.log(error.message);
            return false;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map