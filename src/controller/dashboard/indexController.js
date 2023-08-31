const express = require("express");
const userSchema = require("../../models/user");
const ProductSchema = require("../../models/products");
const RatingsSchema = require("../../models/ratings");
const Sequelize = require("sequelize");

module.exports.index = async (req, resp) => {
  try {
    const searchQuery = req.query.search || "";

    const userWhereCondition = {
      firstName: {
        [Sequelize.Op.like]: `%${searchQuery}%`,
      },
    };

    const productWhereCondition = {
      title: {
        [Sequelize.Op.like]: `%${searchQuery}%`,
      },
    };

    const userCount = await userSchema.count({
      where: userWhereCondition,
    });

    const productCount = await ProductSchema.count({
      where: productWhereCondition,
      include: [RatingsSchema],
    });

    const responseData = {
      data: {
        userCount: userCount,
        productCount: productCount,
      },
    };

    resp.send(responseData);
  } catch (error) {
    console.error("Error fetching data for the dashboard:", error);
    resp.status(500).send({
      error: "An error occurred while fetching data for the dashboard.",
    });
  }
};
