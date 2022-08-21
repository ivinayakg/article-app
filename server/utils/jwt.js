const { sign, verify } = require("jsonwebtoken");

const createToken = (data) =>
  sign(data, process.env.JWT_SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + 10 * 60,
  });

const verifyToken = (token) => verify(token, process.env.JWT_SECRET);

module.exports = { verifyToken, createToken };
