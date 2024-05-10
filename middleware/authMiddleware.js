const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        // Store user ID from token in request object
        req.userId = decoded.id; // Assuming 'id' is the property name in the token payload
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token not provided' });
  }
};
