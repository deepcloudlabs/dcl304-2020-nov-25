let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");

tcKimlikNoValidator = value => {
    if (value.match("^\\d{11}$") == null) {
        return false;
    }
    let digits = new Array(11);
    for (let i = 0; i < digits.length; ++i) {
        digits[i] = value.charCodeAt(i) - 48;
        if (digits[i] < 0 || digits[i] > 9) {
            return false;
        }
    }
    let x = digits[0];
    let y = digits[1];
    for (let i = 1; i < 5; i++) {
        x += Number(digits[2 * i]);
    }
    for (let i = 2; i <= 4; i++) {
        y += Number(digits[2 * i - 1]);
    }
    let c1 = 7 * x - y;
    if (c1 % 10 != digits[9]) {
        return false;
    }
    let c2 = 0;
    for (let i = 0; i < 10; ++i) {
        c2 += digits[i];
    }
    if (c2 % 10 != digits[10]) {
        return false;
    }
    return true;
};

const port = 9001;
const api = express();

api.use(bodyParser.json({limit: "5mb"}))
api.use(logger('dev'));
api.use((req, res, next) => { // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, POST, PUT, GET, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});
// Resource -> Aggregate -> Entity (Employee) -> Database
const employeeSchema = new mongoose.Schema({
    "_id": {
        type: String,
        required: true
    },
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    identityNo: {
        type: String,
        required: true,
        unique: true,
        validate: [
            tcKimlikNoValidator , 'You must provide a valid identity no'
        ]
    },
    photo : {
        type: String,
        required: false
    },
    iban : {
        type: String,
        required: true,
        unique: true
    },
    birthYear: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 3500
    },
    fulltime: {
        type: Boolean,
        required: false,
        default: true
    },
    department: {
        type: String,
        enum: ["IT", "Sales", "Finance", "HR"],
        required: false,
        default: "Finance"
    }
});

// REST over HTTP -> Integration Technology
// Single Business Capability -> MSA -> HR
// RESTful Service -> Single Business Capability ->
// Spring, .Net Core, Angular/React/Vue, Golang, Python, ...
// Resource: DDD -> Aggregate: Employee
// Hire Employee -> POST Employee
// Fire Employee -> DELETE Employee
// Increase Salary -> PUT/PATCH Employee
// Query Employee -> GET Identity/Department/...

let server = api.listen(port);
console.log("REST Api is up and running @ " + port);

