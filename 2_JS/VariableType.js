function println() {
    console.log("--------------------------")
}

println();
console.log("Number\n")
var num1 = 1000
var num2 = 12.32
console.log(`num1 = ${num1} is a type of ${typeof(num1)}`)
console.log(`num2 = ${num2} is a type of ${typeof(num2)}`)

println();
console.log("String\n");
var str1 = '\'I am a single quote string!\''
var str2 = "\"I am a Double quote string!\""
console.log(`str1 = ${str1} is a type of ${typeof(str1)}`)
console.log(`str2 = ${str2} is a type of ${typeof(str2)}`)

println();
console.log("Boolean\n");
var bool1 = (2 === 2);
var bool2 = (str1 == str2);
console.log(`bool1 = ${bool1} is a type of ${typeof(bool1)}`)
console.log(`bool2 = ${bool2} is a type of ${typeof(bool2)}`)

println()
console.log("Undefined")
var undef1
let undef2
console.log(`undef1 = ${undef1} is a type of ${typeof(undef1)}`)
console.log(`undef2 = ${undef2} is a type of ${typeof(undef2)}`)

println()
console.log("Null")

println()
console.log("Symbol")

println()
console.log("Object")