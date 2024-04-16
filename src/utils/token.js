const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const secretKey = "XD";
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
  return token;
}

module.exports = { generateAccessToken };
