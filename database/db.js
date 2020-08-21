const mongoose = require('mongoose');
require('mongoose-type-email');
require('mongoose-type-url');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'User est obligatoire',
        unique: 'unique',
        minlength: 3,
        trim: true
    },
    gender: {
        type: String,
        required: 'Genre est obligatoire',
    },
    dob: {
        type: Date,
        required: 'Date de naissance est obligatoire',
    },
    news: {
        type: Boolean,
        default: false,
        required: false
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        allowBlank: true
    },
    photo: {
        type: mongoose.SchemaTypes.Url,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', usersSchema);