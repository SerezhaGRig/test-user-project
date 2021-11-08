'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Brands', [
      {brand_name:'BMW',createdAt: new Date(),
        updatedAt: new Date()},
      {brand_name:'Mercedes',createdAt: new Date(),
        updatedAt: new Date()},
      {brand_name:'Audi',createdAt: new Date(),
        updatedAt: new Date()},
    ], {})},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
