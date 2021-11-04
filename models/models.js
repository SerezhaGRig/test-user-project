const bcrypt = require("bcrypt");
const validator = require("email-validator");
const CustomError = require('../errors/customError')


module.exports = function (sequelize, DataTypes) {
    var Models = sequelize.define("Models", {
        model_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        model_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        brand_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        }

    })
    return Models;
};