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
                // HAPUS BARIS 'methods' INI SECARA KESELURUHAN!
                // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // <--- HAPUS INI DARI KODEMU
                credentials: true,
            },
        },
    });

    // Ini sangat penting untuk debugging crash yang tidak terdeteksi
    process.on('unhandledRejection', (err) => {
        console.error('\n*** UNHANDLED REJECTION AT SERVER LEVEL ***');
        console.error(err);
        console.error(err.stack); // Penting untuk melihat stack trace lengkap
        process.exit(1);
    });

    process.on('uncaughtException', (err) => {
        console.error('\n*** UNCAUGHT EXCEPTION AT SERVER LEVEL ***');
        console.error(err);
        console.error(err.stack); // Penting untuk melihat stack trace lengkap
        process.exit(1);
    });

    await server.register(require("@hapi/inert")); // Diperlukan untuk menyajikan file statis (misal /uploads)
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
            const user = artifacts; // artifacts adalah payload dari JWT
            if (!user || !user.id) {
                return { isValid: false };
            }
            return {
                isValid: true,
                credentials: { id: user.id, name: user.name, email: user.email }
            };
        }
    });

    // Rute untuk menyajikan file statis dari folder 'uploads'
    server.route({
        method: 'GET',
        path: '/uploads/{param*}', // {param*} menangkap semua setelah /uploads/
        handler: {
            directory: {
                path: Path.join(__dirname, 'uploads'), // Pastikan ini mengarah ke folder 'uploads' di root proyek
                listing: true // Opsional: Untuk debugging, tampilkan daftar file di direktori
            }
        }
    });

    // Daftarkan semua rute dari file routes.js
    server.route(routes);

    // Handler onPreResponse untuk mengubah error 413 (Payload Too Large)
    server.ext("onPreResponse", (request, h) => {
        const response = request.response;
        if (response.isBoom && response.output.statusCode === 413) {
            console.warn('Payload Too Large Error (413):', response.message);
            return h.response({ status: "Failed", message: { errors: ["File yang diunggah terlalu besar."] } }).code(413);
        }
        // Jika respons adalah error Boom lainnya (misalnya 400, 404, 500)
        if (response.isBoom) {
             console.error('Boom Error:', response.output.statusCode, response.message);
             return h.continue; // Lanjutkan dengan respons error Boom asli
        }
        return h.continue; // Lanjutkan dengan respons normal
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
};

// Inisialisasi server
init();