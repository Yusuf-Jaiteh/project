const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
  // I changed here. Compare it with your to see the difference
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // I changed here. Compare it with your to see the difference
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    req.user = user; 
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    next();
  };
};
