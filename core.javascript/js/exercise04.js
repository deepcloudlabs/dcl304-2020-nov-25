function fun(x, y, z) {
    return x * y + z;
}


// Solution ?
// 1. Defensive Programming

function fun(x, y, z) {
    if (arguments.length!=3){
        console.error("we expect three numbers.")
        throw "illegal arguments!"
    }
    return x * y + z;
}

// fun(); // NaN
// fun(1); // NaN
// fun(1,2); // NaN
// fun(1,2,3); // Correct: 5
// fun(1,2,3,4,5,6,7,8,9); // Bug, Error -> not Fault 5

// 2. initial values
function fun(x=1, y=2, z=3) {
//    x = x || 1;
//    y = y || 2;
//    z = z || 3;
    return x * y + z;
}

fun(); // 5
fun(1); // 5
fun(1,2); // 5
