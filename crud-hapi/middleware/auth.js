// crud-hapi > routes > routes.js
const UserController = require("../controllers/UserController");
const ArticleController = require("../controllers/ArticleController");
const ContactController = require("../controllers/ContactController");
const LoginController = require("../controllers/LoginController");
// const auth = require("../middleware/auth"); // <-- Hapus ini karena auth akan dari strategi Hapi JWT

module.exports = [
  // User Routes
  {
    method: "GET",
    path: "/users",
    options: {
      auth: 'jwt', // <-- Ganti dari pre: [{ method: auth }]
    },
    handler: UserController.getAll,
  },
  {
    method: "GET",
    path: "/users/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: UserController.getById,
  },
  {
    method: "POST",
    path: "/users",
    options: {
      auth: 'jwt', // <-- Ganti
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 1048576 * 100,
      },
    },
    handler: UserController.create,
  },
  {
    method: "PUT",
    path: "/users/{id}", // <-- Rute ini yang akan digunakan untuk update profil/avatar
    options: {
      auth: 'jwt', // <-- Ganti
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 1048576 * 100,
      },
    },
    handler: UserController.update,
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: UserController.delete,
  },

  // Article Routes
  {
    method: "GET",
    path: "/articles",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ArticleController.getAll,
  },
  {
    method: "GET",
    path: "/articles/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ArticleController.getById,
  },
  {
    method: "POST",
    path: "/articles",
    options: {
      auth: 'jwt', // <-- Ganti
      payload: {
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
    handler: ArticleController.create,
  },
  {
    method: "PUT",
    path: "/articles/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
      payload: {
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
    handler: ArticleController.update,
  },
  {
    method: "DELETE",
    path: "/articles/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ArticleController.delete,
  },

  //Contact Routes
  {
    method: "GET",
    path: "/contacts",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ContactController.getAll,
  },
  {
    method: "GET",
    path: "/contacts/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ContactController.getById,
  },
  {
    method: "POST",
    path: "/contacts",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ContactController.create,
  },
  {
    method: "PUT",
    path: "/contacts/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ContactController.update,
  },
  {
    method: "DELETE",
    path: "/contacts/{id}",
    options: {
      auth: 'jwt', // <-- Ganti
    },
    handler: ContactController.delete,
  },

  // Auth Routes
  { method: "POST", path: "/login", handler: LoginController.login },

  {
    method: "POST",
    path: "/register",
    options: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 1048576 * 100,
      },
    },
    handler: UserController.register,
  },
];