// crud-hapi > controllers > LoginController.js
const Joi = require("joi");
const { User } = require("../models"); // Pastikan path ini benar
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

      // Buat token JWT
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email }, // <-- PASTIKAN PAYLOAD INI MENGANDUNG user.id
        process.env.JWT_SECRET || 'your_super_secret_jwt_key',
        { expiresIn: '4h' }
      );

      // Siapkan data user untuk dikirim ke frontend (tanpa password)
      const { password, ...userData } = user.toJSON(); // userData ini harusnya punya user.id dan user.avatar

      return h.response({
        status: "Success",
        message: "Login berhasil!",
        data: {
          token, // <-- Pastikan ini dikirim
          user: userData, // <-- Pastikan userData punya id dan avatar
        },
      }).code(200);

    } catch (err) {
      console.error(err);
      return h.response({ status: "Failed", message: "Terjadi kesalahan pada server." }).code(500);
    }
  },
};