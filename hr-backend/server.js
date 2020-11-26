let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");

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
            , 'You must provide a valid identity no'
        ]
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

