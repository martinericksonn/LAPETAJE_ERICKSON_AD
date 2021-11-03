import { Exercise3Service } from './exercise3.service';
export declare class Exercise3Controller {
    private readonly e3;
    constructor(e3: Exercise3Service);
    loopsTriangle(height: string): string;
    hello(someWords: string): string;
    prime(numberToCheck: string): string;
    getOne(id: string): {
        model: string;
        color: string;
        wheels: import("./car.model").Wheels;
    };
    addCar(body: any): void;
    replaceCar(id: string, body: any): void;
    removeCar(id: string): void;
    test2(): void;
    logCars(): void;
}
