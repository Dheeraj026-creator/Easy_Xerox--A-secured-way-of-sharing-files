const mongoose = require('mongoose');

const nameEntrySchema = new mongoose.Schema({
    randomCode: { type: String, required: true },
    name: { type: String, required: true }
});

const NameEntry = mongoose.model('NameEntry', nameEntrySchema);
