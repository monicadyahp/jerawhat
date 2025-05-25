// crud-hapi > controllers > UserController.js
const Joi = require("joi");
const { User } = require("../models");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");

module.exports = {
  getAll: async (req, h) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      return h
        .response({
          status: "Success",
          message: "Users Has Been Loaded",
          data: users,
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  getById: async (req, h) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user)
        return h
          .response({
            status: "Success",
            message: { errors: "User not found" },
          })
          .code(404);
      return h
        .response({
          status: "Success",
          message: "User Successfully Found",
          data: user,
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  create: async (req, h) => {
    const { payload } = req;

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      slug: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(payload, {
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

    let filename = null;

    if (
      payload.avatar &&
      typeof payload.avatar === "object" &&
      payload.avatar._data &&
      payload.avatar.hapi &&
      payload.avatar.hapi.filename
    ) {
      const originalName = payload.avatar.hapi.filename;
      const extension = path.extname(originalName);
      filename = `${Date.now()}${extension}`;
      const filepath = path.join(__dirname, "..", "uploads", filename);
      const fileStream = fs.createWriteStream(filepath);
      payload.avatar.pipe(fileStream);
    }

    try {
      const existing = await User.findOne({ where: { email: value.email } });
      if (existing) {
        return h
          .response({
            status: "Failed",
            message: { error: "Email already used" },
          })
          .code(409);
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);
      const user = await User.create({
        name: value.name,
        slug: value.slug,
        email: value.email,
        password: hashedPassword,
        avatar: filename ? `/uploads/${filename}` : null,
      });

      const { password, ...userData } = user.toJSON();
      return h
        .response({
          status: "Success",
          message: "User Has Been Created",
          data: userData,
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  update: async (req, h) => {
    const { payload } = req;
    const userIdFromParams = parseInt(req.params.id); // Ambil ID dari URL params
    const authenticatedUserId = req.auth.isAuthenticated ? req.auth.credentials.id : null;

    // --- PENTING: Penambahan validasi otorisasi ---
    if (!req.auth.isAuthenticated || authenticatedUserId !== userIdFromParams) {
      return h
        .response({
          status: "Failed",
          message: { error: "Unauthorized: Anda tidak diizinkan mengubah profil ini." },
        })
        .code(403);
    }
    // --- Akhir penambahan validasi otorisasi ---

    // Skema Joi untuk validasi data yang diupdate
    const schema = Joi.object({
      name: Joi.string().min(3).optional(), // name sekarang opsional untuk update avatar
      email: Joi.string().email().optional(), // email sekarang opsional
      password: Joi.string().min(6).optional(),
      slug: Joi.string().optional(), // slug juga opsional jika tidak selalu diupdate
    });

    // Validasi payload (selain file avatar)
    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      allowUnknown: true, // Izinkan properti yang tidak ada di skema (seperti 'avatar' file)
    });

    if (error) {
      const messages = error.details.map((err) =>
        err.message.replace(/\"/g, "")
      );
      return h
        .response({ status: "Failed", message: { errors: messages } })
        .code(422);
    }

    try {
      const user = await User.findByPk(userIdFromParams); // Cari user berdasarkan ID dari params

      if (!user) {
        return h
          .response({ status: "Failed", message: { errors: "User not found" } })
          .code(404);
      }

      // Periksa apakah email diubah dan sudah digunakan
      if (value.email && value.email !== user.email) {
        const existing = await User.findOne({ where: { email: value.email } });
        if (existing) {
          return h
            .response({
              status: "Failed",
              message: { error: "Email already used by another account" },
            })
            .code(409);
        }
      }

      // Hash password baru jika ada
      if (value.password) {
        value.password = await bcrypt.hash(value.password, 10);
      }

      // --- Logika penanganan avatar ---
      if (payload.avatar && typeof payload.avatar.hapi === 'object' && payload.avatar.hapi.filename) {
        // Hapus avatar lama jika ada
        if (user.avatar) {
          const oldPath = path.join(
            __dirname,
            "..",
            path.normalize(user.avatar) // Gunakan path.normalize karena user.avatar mungkin `/uploads/foo.jpg`
          );
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }

        const originalName = payload.avatar.hapi.filename;
        const extension = path.extname(originalName);
        const filename = `${Date.now()}${extension}`;
        const filepath = path.join(__dirname, "..", "uploads", filename); // Pastikan folder 'uploads' ada di root backend

        const fileStream = fs.createWriteStream(filepath);
        // Pastikan streaming file selesai sebelum melanjutkan
        await new Promise((resolve, reject) => {
          payload.avatar.on('end', (err) => {
            if (err) return reject(err);
            resolve();
          });
          payload.avatar.pipe(fileStream);
        });

        // Simpan path relatif ke database
        value.avatar = `/uploads/${filename}`;
      } else if (payload.avatar === null) {
        // Jika frontend mengirim avatar: null untuk menghapus avatar
        if (user.avatar) {
          const oldPath = path.join(
            __dirname,
            "..",
            path.normalize(user.avatar)
          );
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        value.avatar = null;
      }
      // --- Akhir logika penanganan avatar ---

      // Update user di database dengan value yang sudah divalidasi dan diubah
      await user.update(value);

      // Kembalikan data user yang diperbarui (tanpa password)
      const { password, ...userData } = user.toJSON();

      return h
        .response({
          status: "Success",
          message: "User Has Been Updated",
          data: userData, // Mengandung path avatar terbaru
        })
        .code(200);
    } catch (err) {
      console.error("Error updating user:", err); // Log error lebih detail
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  delete: async (req, h) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user)
        return h
          .response({ status: "Failed", message: { error: "User not found" } })
          .code(404);
      if (user.avatar) {
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          path.basename(user.avatar)
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      await user.destroy();
      return h
        .response({ status: "Success", message: "User deleted successfully" })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  register: async (req, h) => {
    const { payload } = req;

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Password dan konfirmasi tidak sama!",
      }),
    });

    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const messages = error.details.map((err) => err.message.replace(/\"/g, ""));
      return h.response({ status: "Failed", message: { errors: messages } }).code(422);
    }

    try {
      const existing = await User.findOne({ where: { email: value.email } });
      if (existing) {
        return h
          .response({
            status: "Failed",
            message: { error: "Email sudah digunakan!" },
          })
          .code(409);
      }

      const slug = slugify(value.name, { lower: true, strict: true });

      const hashedPassword = await bcrypt.hash(value.password, 10);
      const user = await User.create({
        name: value.name,
        slug,
        email: value.email,
        password: hashedPassword,
        avatar: null,
      });

      const { password, ...userData } = user.toJSON();

      return h
        .response({
          status: "Success",
          message: "User berhasil didaftarkan",
          data: userData,
        })
        .code(200);
    } catch (err) {
      console.error(err);
      return h
        .response({
          status: "Failed",
          message: { error: "Terjadi kesalahan pada server" },
        })
        .code(500);
    }
  }
};