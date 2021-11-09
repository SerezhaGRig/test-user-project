const bcrypt = require("bcrypt");
const validator = require("email-validator");
const CustomError = require('../errors/customError')


module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail(value) {
          if(!validator.validate(value)){
            return false;
          }
        }
      }
    },
    password: {
      type:DataTypes.STRING,
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
  Users.prototype.validPassword = function (password){
    return bcrypt.compareSync(password, this.password);
  };
  return Users;
};