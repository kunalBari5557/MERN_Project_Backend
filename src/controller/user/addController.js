const Joi = require("joi");
const userSchema = require("../../models/user");

module.exports.add = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const schema = Joi.object().keys({
    firstName: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
    lastName: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
    email: Joi.string().email().min(3).max(200).required(), // Using email validation
    password: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
  });

  const result = schema.validate({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  if (result.error) {
    return res.status(400).json({
      msg: result.error.details[0].message,
    });
  }

try {
  const users = await userSchema.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  return res.status(200).json({
    msg: "User inserted successfully!",
  });
} catch (err) {
  console.error(err); // Log the specific error
  return res.status(400).json({
    msg: "An error occurred while creating the user.",
  });
}

};
