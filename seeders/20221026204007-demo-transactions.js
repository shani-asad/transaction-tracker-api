'use strict';

const db = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const users = await db.users.findAll()

    return queryInterface.bulkInsert('Transactions', [
      {
        userId: users[0].id,
        amount: 10000,
        notes: "groceries",
        date: "2022-10-15",
        type: "expense",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[0].id,
        amount: 3000,
        notes: "eating out",
        date: "2022-10-16",
        type: "expense",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[0].id,
        amount: 50000,
        notes: "salary",
        date: "2022-10-17",
        type: "income",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[0].id,
        amount: 10000,
        notes: "bonus",
        date: "2022-10-17",
        type: "income",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
