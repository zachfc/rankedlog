const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const LogEntry = require('./db/logEntry.model');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://admin:admin@rankedlog-bebwz.mongodb.net/test?retryWrites=true', {useNewUrlParser: true}, function(err) {
    console.log(err)
});
/* app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
}); */

app.use(bodyParser.json());
app.use(express.static("public"));

/* app.get('/404', function(req, res) {
    res.sendFile(path.join(__dirname + '/404.html'));
}); */

app.post('/save', function(req, res) {
    var {date, role, champion, wl, notes} = req.body;
    LogEntry.create({date, role, champion, wl, notes}, function (err, entry) {
        if (err) console.log(err);
    })
})

app.get('/load', function(req, res) {
    LogEntry.find({}, function(err, entry) {
        if (err) console.log(err);
        res.json(entry);
    })
})

app.listen(3000, function() {
    console.log("server is running")
})

// server
app.get('/entries', function(req, res) {
    // find and send back an array of all log entries
});

