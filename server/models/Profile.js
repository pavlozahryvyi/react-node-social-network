const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        city: {
            type: String
        },
        country: {
            type: String
        }
    },
    status: {
        type: String
    },
    skills: {
        type: [String]
    },
    contacts: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        github: {
            type: String,
            default: ""
        },
    },
    wrapperPhoto: {
        type: String,
        default: ""
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);