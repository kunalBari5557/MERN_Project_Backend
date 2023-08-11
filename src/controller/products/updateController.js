const Joi = require("joi");
const path = require("path");
const multer = require("multer");
const ProductSchema = require("../../models/products");

module.exports.update = async (req, resp) => {
  let fileSuffix = Date.now().toString();
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../public/image"));
    },
    filename: function (req, file, cb) {
      console.log("file", file);

      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const upload = multer({ storage: storage }).single("image");

  upload(req, resp, async function (err, file, cb) {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const rate_id = req.body.rate_id;
    var image = req.file ? `${fileSuffix}-${req.file.originalname}` : "";

    const schema = Joi.object().keys({
      title: Joi.string()
        .regex(/^[a-zA-Z0-9\s]*$/)
        .min(3)
        .max(30)
        .required(),
      price: Joi.string()
        .regex(/^[a-zA-Z0-9\s]*$/)
        .min(3)
        .max(30)
        .required(),
      description: Joi.string()
        .regex(/^[a-zA-Z0-9\s]*$/)
        .min(3)
        .max(200)
        .required(),
      category: Joi.string()
        .regex(/^[a-zA-Z0-9\s]*$/)
        .min(3)
        .max(30)
        .required(),
      rate_id: Joi.string()
        .regex(/^[a-zA-Z0-9\s]*$/)
        .min(3)
        .max(30)
        .required(),
    });
    const result = schema.validate({
      title: title,
      price: price,
      description: description,
      category: category,
      rate_id: rate_id,
    });
    if (result.error) {
      return resp.status(400).json({
        msg: result.error.details[0].message,
      });
    } else {
      if (err) {
        console.log(err);
        resp.status(400).json({
          message: "file not uploded",
        });
      }

      // const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/image/${fileSuffix}-${req.file.originalname}` : '';

      const createdPost = await ProductSchema.update(
        {
          title: title,
          price: price,
          description: description,
          category: category,
          image: image,
          rate_id: rate_id,
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
  });
};
