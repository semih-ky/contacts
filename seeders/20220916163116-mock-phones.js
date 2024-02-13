'use strict';
const { phones } = require("../mock");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Phones', phones, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Phones', null, {});
  }
};
