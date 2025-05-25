'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, { foreignKey: 'users_id' });
    }
  }
  History.init({
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'history_ai'
  });
  return History;
};
