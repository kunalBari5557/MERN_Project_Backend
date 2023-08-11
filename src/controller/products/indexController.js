// const Joi = require("joi");
// const ProductSchema = require("../../models/products");

// module.exports.index = async (req, resp) => {
//   const page = req.query.page ? parseInt(req.query.page) : 1;
//   const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;

//   const offset = (page - 1) * perPage;

//   const totalCount = await ProductSchema.count();
//   const totalPages = Math.ceil(totalCount / perPage);

//   const data = await ProductSchema.findAll({
//     limit: perPage,
//     offset: offset,
//   });

//   const modifiedData = data.map((element) => {
//     const imageUrl = element.dataValues.image
//       ? `${req.protocol}://${req.get("host")}/public/image/${
//           element.dataValues.image
//         }`
//       : "";

//     return {
//       ...element.dataValues,
//       image: imageUrl,
//     };
//   });

//   resp.send({
//     data: modifiedData,
//     pagination: {
//       currentPage: page,
//       totalPages: totalPages,
//       totalCount: totalCount,
//     },
//   });
// };

const Joi = require("joi");
const ProductSchema = require("../../models/products");
const Sequelize = require("sequelize");

module.exports.index = async (req, resp) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
  const searchQuery = req.query.search || ""; // Get the search query from the request

  const offset = (page - 1) * perPage;

  const whereCondition = {
    // Define your search criteria here based on your schema fields
    title: {
      [Sequelize.Op.like]: `%${searchQuery}%`,
    },
  };

  const totalCount = await ProductSchema.count({
    where: whereCondition, // Apply the search criteria
  });

  const totalPages = Math.ceil(totalCount / perPage);

  const data = await ProductSchema.findAll({
    where: whereCondition, // Apply the search criteria
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
