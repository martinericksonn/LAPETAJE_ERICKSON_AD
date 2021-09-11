import { Exercise3Service } from './exercise3.service';
export declare class Exercise3Controller {
    private readonly e3;
    constructor(e3: Exercise3Service);
    loopsTriangle(height: string): string;
    hello(someWords: string): string;
    prime(numberToCheck: string): string;
}
