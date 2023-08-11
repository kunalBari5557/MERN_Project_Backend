'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Delete existing records before seeding
    await queryInterface.bulkDelete('ratings', null, {});

    // Insert new seed data
    return queryInterface.bulkInsert('ratings', [
      {
        id:3244,
        rate: 3.9,
        count: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3245,
        rate: 4.9,
        count: 1120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3246,
        rate: 5,
        count: 140,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3247,
        rate: 1.9,
        count: 1320,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3248,
        rate: 4,
        count: 130,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ratings', null, {});
  },
};
