let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let util = require("./utils");

const port = 9001;
const api = express();

api.use(bodyParser.json({limit: "5mb"}))
api.use(logger('dev'));
api.use((req, res, next) => { // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, POST, PUT, GET, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

mongoose.connect(
    "mongodb://localhost:27017/hrdatabase",
    {
        "useNewUrlParser": true,
        "keepAlive": true,
        "useCreateIndex": true,
        "useUnifiedTopology": true
    }
)

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
            util.tcKimlikNoValidator, 'You must provide a valid identity no'
        ]
    },
    photo: {
        type: String,
        required: false
    },
    iban: {
        type: String,
        required: true,
        unique: true,
        validate: [
            util.ibanValidator, 'You must provide a valid iban no'
        ]
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

const Employee = mongoose.model('employees', employeeSchema);

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

