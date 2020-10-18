const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

// Include user model
const User = require('../../models/User');

// @route  GET api/users
// @desc   register a new user
// @access Public
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    // email check
    body('email', 'Email is required').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password is required').isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if a user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pd',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return JWT

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload, //payload
        config.get('jwtSecret'), //secret
        { expiresIn: 36000 }, //experation
        (err, token) => {
          if (err) throw err;
          res.json({ token });
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
