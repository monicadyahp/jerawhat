// Definisikan URL API dasar menggunakan variabel lingkungan Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default class LoginModel {
  async login(email, password) {
    if (!email || !password) {
      return {
        success: false,
        status: "gagal",
        message: "Email dan password harus diisi.",
      };
    }
    try {
          const response = await fetch(`${API_BASE_URL}/login`, { // <--- Ubah di sini
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          status: "gagal",
          message:
            result.message?.errors?.[0] || result.error || "Login gagal.",
        };
      }

      return {
        success: true,
        status: "berhasil",
        token: result.data.token,
        user : result.data.user,
      };
    } catch (err) {
      return {
        success: false,
        status: "gagal",
        message: err.message || "Terjadi kesalahan jaringan.",
      };
    }
  }
}