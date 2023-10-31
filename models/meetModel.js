const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    description: {
        type: String
    },
    teacherName: {
        type: String
    },
    emails: {
        type: Array
    },
    meetDate: {
        type: Date
    },
    url:{
        type: String
    }
    // Add more fields as needed
});

const Meet = mongoose.model('Meet', userSchema);
module.exports = Meet
