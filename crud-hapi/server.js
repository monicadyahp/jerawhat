// crud-hapi > server.js
"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Path = require('path');
const routes = require("./routes/routes");

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: "localhost",
        routes: {
            cors: {
                origin: ['*'], // Di development, bisa '*'. DI PRODUKSI, GANTI DENGAN URL NETLIFY ANDA SECARA SPESIFIK!
                headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
                credentials: true,
            },
        },
    });

    process.on('unhandledRejection', (err) => {
        console.error('\n*** UNHANDLED REJECTION AT SERVER LEVEL ***');
        console.error(err);
        console.error(err.stack);
        process.exit(1);
    });

    process.on('uncaughtException', (err) => {
        console.error('\n*** UNCAUGHT EXCEPTION AT SERVER LEVEL ***');
        console.error(err);
        console.error(err.stack);
        process.exit(1);
    });

    await server.register(require("@hapi/inert"));
    await server.register(Jwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET || 'wS!9xMvB3$ZrTq7Y#jD2@LfVgXeN6pA0',
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
            // ARTIFACTS ADALAH OBJEK YANG KOMPLEKS, PAYLOAD ASLI ADA DI artifacts.decoded.payload
            const userPayload = artifacts.decoded.payload; // <--- PERBAIKAN KRUSIAL DI SINI!

            console.log('Validating JWT. Original Artifacts:', artifacts); // Log objek artifacts lengkap
            console.log('Validating JWT. Extracted Payload:', userPayload); // <-- Log payload yang diekstraksi

            if (!userPayload || !userPayload.id) { // <-- GANTI DENGAN userPayload
                console.warn('JWT Validation Failed: User payload or User ID is missing.');
                return { isValid: false };
            }

            console.log('JWT Validation Success for User ID:', userPayload.id); // <-- Gunakan userPayload
            return {
                isValid: true,
                credentials: { id: userPayload.id, name: userPayload.name, email: userPayload.email } // <-- Gunakan userPayload
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
            console.warn('Payload Too Large Error (413):', response.message);
            return h.response({ status: "Failed", message: { errors: ["File yang diunggah terlalu besar."] } }).code(413);
        }
        if (response.isBoom) {
             console.error('Boom Error:', response.output.statusCode, response.message);
             return h.continue;
        }
        return h.continue;
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
};

init();