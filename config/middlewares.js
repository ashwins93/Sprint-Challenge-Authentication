const jwt = require("jsonwebtoken");

const jwtKey = require("../_secrets/keys").jwtKey;
const db = require("../database/dbConfig");

// quickly see what this file exports
module.exports = {
  authenticate
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      db("users")
        .where("id", decoded.id)
        .then(user => {
          if (!user) return next();

          req.user = user;
          next();
        })
        .catch(next);
    });
  } else {
    return res.json({
      error: true,
      message: "No token provided, must be set on the Authorization Header"
    });
  }
}
