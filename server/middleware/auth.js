const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // check if no token
  if (!token) {
    return res.status(404).json({ msg: 'No auth token, authorization denied' });
  }

  // Verify token
  try {
    // Valid token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch {
    // invaid token
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
