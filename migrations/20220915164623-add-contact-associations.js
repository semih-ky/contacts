'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Contacts", "userId", {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
        as: "userId"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Contacts", "userId");
  }
};
