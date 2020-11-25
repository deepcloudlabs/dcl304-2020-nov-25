x = 1 / 0; // Infinity
x = -1 / 0; // -Infinity
x = 0 / 0; // NaN
Number.isFinite(x)
Number.isInteger(x)
Number.isNaN(x)
// Floating-Point Unit -> 64-bit, 8-byte -> 2^64
let u = (0.1 + 0.2) + 0.3; // 0.60000000000000004 -> 0.00000000000000004
let v = 0.1 + (0.2 + 0.3); // 0.6
console.log(u == v); // false
u = 2.0;
u = u - 1.10;
console.log(u);
u = 100000000000000100;
u = u + 50; // 100000000000000140 -> 10
console.log(u);
u = u + 50;
console.log(u);
u = u + 50;
console.log(u);
// solution: https://github.com/MikeMcl/bignumber.js/, http://www.mathjs.org
if (typeof x === "boolean") {

}
// String: unicode encoded
s = '\u20ba'; // 2-byte, 3-byte,
s = '\ud834\udd1e'; // 4-byte -> emoji
console.log(s);

