// crud-hapi > controllers > HistoryController.js
const Joi = require("joi");
const { History, User } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // Fungsi untuk menyimpan data riwayat AI baru
  create: async (req, h) => {
    try {
      const { payload } = req;
      const userId = req.auth.credentials.id;

      const photoFile = payload.photo;

      const schema = Joi.object({
        photo: Joi.any().meta({ swaggerType: 'file' }).optional(),
        kondisi_jerawat: Joi.string().min(3).required(),
        keyakinan_model: Joi.number().min(0).max(1).required(),
        rekomendasi_makanan: Joi.string().min(10).required(),
        makanan_tidak_boleh_dimakan: Joi.string().min(10).required(),
        rekomendasi_aktivitas_fisik: Joi.string().min(10).required(),
        rekomendasi_manajemen_stress: Joi.string().min(10).required(),
      });

      const validationPayload = { ...payload };
      delete validationPayload.photo;

      const { error, value } = schema.validate(validationPayload, {
        abortEarly: false,
        allowUnknown: true,
      });

      if (error) {
        const messages = error.details.map((err) =>
          err.message.replace(/\"/g, "")
        );
        return h
          .response({ status: "Failed", message: { errors: messages } })
          .code(422);
      }

      let photoPath = null;
      if (photoFile && photoFile.hapi.filename) {
        const filename = uuidv4() + path.extname(photoFile.hapi.filename);
        // --- PERUBAHAN DI SINI: Menyimpan di folder 'history_ai' ---
        const uploadDir = path.join(__dirname, '..','history_ai');
        // --------------------------------------------------------
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, filename);

        await new Promise((resolve, reject) => {
          const fileStream = fs.createWriteStream(filePath);
          fileStream.on('error', (err) => reject(err));
          photoFile.pipe(fileStream);
          photoFile.on('end', (err) => {
            if (err) return reject(err);
            resolve();
          });
        });

        // --- PERUBAHAN DI SINI: URL public juga menunjuk ke 'history_ai' ---
        photoPath = `/uploads/history_ai/${filename}`;
        // ------------------------------------------------------------
      }

      const history = await History.create({
        users_id: userId,
        photo: photoPath,
        kondisi_jerawat: value.kondisi_jerawat,
        keyakinan_model: value.keyakinan_model,
        rekomendasi_makanan: value.rekomendasi_makanan,
        makanan_tidak_boleh_dimakan: value.makanan_tidak_boleh_dimakan,
        rekomendasi_aktivitas_fisik: value.rekomendasi_aktivitas_fisik,
        rekomendasi_manajemen_stress: value.rekomendasi_manajemen_stress,
      });

      return h
        .response({
          status: "Success",
          message: "History Created Successfully",
          data: history,
        })
        .code(201);
    } catch (err) {
      console.error("Error creating history:", err);
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error", details: err.message },
        })
        .code(500);
    }
  },

  // ... (getAllByLoggedInUser tetap sama) ...
  getAllByLoggedInUser: async (req, h) => {
    try {
      const userId = req.auth.credentials.id;

      const histories = await History.findAll({
        where: { users_id: userId },
      });

      if (!histories || histories.length === 0) {
        return h
          .response({
            status: "Success",
            message: "No history found for this user",
            data: [],
          })
          .code(200);
      }

      return h
        .response({
          status: "Success",
          message: "User History Has Been Loaded",
          data: histories,
        })
        .code(200);
    } catch (err) {
      console.error(err);
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },
};