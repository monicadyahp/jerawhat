// crud-hapi > routes > routes.js
const UserController = require("../controllers/UserController");
const ArticleController = require("../controllers/ArticleController");
const ContactController = require("../controllers/ContactController");
const LoginController = require("../controllers/LoginController");

module.exports = [
  // User Routes
  { method: "GET", path: "/users", options: { auth: 'jwt' }, handler: UserController.getAll },
  { method: "GET", path: "/users/{id}", options: { auth: 'jwt' }, handler: UserController.getById },
  {
    method: "POST",
    path: "/users",
    options: {
      auth: 'jwt',
      payload: { output: "stream", parse: true, multipart: true, allow: "multipart/form-data", maxBytes: 1048576 * 100 },
    },
    handler: UserController.create,
  },
  {
    method: "PUT",
    path: "/users/{id}", // Ini adalah rute untuk update profil/avatar
    options: {
      auth: 'jwt', // Dilindungi oleh strategi JWT
      payload: { output: "stream", parse: true, multipart: true, allow: "multipart/form-data", maxBytes: 1048576 * 100 },
    },
    handler: UserController.update,
  },
  { method: "DELETE", path: "/users/{id}", options: { auth: 'jwt' }, handler: UserController.delete },

  // Article Routes
  { method: "GET", path: "/articles", options: { auth: 'jwt' }, handler: ArticleController.getAll },
  { method: "GET", path: "/articles/{id}", options: { auth: 'jwt' }, handler: ArticleController.getById },
  {
    method: "POST",
    path: "/articles",
    options: { auth: 'jwt', payload: { parse: true, multipart: true, allow: "multipart/form-data" } },
    handler: ArticleController.create,
  },
  {
    method: "PUT",
    path: "/articles/{id}",
    options: { auth: 'jwt', payload: { parse: true, multipart: true, allow: "multipart/form-data" } },
    handler: ArticleController.update,
  },
  { method: "DELETE", path: "/articles/{id}", options: { auth: 'jwt' }, handler: ArticleController.delete },

  // Contact Routes
  { method: "GET", path: "/contacts", options: { auth: 'jwt' }, handler: ContactController.getAll },
  { method: "GET", path: "/contacts/{id}", options: { auth: 'jwt' }, handler: ContactController.getById },
  { method: "POST", path: "/contacts", options: { auth: 'jwt' }, handler: ContactController.create },
  { method: "PUT", path: "/contacts/{id}", options: { auth: 'jwt' }, handler: ContactController.update },
  { method: "DELETE", path: "/contacts/{id}", options: { auth: 'jwt' }, handler: ContactController.delete },

  // Auth Routes (tidak dilindungi)
  { method: "POST", path: "/login", handler: LoginController.login },
  {
    method: "POST",
    path: "/register",
    options: {
      payload: { output: "stream", parse: true, multipart: true, allow: "multipart/form-data", maxBytes: 1048576 * 100 },
    },
    handler: UserController.register,
  },

];