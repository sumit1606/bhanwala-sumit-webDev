var express = require('express');
var app = express();
require ("./test/app.js")(app);


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// loading app.js which will be used for loading further services
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;
app.listen(port);