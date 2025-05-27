// Definisikan URL API dasar menggunakan variabel lingkungan Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id';

export default class RegisterModel {
  async register({ name, email, password, confirmPassword }) {
    if (!name || !email || !password || !confirmPassword) {
      return {
        success: false,
        status: "gagal",
        message: { errors: "Semua field harus diisi!" },
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        status: "gagal",
        message: { errors: "Password dan konfirmasi tidak sama!" },
      };
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword); // Ini tidak perlu dikirim ke backend jika backend tidak memvalidasinya
                                                            // atau jika validasi confirmPassword hanya di frontend.

      // Ubah URL fetch dari hardcoded 'http://localhost:3000' menjadi API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/register`, { // <-- PERUBAHAN DI SINI
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          status: "gagal",
          message: result.message,
        };
      }

      return { success: true, status: "berhasil", user: result.data };
    } catch (err) {
      return {
        success: false,
        status: "gagal",
        message: { errors: err.message },
      };
    }
  }
}