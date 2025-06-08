// Definisikan URL API dasar menggunakan variabel lingkungan Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id';

export default class LoginModel {
  async login(email, password) {
    if (!email || !password) {
      return {
        success: false,
        status: "gagal",
        message: "Email dan password harus diisi.", // Pesan validasi frontend
      };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMessage = "Login gagal. Silakan coba lagi."; // Pesan default jika tidak ada pesan spesifik dari backend

        // --- MULAI PERBAIKAN DI SINI ---
        // Logika untuk mengekstrak pesan error dari respons backend
        // Anda perlu tahu persis bagaimana backend Anda mengirimkan pesan error.
        // Berikut beberapa skenario umum:

        // Skenario 1: Backend mengirimkan pesan error langsung di 'message' (string)
        if (typeof result.message === 'string') {
          errorMessage = result.message;
        } 
        // Skenario 2: Backend mengirimkan objek di 'message' dengan properti 'error'
        else if (result.message && typeof result.message === 'object' && result.message.error) {
          errorMessage = result.message.error;
        } 
        // Skenario 3: Backend mengirimkan array errors di 'message.errors' (seperti validasi Joi/Yup)
        else if (result.message && Array.isArray(result.message.errors) && result.message.errors.length > 0) {
          errorMessage = result.message.errors[0]; // Ambil pesan error pertama
        }
        // Skenario 4: Backend mengirimkan error langsung di properti 'error' (string)
        else if (typeof result.error === 'string') {
          errorMessage = result.error;
        }

        // Opsional: Sesuaikan pesan jika ada keyword tertentu dari backend
        // Ini berguna jika pesan backend terlalu teknis atau tidak user-friendly
        if (errorMessage.toLowerCase().includes("user not found") || errorMessage.toLowerCase().includes("akun tidak ditemukan")) {
            errorMessage = "Email tidak terdaftar atau akun tidak ditemukan.";
        } else if (errorMessage.toLowerCase().includes("invalid password") || errorMessage.toLowerCase().includes("password salah")) {
            errorMessage = "Password yang Anda masukkan salah atau akun tidak terdaftar";
        } else if (errorMessage.toLowerCase().includes("invalid credentials")) {
            errorMessage = "Email atau password yang Anda masukkan salah.";
        }
        // --- AKHIR PERBAIKAN ---

        return {
          success: false,
          status: "gagal",
          message: errorMessage,
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
        message: err.message || "Terjadi kesalahan jaringan atau server tidak merespons. Silakan coba lagi.",
      };
    }
  }
}