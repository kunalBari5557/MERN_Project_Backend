const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../../models/admin");

module.exports.Authentication = async (req, resp) => {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await adminModel.findOne({
    where: {
      email: email,
    },
  });

  if (admin) {
    const verifyPassword = await bcrypt.compare(password, admin.password);
    console.log("verifyPassword", verifyPassword);
    if (verifyPassword == true) {
      jwt.sign(
        { admin },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "6h" },
        (err, token) => {
          resp.json({
            token,
            // admin
            id: admin.id,
          });
        }
      );
    } else {
      return resp.status(400).json({
        message: "Invalide Credential",
      });
    }
  } else {
    return resp.status(400).json({
      message: "Invalide Credential",
    });
  }
};
