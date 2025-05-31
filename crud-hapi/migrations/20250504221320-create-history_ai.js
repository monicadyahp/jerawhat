'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('history_ai', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // --- Kolom-kolom baru ditambahkan di sini ---
      photo: {
        type: Sequelize.STRING,
        allowNull: true // Ubah menjadi false jika kolom ini wajib diisi
      },
      kondisi_jerawat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      keyakinan_model: {
        type: Sequelize.FLOAT, // Gunakan FLOAT atau DECIMAL untuk nilai numerik
        allowNull: true
      },
      rekomendasi_makanan: {
        type: Sequelize.TEXT('long'), // Gunakan TEXT('long') untuk teks panjang
        allowNull: true
      },
      makanan_tidak_boleh_dimakan: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      rekomendasi_aktivitas_fisik: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      rekomendasi_manajemen_stress: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      // --- Akhir dari kolom-kolom baru ---
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('history_ai');
  }
};