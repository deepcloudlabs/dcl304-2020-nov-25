let lottery = (max, size) => {
    let numbers = [];
    while (numbers.length < size) {
        let number = Math.floor(Math.random() * max) + 1;
        if (!numbers.includes(number))
            numbers.push(number);
    }
    numbers.sort((x, y) => x - y);
    return numbers;
}
// lottery blocking/sync
console.log(lottery(75, 6));
console.log("after sync method...")

// 1. Promise
let async_lottery = (max, size) => {
    return new Promise((resolve,reject) => {
        if (Math.random()>0.5)
            reject("cannot produce lottery numbers.");
        let numbers = [];
        while (numbers.length < size) {
            let number = Math.floor(Math.random() * max) + 1;
            if (!numbers.includes(number))
                numbers.push(number);
        }
        numbers.sort((x, y) => x - y);
        resolve(numbers);
    });
}
async_lottery(75,6)
    .then( sayilar => console.log(sayilar))
    .catch( err => console.error(err))
    .finally(() => console.log("done."));
console.log("end of application")

// 2. async/await (ES8)
// async -> syntactic sugar -> Promise
let aslottery = async (max, size) => {
    let numbers = [];
    while (numbers.length < size) {
        let number = Math.floor(Math.random() * max) + 1;
        if (!numbers.includes(number))
            numbers.push(number);
    }
    numbers.sort((x, y) => x - y);
    return numbers;
}

aslottery(75,6)
    .then( sayilar => console.log(sayilar))
    .catch( err => console.error(err))
    .finally(() => console.log("done."));

// async function -> use it as sync function
async function bul(){
    let rakamlar = await aslottery(75,6);
    console.log(rakamlar);
}

bul()
