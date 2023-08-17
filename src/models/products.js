const Sequelize = require("sequelize");
const db = require("../../config/db");
const Rating = require('./ratings')

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
    allowNull: true,
    type: Sequelize.DATE,
  },
  updatedAt: {
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
Product.belongsTo(Rating, {
  foreignKey: 'rate_id',
});

Rating.hasMany(Product, {
  foreignKey: 'rate_id',
});
module.exports = Product;
