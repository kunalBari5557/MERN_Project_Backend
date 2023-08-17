const Sequelize = require("sequelize");
const db = require("../../config/db");
// const Rating = require('./ratings')

const userSchema = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
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

const user = db.define("users", userSchema,{paranoid:true});
module.exports = user;
