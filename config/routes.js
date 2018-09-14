const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = require("../_secrets/keys").jwtKey;

const db = require("../database/dbConfig");

const { authenticate } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
  server.use(function(err, _, res, _) {
    console.error(err);
    if (err.errno === 19)
      return res.json({ error: true, message: "Username is already taken" });

    res.json({ error: true, message: "Something went wrong!" });
  });
};

function register(req, res, next) {
  // implement user registration
  let { username, password } = req.body;

  if (!username || !password)
    return res.json({
      error: true,
      message: "Username or password cannot be empty!"
    });

  password = bcrypt.hashSync(password, 12);

  db("users")
    .insert({ username, password })
    .then(([id]) => {
      const token = jwt.sign({ id }, jwtKey, {
        expiresIn: "1h"
      });

      res.json({ error: false, message: "User created successfully", token });
    })
    .catch(next);
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
