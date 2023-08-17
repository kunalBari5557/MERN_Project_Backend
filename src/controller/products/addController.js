const Joi = require("joi");
const path = require('path');
const multer = require("multer");
const ProductSchema = require("../../models/products");

module.exports.add = async (req, res) => {
  // const title = req.body.title;
  // const price = req.body.price;
  // const description = req.body.description;
  // const category = req.body.category;
  // const rate_id = req.body.rate_id;

  // const schema = Joi.object().keys({
  //   title: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
  //   price: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
  //   description: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(200).required(),
  //   category: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
  //   rate_id: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).min(3).max(30).required(),
  // });

  // const result = schema.validate({
  //   title: title,
  //   price: price,
  //   description: description,
  //   category: category,
  //   rate_id: rate_id,
  // });

  // if (result.error) {
  //   return resp.status(400).json({
  //     msg: result.error.details[0].message,
  //   });
  // } else {
  //   const createdPost = await ProductSchema.create({
  //     title: title,
  //     price: price,
  //     description: description,
  //     category: category,
  //     rate_id: rate_id,
  //   })
  //     .then((res) => resp.json({ createdPost: res }))
  //     .then((err) => err);
  // }

    let fileSuffix = Date.now().toString();

    //   const upload = multer({
    //         storage: multerS3({
    //             s3: s3,
    //             bucket: 'job-manage2',
    //             Metadata: {
    //                 'version': '3'
    //             },
    //             // acl: 'public-read',
    //             contentType: multerS3.AUTO_CONTENT_TYPE,
    //             key: function(req, file, cb) {
    //                 cb(null, `${fileSuffix}-${file.originalname}`);
    //             }
    //         })
    //     }).single('image')

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/image"));
      },
      filename: function (req, file, cb) {
        console.log("file",file)

        cb(
          null,
          `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
      },
    });

    const upload = multer({ storage: storage }).single("image");

    upload(req, res, async function (err, file, cb) {
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
        return res.status(400).json({
          msg: result.error.details[0].message,
        });
      } else {
        if (err) {
          res.status(400).json({
            message: "file not uploded",
          });
        }

        // const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/image/${fileSuffix}-${req.file.originalname}` : '';

        const products = await ProductSchema.create({
          title: title,
          price: price,
          description: description,
          category: category,
          image: image,
          rate_id: rate_id,
        })
          .then(function (resp) {
            return res.status(200).json({
              msg: "Product inserted successfully!",
            });
          })
          .catch(function (err) {
            return res.status(400).json({
              msg: "Please try again!",
            });
          });
      }
    });

};
