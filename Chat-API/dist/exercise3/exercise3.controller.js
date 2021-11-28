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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise3Controller = void 0;
const common_1 = require("@nestjs/common");
const exercise3_service_1 = require("./exercise3.service");
let Exercise3Controller = class Exercise3Controller {
    constructor(e3) {
        this.e3 = e3;
    }
    loopsTriangle(height) {
        var parsedHeight = parseInt(height);
        return this.e3.loopTriangle(parsedHeight);
    }
    hello(someWords) {
        return this.e3.hello(someWords);
    }
    prime(numberToCheck) {
        var parsedNumber = parseInt(numberToCheck);
        return this.e3.prime(parsedNumber);
    }
    getOne(id) {
        return this.e3.getCar(id);
    }
    addCar(body) {
        return this.e3.addCar(body);
    }
    replaceCar(id, body) {
        return this.e3.replaceCar(id, body);
    }
    removeCar(id) {
        return this.e3.deleteCar(id);
    }
    test2() {
        return this.e3.addJoshCar2();
    }
    logCars() {
        return this.e3.logAllCars();
    }
};
__decorate([
    (0, common_1.Get)('/loopsTriangle/:height'),
    __param(0, (0, common_1.Param)('height')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "loopsTriangle", null);
__decorate([
    (0, common_1.Get)('hello/:someWords'),
    __param(0, (0, common_1.Param)('someWords')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "hello", null);
__decorate([
    (0, common_1.Get)('/prime/:numberToCheck'),
    __param(0, (0, common_1.Param)('numberToCheck')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "prime", null);
__decorate([
    (0, common_1.Get)('/getCar/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('/addCar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "addCar", null);
__decorate([
    (0, common_1.Put)('/replaceCar/:id'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "replaceCar", null);
__decorate([
    (0, common_1.Delete)('/replaceCar/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "removeCar", null);
__decorate([
    (0, common_1.Get)('/addJoshCar2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "test2", null);
__decorate([
    (0, common_1.Get)('/logCars'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Exercise3Controller.prototype, "logCars", null);
Exercise3Controller = __decorate([
    (0, common_1.Controller)('exercise3'),
    __metadata("design:paramtypes", [exercise3_service_1.Exercise3Service])
], Exercise3Controller);
exports.Exercise3Controller = Exercise3Controller;
//# sourceMappingURL=exercise3.controller.js.map