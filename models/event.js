'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Item, { as: 'items', foreignKey: 'eventId' })
      Event.belongsTo(models.User, { foreignKey: 'hostId' }) // HOST who created event (one user to many events)
      Event.belongsToMany(models.User, {
        as: 'attendees',
        through: models.UserEventList,
        foreignKey: 'userId'
      }) //
    }
  }
  Event.init(
    {
      eventName: DataTypes.STRING,
      date: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.ARRAY({
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }),
      hostId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'events'
    }
  )
  return Event
}
