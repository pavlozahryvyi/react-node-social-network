const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route  GET api/profile/me - my profile
// @desc   Get current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg:'The profile is not found'});
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error')
    }
});

module.exports = router;