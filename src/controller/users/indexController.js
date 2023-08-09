const Joi = require("joi");
const UserSchema = require("../../models/products");

module.exports.index = async (req, resp) => {
  let data = await UserSchema.findAll();
  data.forEach(element => {
    element.image = element.dataValues.image ? `${req.protocol}://${req.get('host')}/public/image/${element.dataValues.image}` : '';
  });
  resp.send(data);
};
