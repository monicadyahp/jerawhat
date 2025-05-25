'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // Tidak ada relasi
    }
  }
  Contact.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    content: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contact_us'
  });
  return Contact;
};
