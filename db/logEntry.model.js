const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const logEntry = new Schema( {
    id: ObjectId,
    date: String,
    role: String,
    champion: String,
    wl: Boolean,
    notes: String,
})

module.exports = mongoose.model('LogEntry', logEntry);