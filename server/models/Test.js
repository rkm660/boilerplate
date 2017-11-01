var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    test_ID: { type: String, unique: true, index: true },  
});

module.exports = mongoose.model('Test', TestSchema);