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
const car_model_1 = require("./car.model");
const html_helper_1 = require("./html.helper");
let Exercise3Service = class Exercise3Service {
    constructor() {
        this.cars = new Map();
        this.cars2 = [{
                "id": "431",
                "model": "Ferrari",
                "color": "Black",
                "wheels": {
                    "name": "Pirelli",
                    "radius": 16
                }
            }, {
                "id": "123456",
                "model": "Montero",
                "color": "Red",
                "wheels": {
                    "name": "Goodyear",
                    "radius": 18
                }
            }
        ];
    }
    searchCar() {
        for (const car of this.cars2) {
            if (car['id'] === "JOSH420") {
                return car;
            }
        }
    }
    getCar(id) {
        return this.cars.get(id).toJson();
    }
    loopsTriangle(height) {
        var html = new html_helper_1.HTML();
        for (var i = 1; i <= height; i++) {
            var string = '';
            var j = i;
            while (j) {
                string += '*';
                j--;
            }
            html.add(html.div([string]));
            console.log(string);
        }
        return html.renderScreenHTML();
    }
    addCar(car) {
        var newCar;
        newCar = new car_model_1.Car(car === null || car === void 0 ? void 0 : car.model, car === null || car === void 0 ? void 0 : car.color, { name: car === null || car === void 0 ? void 0 : car.wheels.name, radius: car.wheels.radius });
        this.cars.set(car.id, newCar);
        this.logAllCars();
    }
    deleteCar(id) {
        if (this.cars.has(id))
            this.cars.delete(id);
        else
            console.log(id + " does not exist in database!");
    }
    replaceCar(id, car) {
        var newCar;
        newCar = new car_model_1.Car(car === null || car === void 0 ? void 0 : car.model, car === null || car === void 0 ? void 0 : car.color, { name: car === null || car === void 0 ? void 0 : car.wheels.name, radius: car.wheels.radius });
        this.cars.set(id, newCar);
        this.logAllCars();
    }
    addJoshCar2() {
        var joshuaCar;
        joshuaCar = new car_model_1.Car("Montero", "Blue", { name: "Goodyear", radius: 18 });
        this.cars.set("joshua", joshuaCar);
        this.logAllCars();
    }
    logAllCars() {
        for (const [key, car] of this.cars.entries()) {
            console.log(key);
            car.log();
        }
    }
    loopTriangle(height) {
        var string = "LoopsTriangle <br/><br/>";
        for (var i = 1; i <= height; i++)
            for (var j = 0; j < i; j++)
                string += "*";
        string += '<br/>';
        console.log(string);
        return string;
    }
    hello(someWords) {
        return "Hello There! " + someWords;
    }
    prime(numberToCheck) {
        var isPrime = numberToCheck > 1 ? true : false;
        for (var i = 2; i < numberToCheck; i++)
            if (numberToCheck % i == 0) {
                isPrime = false;
                break;
            }
        return `The number <b>${numberToCheck}</b> ${isPrime ? "is a Prime Number" : "is NOT a Prime Number"}`;
    }
};
Exercise3Service = __decorate([
    (0, common_1.Injectable)()
], Exercise3Service);
exports.Exercise3Service = Exercise3Service;
//# sourceMappingURL=exercise3.service.js.map