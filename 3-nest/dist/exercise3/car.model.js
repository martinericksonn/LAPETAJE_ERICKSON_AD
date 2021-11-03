"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
class Car {
    constructor(model, color, wheels) {
        this.model = model;
        this.color = color;
        this.wheels = wheels;
    }
    log() {
        console.log(`${this.model}:${this.color} with wheels ${this.wheels.name}, ${this.wheels.radius}`);
    }
    toJson() {
        return {
            model: this.model,
            color: this.color,
            wheels: this.wheels
        };
    }
}
exports.Car = Car;
//# sourceMappingURL=car.model.js.map