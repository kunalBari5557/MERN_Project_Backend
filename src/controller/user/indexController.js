// const Joi = require("joi");
// const userSchema = require("../../models/user");
// const Sequelize = require("sequelize");

// module.exports.index = async (req, resp) => {
//     try {
//       const page = req.query.page ? parseInt(req.query.page) : 1;
//       const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
//       const searchQuery = req.query.search || ""; // Get the search query from the request
  
//       const offset = (page - 1) * perPage;
  
//       const whereCondition = {
//         // Define your search criteria here based on your schema fields
//         firstName: {
//           [Sequelize.Op.like]: `%${searchQuery}%`,
//         },
//       };
  
//       const totalCount = await userSchema.count({
//         where: whereCondition,
//       });
  
//       const totalPages = Math.ceil(totalCount / perPage);
  
//       const data = await userSchema.findAll({
//         attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'createdAt', 'updatedAt', 'deletedAt'],
//         where: whereCondition,
//         limit: perPage,
//         offset: offset,
//       });
  
//       const modifiedData = data.map((element) => {
//         return {
//           ...element.dataValues,
//         };
//       });
  
//       resp.send({
//         data: modifiedData,
//         pagination: {
//           currentPage: page,
//           totalPages: totalPages,
//           totalCount: totalCount,
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       resp.status(500).send({
//         error: "An error occurred while fetching user data.",
//       });
//     }
//   };
  
const Joi = require("joi");
const userSchema = require("../../models/user");
const Sequelize = require("sequelize");

module.exports.index = async (req, resp) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
    const searchQuery = req.query.search || ""; // Get the search query from the request

    const offset = (page - 1) * perPage;

    const whereCondition = {
      // Define your search criteria here based on your schema fields
      firstName: {
        [Sequelize.Op.like]: `%${searchQuery}%`,
      },
    };

    const totalCount = await userSchema.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalCount / perPage);

    const data = await userSchema.findAll({
      attributes: ['id', 'email', 'username', 'password', 'firstName', 'lastName', 'phone', 'createdAt', 'updatedAt', 'deletedAt'],
      where: whereCondition,
      limit: perPage,
      offset: offset,
    });

    const modifiedData = data.map((element) => {
      const { firstName, lastName, ...rest } = element.dataValues;
      return {
        ...rest,
        name: {
          firstname: firstName,
          lastname: lastName,
        },
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
  } catch (error) {
    console.error("Error fetching user data:", error);
    resp.status(500).send({
      error: "An error occurred while fetching user data.",
    });
  }
};
