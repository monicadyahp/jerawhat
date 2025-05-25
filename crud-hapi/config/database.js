const sequelize = new Sequelize('mysql://root:password@localhost:3306/hapi_jwt_crud', {
    dialect: 'mysql',
    logging: false,
  });
  
  module.exports = sequelize;