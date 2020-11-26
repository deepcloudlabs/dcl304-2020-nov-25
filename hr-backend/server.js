let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");

const port = 9001;
const api = express();

api.use(bodyParser.json({limit: "5mb"}))
api.use(logger('dev'));
api.use((req, res, next) => { // CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, POST, PUT, GET, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

let server = api.listen(port);
console.log("REST Api is up and running @ " + port);

