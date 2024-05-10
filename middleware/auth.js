const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

function authenticate(req, res, next) {
  const token = extractAuthToken(req.headers.authorization);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message)
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        // Token is valid, pass decoded data to the next middleware
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Token not provided' });
  }
}

function extractAuthToken(authorizationHeader) {
    if (!authorizationHeader) {
        return null; // No header provided
    }

    // Split the header value by space
    const parts = authorizationHeader.split(' ');

    // Check if the header has the correct format
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return null; // Invalid header format
    }

    // Return the token part (without the Bearer prefix)
    return parts[1];
}

module.exports = authenticate;
