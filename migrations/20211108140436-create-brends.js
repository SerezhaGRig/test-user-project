'use strict';
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const CustomError = require('../errors/customError')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Brands", {
      brand_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      brand_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Brends');
  }
};