const prompt = require('prompt-sync')({ sigint: true });
var number = prompt("Enter a number: ");

//loop number 0 to 1000 for checking
//for (var number = 0; number < 1000; number++) { 

var isPrime = number > 1 ? true : false;
for (var i = 2; i <= number; i++) {
    if (number % i == 0 && i != number) {
        isPrime = false;
        break;
    }
}

console.log(`${number} ${isPrime ? "is a Prime Number" :  "is NOT a Prime Number"}`);