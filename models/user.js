const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passlocpass = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passlocpass);

module.exports = mongoose.model('User', UserSchema);