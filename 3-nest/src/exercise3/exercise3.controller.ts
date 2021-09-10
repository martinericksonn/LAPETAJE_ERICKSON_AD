import { Controller, Get, Param } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';

@Controller('exercise3')
export class Exercise3Controller {
    constructor(private readonly e3:Exercise3Service) {}

    @Get('/loopsTriangle/:height')
    loopsTriangle(@Param('height')height:string){
        var parsedHeight:number = parseInt(height);
        return this.e3.loopTriangle(parsedHeight);
    }

    @Get('hello/:someWords')
    hello(@Param('someWords')someWords:string){
        return this.e3.hello(someWords);
    }

    @Get('/prime/:numberToCheck')
    prime(@Param('numberToCheck')numberToCheck:string){
        var parsedNumber:number = parseInt(numberToCheck);
        return this.e3.prime(parsedNumber);
    }
}

