const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');


// @route  GET
// @desc test rout
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({user: req.user.id});

        res.json(posts)
    } catch (err) {
        console.log(err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'The post isn\'t found'});
        }
        res.status(500).send('Server error');
    }
})

module.exports = router;