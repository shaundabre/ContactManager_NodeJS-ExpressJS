const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        name: {
            type: String,
            required: [true, 'Please add the contact name'],
        },
        email: {
            type: String,
            required: [true, 'Please add the contact email address'],
        },
        phoneNo: {
            type: String,
            required: [true, 'Please add the contact phone number'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Contact', contactSchema);
