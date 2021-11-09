const bcrypt = require("bcrypt");
const validator = require("email-validator");
const CustomError = require('../errors/customError')


module.exports = function (sequelize, DataTypes) {
  var Cars = sequelize.define("Cars", {
    car_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    reg_num: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isArmenian(value) {
          let ver_regex = /^[0-9]{2}[a-z A-Z]{2}[0-9]{3}/
          if(value.toString().search(ver_regex)===-1){
            throw new CustomError({code:403,message:"Input value wasn't currect reg num"})
          }
        }
      }
    },
    pr_year:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: false
    }

  })
  return Cars;
};