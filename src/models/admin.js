
const Sequelize = require('sequelize');
const db = require("../../config/db");
const AdminSchema = {
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
        // field: 'created_at',
        allowNull: true,
        type: Sequelize.DATE,
    },
    updatedAt: {
        // field: 'updated_at',
        allowNull: true,
        type: Sequelize.DATE
    },
};

const Admin = db.define('admins', AdminSchema);
module.exports = Admin;