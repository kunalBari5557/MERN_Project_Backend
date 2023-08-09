// const Joi = require("joi");
// const UserSchema = require("../../models/products");

// module.exports.index = async (req, resp) => {
//   let data = await UserSchema.findAll();
//   data.forEach(element => {
//     element.image = element.dataValues.image ? `${req.protocol}://${req.get('host')}/public/image/${element.dataValues.image}` : '';
//   });
//   resp.send(data);
// };

const Joi = require("joi");
const UserSchema = require("../../models/products");

module.exports.index = async (req, resp) => {
  try {
    let data = await UserSchema.findAll();
    data.forEach(element => {
      const imageUrl = element.dataValues.image
        ? `${req.protocol}://${req.get('host')}/public/image/${element.dataValues.image}`
        : '';
      console.log("Generated image URL:", imageUrl); // Log generated URLs for debugging
      element.image = imageUrl;
    });
    resp.send(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    resp.status(500).json({ message: "An error occurred" });
  }
};
