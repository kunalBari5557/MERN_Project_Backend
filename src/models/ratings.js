const Sequelize = require("sequelize");
const db = require("../../config/db");
const RatingsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  rate: {
    type: Sequelize.STRING
  },
  count: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
};

const Product = db.define("ratings", RatingsSchema);
module.exports = Product;
