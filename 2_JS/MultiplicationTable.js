console.log("--------------------------------------");
const prompt = require('prompt-sync')({ sigint: true });
var maxNum = prompt("Enter Multiplication table limit: ");

console.log();
for (var i = 1; i <= maxNum; i++) {
    for (var j = 1; j <= maxNum; j++) {
        var product = i * j;
        var space = product < 100 ? product < 10 ? "  " : " " : "";
        process.stdout.write(space + product + " ");
    }
    console.log();
}