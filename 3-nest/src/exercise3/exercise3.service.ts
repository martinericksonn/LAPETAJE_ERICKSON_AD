import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {
    loopTriangle(height: number):string{
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

    hello(someWords: string):string{
        return "Hello There! " + someWords;
    }

    prime(numberToCheck: number):string{
        var isPrime = numberToCheck > 1 ? true : false;
        for (var i = 2; i < numberToCheck; i++) {
            if (numberToCheck % i == 0 ) {
                isPrime = false;
                break;
            }
        }
        return `The number <b>${numberToCheck}</b> ${isPrime ? "is a Prime Number" :  "is NOT a Prime Number"}`;
    }
}
