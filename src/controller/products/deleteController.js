const Joi = require("joi");
const ProductSchema = require("../../models/products");

module.exports.delete = async (req, resp) => {
    const createdPost = await ProductSchema.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((res) => resp.json({ createdPost: res }))
      .then((err) => err);
};

// module.exports.delete = async (req, resp) => {
//     try {
//       const deletedUser = await ProductSchema.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });
  
//       if (deletedUser) {
//         return resp.json({ message: 'User deleted successfully' });
//       } else {
//         return resp.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       return resp.status(500).json({ error: 'An error occurred while deleting the user' });
//     }
//   };