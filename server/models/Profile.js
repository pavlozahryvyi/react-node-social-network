const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        city: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        }
    },
    status: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    contacts: {
        facebook: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
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