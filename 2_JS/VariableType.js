function println() {
    console.log("--------------------------");
}

println();
console.log("Number\n");
var num1 = 1000;
var num2 = 12.32;
console.log(`num1 = ${num1} is a type of ${typeof(num1)}`);
console.log(`num2 = ${num2} is a type of ${typeof(num2)}`);

println();
console.log("String\n");
var str1 = '\'I am a single quote string!\'';
var str2 = "\"I am a Double quote string!\"";
console.log(`str1 = ${str1} is a type of ${typeof(str1)}`);
console.log(`str2 = ${str2} is a type of ${typeof(str2)}`);

println();
console.log("Boolean\n");
var bool1 = (2 === 2);
var bool2 = (str1 == str2);
console.log(`bool1 = ${bool1} is a type of ${typeof(bool1)}`);
console.log(`bool2 = ${bool2} is a type of ${typeof(bool2)}`);

println();
console.log("Undefined\n");
var undef1;
let undef2;
console.log(`undef1 = ${undef1} is a type of ${typeof(undef1)}`);
console.log(`undef2 = ${undef2} is a type of ${typeof(undef2)}`);

println();
console.log("Null\n");
var null1 = 123;
let null2 = null;

var null1 = null
console.log(`null1 = ${null1} is a type of ${typeof(null1)}`);
console.log(`null2 = ${null2} is a type of ${typeof(null2)}`);

println();
console.log("Symbol\n");

const symbol1 = Symbol('hello');
const symbol2 = Symbol(123);
console.log(`symbol1 is a type of ${typeof(symbol1)}`);
console.log(`symbol2 is a type of ${typeof(symbol2)}`);

println();
console.log("Object\n");
var object1 = [1, "Two", 3, 4, 5, "6"];
var object2 = { one: 1, two: "two", three: [3, 2, 1], 4: 4.12, 5: { hello: "world" } };
console.log(`object1 = ${object1} is a type of ${typeof(object1)}\nobject2 =`);
console.log(object2);
console.log(`${object2} is a type of ${typeof(object2)}`);
println();