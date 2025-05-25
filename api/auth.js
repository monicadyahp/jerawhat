// api/auth.js
// Ini adalah contoh, Anda harus mengadaptasi logika dari crud-hapi/controllers/LoginController.js

const { loginUser, /* fungsi lain dari controller Anda */ } = require('../crud-hapi/controllers/LoginController'); // Sesuaikan path

module.exports = async (req, res) => {
    // Vercel Serverless Functions menggunakan request (req) dan response (res) objek
    // yang mirip dengan Express. Anda perlu menyesuaikan cara Hapi menangani request/response.

    if (req.method === 'POST') {
        try {
            // Asumsi body permintaan sudah diparsing oleh Vercel (biasanya JSON)
            const { email, password } = req.body;

            // Panggil logika login dari controller Hapi Anda
            // Anda mungkin perlu membuat LoginController.js mengekspor fungsi yang dapat digunakan secara terpisah
            // tanpa bergantung pada objek 'request' dan 'h' Hapi secara langsung.
            const result = await loginUser(email, password); // Anda perlu refaktor LoginController.js agar bisa dipanggil seperti ini

            if (result.success) {
                res.status(200).json(result); // Kirim respons sukses
            } else {
                res.status(401).json(result); // Kirim respons error (misal: kredensial tidak valid)
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

// Anda perlu mengulangi ini untuk setiap endpoint API Anda (register, get user, create article, dll.)
// Misalnya, untuk mengambil user: api/users.js
// module.exports = async (req, res) => {
//     if (req.method === 'GET') {
//         const { getUserById } = require('../crud-hapi/controllers/UserController'); // Sesuaikan
//         const user = await getUserById(req.query.id);
//         res.status(200).json(user);
//     }
// };