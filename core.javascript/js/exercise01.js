let x = "Jack"; // String
console.log(typeof x); // String

x = true ; // boolean
console.log(typeof x); // boolean

x = 42; // Number: integer, floating-point
console.log(typeof x); // number

// Object
x = {"firstName": "jack", "lastName": "bauer", "birthYear": 1956};
console.log(typeof x);

// function, lambda-expression
x = function(u) { return u*u; };
console.log(typeof x);
x = u => u*u;
console.log(typeof x);

// array -> object
x = [4,8,15,16,23,42];
console.log(typeof x);
