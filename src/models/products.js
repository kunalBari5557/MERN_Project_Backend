const Sequelize = require("sequelize");
const db = require("../../config/db");
const ProductSchema = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rate_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    // field: 'created_at',
    allowNull: true,
    type: Sequelize.DATE,
  },
  updatedAt: {
    // field: 'updated_at',
    allowNull: true,
    type: Sequelize.DATE,
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null,
  },
};

const Product = db.define("products", ProductSchema,{paranoid:true});
module.exports = Product;
