// Definisikan URL API dasar menggunakan variabel lingkungan Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id';

export default class RegisterModel {
  async register({ name, email, password, confirmPassword }) {
    if (!name || !email || !password || !confirmPassword) {
      return {
        success: false,
        status: "gagal",
        message: "Semua field harus diisi!", // Pesan lebih langsung
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        status: "gagal",
        message: "Password dan konfirmasi tidak sama!", // Pesan lebih langsung
      };
    }

    // --- TAMBAHAN: Validasi panjang password ---
    if (password.length < 8) {
      return {
        success: false,
        status: "gagal",
        message: "Password minimal harus 8 karakter!",
      };
    }
    // --- AKHIR TAMBAHAN ---

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      // formData.append("confirmPassword", confirmPassword); // Ini tidak perlu dikirim ke backend jika backend tidak memvalidasinya
                                                            // atau jika validasi confirmPassword hanya di frontend.

      // Ubah URL fetch dari hardcoded 'http://localhost:3000' menjadi API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/register`, { // <-- PERUBAHAN DI SINI
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        // Pastikan Anda mengambil pesan error dengan benar dari respons backend
        // Jika backend mengirim 'message.error', gunakan itu. Jika hanya 'message', gunakan itu.
        // Contoh: return { success: false, status: "gagal", message: result.message?.error || result.message || "Registrasi gagal." };
        return {
          success: false,
          status: "gagal",
          // Perbarui ini untuk mengambil pesan error dari backend
          // Jika backend mengembalikan { message: { error: "..." } } atau { message: "..." }
          message: result.message?.error || result.message || "Terjadi kesalahan pada server.",
        };
      }

      return { success: true, status: "berhasil", user: result.data };
    } catch (err) {
      return {
        success: false,
        status: "gagal",
        message: "Terjadi kesalahan jaringan atau server tidak merespons.", // Pesan error jaringan yang lebih ramah
      };
    }
  }
}