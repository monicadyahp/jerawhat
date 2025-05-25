// netlify/functions/api.js
const serverless = require('serverless-http');
const Hapi = require('@hapi/hapi');
// Anda perlu memastikan server.js di crud-hapi mengekspor
// fungsi yang bisa membuat dan mengembalikan instance server Hapi tanpa menjalankannya
const createHapiServer = require('../../crud-hapi/server'); // Sesuaikan path

let hapiApp;

exports.handler = serverless(async (event, context) => {
    if (!hapiApp) {
        const server = await createHapiServer(); // Panggil fungsi pembuat server Hapi
        await server.initialize(); // Inisialisasi tanpa start mendengarkan
        hapiApp = server.listener; // Ambil listener Hapi untuk serverless-http
    }
    return serverless(hapiApp)(event, context);
});