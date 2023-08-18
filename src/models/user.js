// const Sequelize = require("sequelize");
// const db = require("../../config/db");

// const userSchema = {
//   id: {
//     type: Sequelize.BIGINT,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   lastName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   createdAt: {
//     allowNull: true,
//     type: Sequelize.DATE,
//   },
//   updatedAt: {
//     allowNull: true,
//     type: Sequelize.DATE,
//   },
//   deletedAt: {
//     type: Sequelize.DATE,
//     allowNull: true,
//     defaultValue: null,
//   },
// };

// const user = db.define("users", userSchema,{paranoid:true});
// module.exports = user;

const Sequelize = require("sequelize");
const db = require("../../config/db");

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
    unique: true, // Add uniqueness constraint for email
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Add uniqueness constraint for username
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
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