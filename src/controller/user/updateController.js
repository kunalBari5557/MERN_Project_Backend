// const Joi = require("joi");
// const userSchema = require("../../models/user");

// module.exports.update = async (req, resp) => {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const password = req.body.password;

//     const schema = Joi.object().keys({
//         firstName: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
//         lastName: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
//         email: Joi.string().email().min(3).max(200).required(), // Using email validation
//         password: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
//     });

//     const result = schema.validate({
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: password,
//     });

//     if (result.error) {
//         return resp.status(400).json({
//             msg: result.error.details[0].message,
//         });
//     } else {
//         const createdPost = await userSchema.update(
//             {
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 password: password,
//             },
//             {
//                 where: {
//                     id: req.params.id,
//                 },
//             }
//         )
//             .then((res) => resp.json({ createdPost: res }))
//             .then((err) => err);
//     }
// };

const Joi = require("joi");
const userSchema = require("../../models/user");

module.exports.update = async (req, resp) => {
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
    else {
        const createdPost = await userSchema.update(
            {
                firstName: name.firstname,
                lastName: name.lastname,
                email: email,
                username: username,
                password: password,
                phone: phone,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
            .then((res) => resp.json({ createdPost: res }))
            .then((err) => err);
    }
};