const authenticate = require('../middleware/auth');

function login(req, res) {
  res.json({ token: req.token });
}

module.exports = {
  login
};
