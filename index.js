var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password/:color', function (req, res) {
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password, req.params.color).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

// all accounts
app.get('/account/all', function (req, res) {
    
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

//update user account
// newly added
app.get('/account/update/:email/:balance/:activity', function (req, res) {
    // else create user
    dal.update(req.params.email,req.params.balance,req.params.activity).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

//reset password
// newly added
app.get('/account/reset/:email/:password', function (req, res) {
    // else create user
    dal.reset(req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});


var port = 3000;
app.listen(port);
console.log('Running on port:' + port);