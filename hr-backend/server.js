let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let util = require("./utils");

let swaggerUi = require("swagger-ui-express");
let openApiDoc = require("./swagger-hr-api.json");

const port = 9001;
const api = express();
const updatableEmployeeFields = ["salary", "iban", "photo", "department", "fulltime"];
const sockets = [];

api.use(bodyParser.json({limit: "5mb"}))
api.use(logger('dev'));
api.use((req, res, next) => { // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, POST, PUT, GET, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));

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

//REST over HTTP -> Resource (Employee -> Aggregate)
// 1. HTTP Method
// 2. URL -> /employees
// 3. Representation: "JSON"/"XML",
//    HTTP Request Header -> "Accept: application/json" -> Response Body
//                           "Content-Type: application/json" -> Request Body
api.get("/hr/api/v1/employees/:tckimlikno", async (req, res) => {
    let tckimlikno = req.params.tckimlikno;
    res.set("Content-Type", "application/json");
    try {
        Employee.findOne(
            {"identityNo": tckimlikno},
            {"_id": false}
        ).exec().then(emp => res.status(200).send(emp)); // Promise -> async
    } catch (err) {
        res.status(404).send({"status": "employee is not found."});
    }
});

// /hr/api/v1/employees?page=0&size=25
api.get("/hr/api/v1/employees", (req, res) => {
    let page = Number(req.query.page || 0);
    let size = Number(req.query.size || 25);
    let offset = page * size;
    Employee.find(
        {},
        {"_id": false},
        {"skip": offset, "limit": size},
        async (err, employees) => {
            res.set("Content-Type", "application/json");
            if (err)
                res.status(404).send({"status": "Page not found"});
            else
                res.status(200).send(employees);
        }
    )
})

api.post("/hr/api/v1/employees", (req, res) => {
    let emp = req.body;
    emp._id = emp.identityNo;
    let employee = new Employee(emp);
    employee.save((err, newemp) => {
        res.set("Content-Type", "application/json");
        if (err) {
            res.status(400).send({"status": err});
        } else {
            sockets.forEach( socket => socket.emit('hire', newemp));
            res.status(200).send(newemp);
        }
    });
});

let updateOrPatchEmployee = (req, res) => {
    let emp = req.body;
    let identity = emp.identityNo;
    let updatedEmp = {};

    for (let field in emp) {
        if (updatableEmployeeFields.includes(field))
            updatedEmp[field] = emp[field];
    }

    Employee.update(
        {"identityNo": identity},
        {$set: updatedEmp},
        {upsert: false},
        (err, result) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else {
                res.status(200).send(result);
            }
        }
    );
};

// Update: i) PUT ii) PATCH
api.put("/hr/api/v1/employees", updateOrPatchEmployee);
api.patch("/hr/api/v1/employees", updateOrPatchEmployee);

api.delete("/hr/api/v1/employees/:tckimlikno", (req, res) => {
    let identity = req.params.tckimlikno;
    Employee.findOneAndDelete(
        {"identityNo": identity},
        {_id: false},
        (err, emp) => {
            res.set("Content-Type", "application/json");
            if (err) {
                res.status(400).send({"status": err});
            } else {
                res.status(200).send(emp);
                sockets.forEach( socket => socket.emit('fire', emp));
            }
        }
    )
});

// 1. Long Polling
// 2. Websocket (W3C): Streaming/Text/Binary
// 3. Http/2 -> SSE (Text)(Server Sent Event) -> IE/Edge

let server = api.listen(port);
let io = require("socket.io").listen(server);
io.set("origins", "*:*");
io.on("connect", socket => {
    sockets.push(socket);
    socket.on("disconnect", () => {
        let index = sockets.indexOf(socket);
        if (index >= 0) sockets.splice(index, 1);
    })
});
console.log("Server (http/ws) is running at "+port);
