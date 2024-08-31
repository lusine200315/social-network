const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
      // res.redirect('auth/login');
    };

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();

  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  };
};

module.exports = authMiddleware;