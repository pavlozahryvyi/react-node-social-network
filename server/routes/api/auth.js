const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body, validationResult} = require('express-validator');

const User = require('../../models/User');

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
    res.send('Auth route');
});

// @route  GET api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
    '/',
    [
        // email check
        body('email', 'Email is required').isEmail(),
        // password must be at least 5 chars long
        body('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;
        console.log(email);

        try {
            // See if a user exist
            let user = await User.findOne({email});

            if (!user) {
                return res
                    .status(400)
                    .send({errors: [{msg: 'Invalid credentials'}]})

            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'Invalid credentials2'}]});
            }

            // Return JWT

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload, //payload
                config.get('jwtSecret'), //secret
                {expiresIn: 36000}, //experation
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );

            // res.send(`User ${req.body.name} is saved`);
        } catch (err) {
            // if error
            console.error(err.message);
            res.status(500).send('Status error');
        }
    }
);

module.exports = router;
