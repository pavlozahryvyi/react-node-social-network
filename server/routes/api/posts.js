const express = require('express');
const router = express.Router();

// @route  GET api/posts
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
    // console.log('---req ', req);
    console.log('---res ', res);   
    res.send(123)
});

module.exports = router;