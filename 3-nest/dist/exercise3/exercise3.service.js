"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise3Service = void 0;
const common_1 = require("@nestjs/common");
let Exercise3Service = class Exercise3Service {
    loopTriangle(height) {
        var string = "LoopsTriangle <br/><br/>";
        for (var i = 1; i <= height; i++) {
            for (var j = 0; j < i; j++) {
                string += "*";
            }
            string += '<br/>';
        }
        console.log(string);
        return string;
    }
    hello(someWords) {
        return "Hello There! " + someWords;
    }
    prime(numberToCheck) {
        var isPrime = numberToCheck > 1 ? true : false;
        for (var i = 2; i < numberToCheck; i++) {
            if (numberToCheck % i == 0) {
                isPrime = false;
                break;
            }
        }
        return `The number <b>${numberToCheck}</b> ${isPrime ? "is a Prime Number" : "is NOT a Prime Number"}`;
    }
};
Exercise3Service = __decorate([
    (0, common_1.Injectable)()
], Exercise3Service);
exports.Exercise3Service = Exercise3Service;
//# sourceMappingURL=exercise3.service.js.map