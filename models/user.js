'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Item, { as: 'items', foreignKey: 'userId' })
      User.hasMany(models.Event, { as: 'hosting', foreignKey: 'hostId' })
      User.hasMany(models.Event, { as: 'attending', foreignKey: ['userId'] })
      User.belongsToMany(models.Event, {
        as: 'guests',
        foreignKey: ['attending']
      })
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      hosting: DataTypes.ARRAY,
      attending: DataTypes.ARRAY
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}