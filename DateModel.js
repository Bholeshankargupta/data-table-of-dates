const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    date: { type: Date, required: true }
});

const DateModel = mongoose.model('Date', dateSchema);

module.exports = DateModel;
