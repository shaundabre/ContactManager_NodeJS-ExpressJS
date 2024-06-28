const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, 'Please Enter User Name'],
        },
        email: {
            type: String,
            required: [true, 'Please Enter User Email Address'],
            unique: [true, 'Email Address Already taken']
        },
        password: {
            type: String,
            required: [true, 'Please User password '],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
