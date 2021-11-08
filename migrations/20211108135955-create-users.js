'use strict';
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const CustomError = require('../errors/customError')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail(value) {
            if(!validator.validate(value)){
              throw new CustomError({code:403,message:"Input value wasn't email"})
            }
          }
        }
      },
      password: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: [8, 18]
        }
      }
    },{
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate:async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};