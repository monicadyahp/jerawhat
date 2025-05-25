// crud-hapi > controllers > LoginController.js
const Joi = require("joi");
const { User } = require("../models"); // Pastikan path ini benar
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // <--- KEMBALIKAN INI, KITA AKAN PAKAI jsonwebtoken UNTUK MEMBUAT TOKEN
// HAPUS BARIS INI: const signJwt = require('@hapi/jwt'); // Ini yang menyebabkan masalah terakhir

module.exports = {
  login: async (req, h) => {
    const { payload } = req;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(payload);
    if (error) {
      const messages = error.details.map((err) => err.message.replace(/\"/g, ""));
      return h.response({ status: "Failed", message: { errors: messages[0] } }).code(422);
    }

    try {
      const user = await User.findOne({ where: { email: value.email } });
      if (!user) {
        return h.response({ status: "Failed", message: "Email atau password salah!" }).code(401);
      }

      const isValidPassword = await bcrypt.compare(value.password, user.password);
      if (!isValidPassword) {
        return h.response({ status: "Failed", message: "Email atau password salah!" }).code(401);
      }

      // Buat token JWT menggunakan pustaka `jsonwebtoken` (yang lebih mudah digunakan untuk sign)
      const token = jwt.sign( // <--- KEMBALIKAN KE `jwt.sign`
        { id: user.id, name: user.name, email: user.email }, // Payload
        process.env.JWT_SECRET || 'wS!9xMvB3$ZrTq7Y#jD2@LfVgXeN6pA0', // <--- Secret key langsung
        { expiresIn: '4h' } // <--- Opsi untuk `jsonwebtoken` (exp: '4h' untuk 4 jam)
      );

      console.log('--- JWT Token Dibuat ---');
      console.log('Token:', token);
      try {
          const [headerB64, payloadB64, signatureB64] = token.split('.');
          const decodedPayload = Buffer.from(payloadB64, 'base64').toString('utf8');
          console.log('Payload yang Dihasilkan:', decodedPayload);
      } catch (decodeErr) {
          console.error('Gagal mendekode token:', decodeErr);
      }
      console.log('--- End JWT Token ---');

      const { password, ...userData } = user.toJSON();

      return h.response({
        status: "Success",
        message: "Login berhasil!",
        data: {
          token,
          user: userData,
        },
      }).code(200);

    } catch (err) {
      console.error('Error saat login:', err);
      return h.response({ status: "Failed", message: "Terjadi kesalahan pada server." }).code(500);
    }
  },
};