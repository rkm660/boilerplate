var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    test_ID: { type: String, unique: true, index: true }, 
    test_field: {type: String} 
});

module.exports = mongoose.model('Test', TestSchema);