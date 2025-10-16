const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    uniqueName: {
        type: String,
        required: true,
        unique: true, // Ensure that the link name is unique
    },
    password: {
        type: String,
        required: true, // Store the generated password
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        // Ensure that each link has an owner
    },
    createdAt: {
        type: Date,
        default: Date.now, // Store the timestamp when the link is created
    }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
