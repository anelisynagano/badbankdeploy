const MongoClient   = require('mongodb').MongoClient;
const url           = 'mongodb://localhost:27017';
let db              = null;

// connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password, color){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, color, balance: 0, activity: []};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// reset password
function reset(email, userPassword){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users')
        var user = { email: email}
        var newPassword = { $set: {password: userPassword} };
        collection.updateOne(user, newPassword, function(err, result) {
            err ? reject(err) : resolve(user);
        });
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// update a user's balance
// newly added
function update(userEmail, userBalance, activity) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        var user = { email: userEmail}
        var newBalance = { $set: {balance: userBalance} };
        collection.updateOne(user, newBalance, function(err, result) {
            err ? reject(err) : resolve(user);
        });
        var newActivity = { $push: {activity: activity} };
        collection.updateOne(user, newActivity, function(err, result) {
            err ? reject(err) : resolve(user);
        });
    })
}


module.exports = {create, all, update, reset};