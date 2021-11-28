export declare class Exercise3Service {
    private cars;
    private cars2;
    searchCar(): {};
    getCar(id: string): {
        model: string;
        color: string;
        wheels: import("./car.model").Wheels;
    };
    loopsTriangle(height: number): string;
    addCar(car: any): void;
    deleteCar(id: string): void;
    replaceCar(id: string, car: any): void;
    addJoshCar2(): void;
    logAllCars(): void;
    loopTriangle(height: number): string;
    hello(someWords: string): string;
    prime(numberToCheck: number): string;
}
