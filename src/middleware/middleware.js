const express = require("express");
app = express();
const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.send("No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
    if (err) {
        return res.status(401).send({ msg: "Invalid Token !" });
    }
    req.admin_id = admin.admin.id;
    req.admin_name = admin.admin.firstName;

    next();
});
};

module.exports = adminMiddleware;
