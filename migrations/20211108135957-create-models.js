'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Models", {
      model_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      model_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      brand_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Models');
  }
};