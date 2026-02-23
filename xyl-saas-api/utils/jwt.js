const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'xyl-saas-secret-key';

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
