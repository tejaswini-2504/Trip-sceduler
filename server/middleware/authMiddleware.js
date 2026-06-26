const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const localUserStore = require('../utils/localUserStore');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (process.env.USE_LOCAL_AUTH_STORE === 'true' || mongoose.connection.readyState !== 1) {
      const user = await localUserStore.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Token is invalid or expired.' });
      }
      req.user = localUserStore.publicUser(user);
      return next();
    }

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Token is invalid or expired.' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid or expired.' });
  }
};

module.exports = protect;
