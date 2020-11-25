// Array
// i)
numbers = [4, 8, 16, 23, 42, 15];
// ii)
numbers = [];
numbers[0] = 4;
numbers[1] = 8;
numbers[2] = 16;
numbers[3] = 23;
numbers[4] = 42;
numbers[5] = 15;
// iii)
numbers = new Array(4, 8, 16, 23, 42, 15)
// numbers.length = 6, values: 4, 8, 16, 23, 42, 15
// Warning:
numbers = new Array(10)
// numbers.length = 10, 10 x undefined
employees = [
    {id: 1, salary: 10000, byear: 1973},
    {id: 2, salary: 20000, byear: 1970},
    "elma",
    {id: 3, salary: 15000, byear: 1973},
    {id: 4, salary: 12000, byear: 1992}
]

order_by_byear_asc = function (e1, e2) {
    let e1_value = e1['byear'] || Number.MAX_VALUE;
    let e2_value = e2['byear'] || Number.MAX_VALUE;
    return e1_value - e2_value;
}

order_by_byear_desc = function (e1, e2) {
    let e1_value = e1['byear'] || Number.MIN_VALUE;
    let e2_value = e2['byear'] || Number.MIN_VALUE;
    return e2_value - e1_value;
}

employees.sort(order_by_byear_asc)
employees.sort(order_by_byear_desc)

employees.sort((e1, e2) => e2.byear - e1.byear)

// while loop
let i = 0;
while (i < numbers.length) {
    console.log(numbers[i]);
    ++i;
}
let i = 0;
do {
    console.log(numbers[i]);
    ++i;
} while (i < numbers.length)
// external for loops
for (let i = 0; i < numbers.length; ++i) console.log(numbers[i]);

for (let index in numbers) console.log(numbers[index]);

for (let number of numbers) console.log(number); // ES6

// internal for loop (ES6+)
numbers.forEach(console.log)
numbers.forEach((number, index, array) => console.log(index))
numbers.forEach(number => console.log(number))

// filter/map/reduce -> Hadoop (HDFS, MapReduce)
// array: even -> squared -> sum
numbers = [4, 8, 15, 16, 23, 42]
let sum = 0;
for (let number of numbers) {
    let squared = 0;
    if (number % 2 == 0)
        squared = number * number;
    sum = sum + squared;
}
console.log(sum)
let accumulator = (acc,n) => {
    console.log("acc: "+acc+", n: "+n);
    return acc+n;
}
// functional programming + lambda expression
numbers.filter(n => n%2 == 0).map(m => m*m).reduce((acc,x)=>acc+x, 0)

// counts the number of even elements
numbers.filter(n => n%2 == 0).map(m => 1).reduce(accumulator, 0)
// finds the sum of all elements
numbers.reduce(accumulator, 0)



