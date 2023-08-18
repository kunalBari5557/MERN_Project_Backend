// const Joi = require("joi");
// const userSchema = require("../../models/user");

// module.exports.add = async (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;
//   const password = req.body.password;

//   const schema = Joi.object().keys({
//     firstName: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
//     lastName: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
//     email: Joi.string().email().min(3).max(200).required(), // Using email validation
//     password: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
//   });

//   const result = schema.validate({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//   });

//   if (result.error) {
//     return res.status(400).json({
//       msg: result.error.details[0].message,
//     });
//   }

// try {
//   const users = await userSchema.create({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//   });

//   return res.status(200).json({
//     msg: "User inserted successfully!",
//   });
// } catch (err) {
//   console.error(err); // Log the specific error
//   return res.status(400).json({
//     msg: "An error occurred while creating the user.",
//   });
// }

// };

const Joi = require("joi");
const userSchema = require("../../models/user");

module.exports.add = async (req, res) => {
  const { email, username, password, name, phone } = req.body;

  const schema = Joi.object().keys({
    email: Joi.string().email().min(3).max(200).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
    name: Joi.object().keys({
      firstname: Joi.string().min(1).max(30).required(),
      lastname: Joi.string().min(1).max(30).required(),
    }).required(),
    phone: Joi.string().allow(null, '').max(15), // Allow null or empty string
  });

  const result = schema.validate({
    email: email,
    username: username,
    password: password,
    name: name,
    phone: phone,
  });

  if (result.error) {
    return res.status(400).json({
      msg: result.error.details[0].message,
    });
  }

  try {
    const users = await userSchema.create({
      firstName: name.firstname,
      lastName: name.lastname,
      email: email,
      username: username,
      password: password,
      phone: phone,
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
