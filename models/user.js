const mongo = require('mongoose');
const userSchema = new mongo.Schema({
    name: String,
    id: { type: String, unique: true },
    email: { type: String, unique: true },
    mobileNumber: { type: Number },
    password: { type: String }
});

const User = mongo.model('user', userSchema, 'user');

module.exports = User;