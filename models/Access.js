const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    randomCode: { type: String, required: true }, // Random code as a reference
    names: { type: [String], default: [] } // Array of names (duplicates allowed)
});

module.exports = mongoose.model('Access', accessSchema);
