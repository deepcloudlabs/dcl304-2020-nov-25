let numbers = [4, 8, 15, 16, 23, 42];
let sum = numbers.filter(n => n%2 == 0)
       .map( m => m*m)
       .reduce( (sum,n) => sum + n, 0 );
console.log(sum);

// Generator Function
function* lottery(max, size){
    for (let i=0;i<size;++i) {
        console.log("while")
        yield Math.floor(Math.random() * max) + 1;
    }
}
for (let num of lottery(75,6)){
    console.log("num: "+num);
}