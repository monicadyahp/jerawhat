// crud-hapi > server.js
"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Path = require('path');
const routes = require("./routes/routes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ['*'], // Di development, bisa '*'. DI PRODUKSI, GANTI DENGAN URL NETLIFY ANDA SECARA SPESIFIK!
        headers: ['Authorization', 'Content-Type'],
        credentials: true,
      },
      payload: {
        parse: true,
        output: "data",
        allow: ["application/json", "multipart/form-data"],
        multipart: true,
        maxBytes: 1048576 * 100,
      },
      files: {
        relativeTo: Path.join(__dirname, 'public') // Asumsi folder 'uploads' ada di dalam 'public'
      }
    },
  });

  await server.register(require("@hapi/inert"));
  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET || 'your_super_secret_jwt_key',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400,
      timeSkewSec: 15
    },
    validate: (artifacts, request, h) => {
      const user = artifacts;
      if (!user || !user.id) {
        return { isValid: false };
      }
      return {
        isValid: true,
        credentials: { id: user.id, name: user.name, email: user.email }
      };
    }
  });

  server.route({
    method: 'GET',
    path: '/uploads/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'uploads'),
        listing: true
      }
    }
  });

  server.route(routes);

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    if (response.isBoom && response.output.statusCode === 413) {
      return h.response({ status: "Failed", message: { errors: [response.message] } }).code(413);
    }
    return h.continue;
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();