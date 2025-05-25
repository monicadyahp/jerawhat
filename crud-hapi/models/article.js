'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
    }
  }
  Article.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    keyword: DataTypes.STRING,
    content: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles'
  });
  return Article;
};
