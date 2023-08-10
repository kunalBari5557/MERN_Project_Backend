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
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;

  const offset = (page - 1) * perPage;

  const totalCount = await UserSchema.count();
  const totalPages = Math.ceil(totalCount / perPage);

  const data = await UserSchema.findAll({
    limit: perPage,
    offset: offset,
  });

  const modifiedData = data.map((element) => {
    const imageUrl = element.dataValues.image
      ? `${req.protocol}://${req.get("host")}/public/image/${
          element.dataValues.image
        }`
      : "";

    return {
      ...element.dataValues,
      image: imageUrl,
    };
  });

  resp.send({
    data: modifiedData,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
    },
  });
};
