'use strict';
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const CustomError = require('../errors/customError')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Cars", {
      car_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      },
      model_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      },
      reg_num: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      pr_year:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: false
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cars');
  }
};