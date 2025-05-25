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
      console.error("Error in getAll users:", err); // Tambahkan log
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
      console.error("Error in getById user:", err); // Tambahkan log
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

    let filename = null; // Ini untuk create user, bukan update

    if (
      payload.avatar &&
      typeof payload.avatar === "object" &&
      payload.avatar._data && // Ini lebih untuk payload.output: 'data'
      payload.avatar.hapi &&
      payload.avatar.hapi.filename
    ) {
      const originalName = payload.avatar.hapi.filename;
      const extension = path.extname(originalName);
      filename = `${Date.now()}${extension}`;
      const filepath = path.join(__dirname, "..", "uploads", filename);
      const fileStream = fs.createWriteStream(filepath);
      payload.avatar.pipe(fileStream); // Asumsi payload.avatar adalah stream
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
      console.error("Error in create user:", err); // Tambahkan log
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
    console.log('\n--- [UPDATE USER] Permintaan diterima ---');
    console.log('Payload yang diterima: ', JSON.stringify(Object.keys(payload)));
    console.log('Apakah payload.avatar ada? ', !!payload.avatar);
    if (payload.avatar) {
        console.log('Tipe payload.avatar: ', typeof payload.avatar);
        if (typeof payload.avatar === 'object' && payload.avatar.hapi) {
            console.log('Nama file avatar (payload.avatar.hapi.filename): ', payload.avatar.hapi.filename);
            console.log('Tipe content avatar (payload.avatar.hapi.headers[\'content-type\']): ', payload.avatar.hapi.headers ? payload.avatar.hapi.headers['content-type'] : 'N/A');
        } else {
            console.log('payload.avatar bukan objek Hapi file stream yang diharapkan.');
        }
    }

    const userIdFromParams = parseInt(req.params.id);
    const authenticatedUserId = req.auth.isAuthenticated ? req.auth.credentials.id : null;

    console.log('ID dari URL params: ', userIdFromParams);
    console.log('ID user terautentikasi: ', authenticatedUserId);

    if (!req.auth.isAuthenticated || authenticatedUserId !== userIdFromParams) {
      console.error('ERROR: Otorisasi gagal. User tidak diizinkan mengubah profil ini.');
      return h.response({ status: "Failed", message: { error: "Unauthorized: Anda tidak diizinkan mengubah profil ini." }}).code(403);
    }

    const schema = Joi.object({
      name: Joi.string().min(3).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).optional(),
      slug: Joi.string().optional(),
    });

    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      console.error('ERROR: Validasi Joi gagal:', error.details.map((err) => err.message));
      const messages = error.details.map((err) => err.message.replace(/\"/g, ""));
      return h.response({ status: "Failed", message: { errors: messages }}).code(422);
    }
    console.log('Validasi Joi berhasil.');

    try {
      const user = await User.findByPk(userIdFromParams);
      if (!user) {
        console.error('ERROR: User tidak ditemukan untuk ID:', userIdFromParams);
        return h.response({ status: "Failed", message: { errors: "User not found" }}).code(404);
      }
      console.log('User ditemukan:', user.email);

      if (value.email && value.email !== user.email) {
        console.log('Email diubah. Memeriksa ketersediaan email baru...');
        const existing = await User.findOne({ where: { email: value.email } });
        if (existing) {
          console.error('ERROR: Email sudah digunakan oleh akun lain.');
          return h.response({ status: "Failed", message: { error: "Email already used by another account" }}).code(409);
        }
        console.log('Email baru tersedia.');
      }

      if (value.password) {
        console.log('Hashing password baru...');
        value.password = await bcrypt.hash(value.password, 10);
        console.log('Password baru berhasil di-hash.');
      }

      // --- Logika penanganan avatar ---
      if (payload.avatar && typeof payload.avatar.hapi === 'object' && payload.avatar.hapi.filename) {
        console.log('Memulai penanganan unggahan avatar...');

        // Hapus avatar lama jika ada
        if (user.avatar) {
          const oldPath = path.join(__dirname, "..", path.normalize(user.avatar));
          console.log('Path avatar lama: ', oldPath);
          if (fs.existsSync(oldPath)) {
            try {
              fs.unlinkSync(oldPath);
              console.log('Avatar lama berhasil dihapus.');
            } catch (unlinkErr) {
              console.warn('PERINGATAN: Gagal menghapus avatar lama:', unlinkErr.message);
            }
          } else {
            console.log('Avatar lama tidak ditemukan di path yang ditentukan.');
          }
        }

        const originalName = payload.avatar.hapi.filename;
        const extension = path.extname(originalName);
        const filename = `${Date.now()}${extension}`; // <--- INI PERBAIKAN UTAMA UNTUK NAMA FILE
        
        const filepath = path.join(__dirname, "..", "uploads", filename);
        console.log('Akan menyimpan avatar baru ke: ', filepath);

        const uploadDir = path.join(__dirname, "..", "uploads");
        if (!fs.existsSync(uploadDir)) {
            console.log('Direktori "uploads" tidak ada. Membuat...');
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('Direktori "uploads" berhasil dibuat.');
        }

        const fileStream = fs.createWriteStream(filepath);
        fileStream.on('error', (err) => {
            console.error('ERROR: Stream tulis file (fs.createWriteStream) mengalami masalah:', err);
        });

        await new Promise((resolve, reject) => {
          payload.avatar.on('end', (err) => {
            if (err) {
                console.error('ERROR: Stream payload.avatar "end" event dengan error:', err);
                return reject(err);
            }
            console.log('Stream payload.avatar berhasil selesai (event "end").');
            resolve();
          });
          payload.avatar.on('error', (err) => {
              console.error('ERROR: Stream payload.avatar "error" event:', err);
              reject(err);
          });
          payload.avatar.pipe(fileStream);
          console.log('Stream payload.avatar sedang di-pipe ke fileStream.');
        });
        console.log('File avatar baru berhasil ditulis ke disk.');

        value.avatar = `/uploads/${filename}`; // Simpan path relatif ke database
        console.log('Path avatar baru untuk database: ', value.avatar);
      } else if (payload.avatar === null) {
        console.log('Permintaan menghapus avatar (payload.avatar = null).');
        if (user.avatar) {
          const oldPath = path.join(__dirname, "..", path.normalize(user.avatar));
          console.log('Mencoba menghapus avatar lama karena payload.avatar = null di:', oldPath);
          if (fs.existsSync(oldPath)) {
            try {
              fs.unlinkSync(oldPath);
              console.log('Avatar lama berhasil dihapus karena payload.avatar = null.');
            } catch (unlinkErr) {
              console.warn('PERINGATAN: Gagal menghapus avatar lama saat payload.avatar = null:', unlinkErr.message);
            }
          } else {
              console.log('Avatar lama tidak ditemukan di path yang ditentukan saat payload.avatar = null.');
          }
        }
        value.avatar = null;
        console.log('Path avatar di database akan diset ke null.');
      } else {
        console.log('Tidak ada file avatar di payload, atau payload.avatar tidak valid.');
        delete value.avatar;
      }

      console.log('Melanjutkan update user di database dengan data: ', JSON.stringify(value));
      await user.update(value);
      console.log('User berhasil diupdate di database.');

      const { password, ...userData } = user.toJSON();
      console.log('Respons berhasil dikirim.');
      return h.response({ status: "Success", message: "User Has Been Updated", data: userData }).code(200);

    } catch (err) {
      console.error("\n!!! KRITIS: Error saat mengupdate user atau menyimpan avatar: !!!", err);
      console.error(err.stack); 
      return h.response({ status: "Failed", message: { error: "Internal server error. Silakan cek log server." } }).code(500);
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
      console.error("Error in delete user:", err); // Tambahkan log
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
      console.error("Error in register user:", err); // Tambahkan log
      return h
        .response({
          status: "Failed",
          message: { error: "Terjadi kesalahan pada server" },
        })
        .code(500);
    }
  }
};