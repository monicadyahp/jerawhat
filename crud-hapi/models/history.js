'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      // Asosiasi dengan model User, penting untuk mendapatkan data user terkait
      History.belongsTo(models.User, { foreignKey: 'users_id' });
    }
  }
  History.init({
    users_id: DataTypes.INTEGER,
    // --- Kolom-kolom baru yang ditambahkan di migrasi ---
    photo: DataTypes.STRING,
    kondisi_jerawat: DataTypes.STRING,
    keyakinan_model: DataTypes.FLOAT, // Pastikan tipe data sesuai dengan migrasi
    rekomendasi_makanan: DataTypes.TEXT('long'),
    makanan_tidak_boleh_dimakan: DataTypes.TEXT('long'),
    rekomendasi_aktivitas_fisik: DataTypes.TEXT('long'),
    rekomendasi_manajemen_stress: DataTypes.TEXT('long')
    // --- Akhir dari kolom-kolom baru ---
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'history_ai'
  });
  return History;
};