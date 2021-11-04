const bcrypt = require("bcrypt");
const validator = require("email-validator");
const CustomError = require('../errors/customError')


module.exports = function (sequelize, DataTypes) {
    var Brands = sequelize.define("Brands", {
        brand_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    })
    return Brands;
};