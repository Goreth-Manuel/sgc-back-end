const { verify } = require("jsonwebtoken");
const dotenv = require("dotenv/config.js");

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken }
