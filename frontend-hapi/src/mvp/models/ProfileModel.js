// Definisikan URL API dasar menggunakan variabel lingkungan Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';


// frontend-hapi > src > mvp > models > ProfileModel.js
export default class ProfileModel {
  getUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
        return null;
      }
    }
    return null;
  }

  async uploadAvatar(userId, file, token) {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      // Ubah URL fetch
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, { // Sesuaikan URL API Anda, menggunakan PUT /users/{id}
        method: 'PUT', // Pastikan methodnya PUT
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message?.errors || result.message || 'Gagal mengunggah avatar.',
        };
      }

      // Pastikan backend mengembalikan `data.avatar` atau `avatarPath` yang benar
      return {
        success: true,
        message: 'Avatar berhasil diunggah!',
        avatarPath: result.data.avatar, // Sesuaikan ini jika backend mengembalikan properti lain
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Terjadi kesalahan jaringan saat mengunggah avatar.',
      };
    }
  }

  // Contoh fungsi lain untuk update profil (nanti bisa diimplementasikan)
  async updateProfile(userId, newData) {
    console.log(`Updating profile for user ${userId} with data:`, newData);
    return { success: true, message: "Profil berhasil diperbarui!" };
  }
}