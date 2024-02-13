'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }

    static associate(models) {
      // define association here
      this.hasMany(models.Contact, {
        foreignKey: "userId",
        as: "contacts"
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },{
    hooks: {
      beforeCreate : (record, options) => {
        record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.password = bcrypt.hashSync(record.dataValues.password, 10);
      },
      beforeUpdate : (record, options) => {
        record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};