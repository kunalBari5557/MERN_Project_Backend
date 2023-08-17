const Joi = require("joi");
const userSchema = require("../../models/user");

module.exports.delete = async (req, resp) => {
    const createdPost = await userSchema.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((res) => resp.json({ createdPost: res }))
      .then((err) => err);
};
