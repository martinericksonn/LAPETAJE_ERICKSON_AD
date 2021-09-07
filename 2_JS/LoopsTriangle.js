const prompt = require('prompt-sync')({ sigint: true });

console.log("LoopsTriangle");
console.log("------------------------------");
var height = prompt("Enter height of triangle: ");
var string = "*";
for (var i = 0; i < height; i++) {
    console.log(`${string}`);
    string += "*";
}
console.log("------------------------------");