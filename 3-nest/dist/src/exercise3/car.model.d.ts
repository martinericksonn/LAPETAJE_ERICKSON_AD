export declare class Car {
    private model;
    private color;
    private wheels;
    constructor(model: string, color: string, wheels: Wheels);
    log(): void;
    toJson(): {
        model: string;
        color: string;
        wheels: Wheels;
    };
}
export interface Wheels {
    name: string;
    radius: number;
}
