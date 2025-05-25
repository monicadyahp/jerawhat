// Definisikan URL API dasar menggunakan variabel lingkungan Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';


// frontend-hapi > src > mvp > models > ProfileModel.js
export default class ProfileModel {
  getUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        // Pastikan token bersih dari whitespace/karakter tak terlihat
        if (parsedData.token) {
            parsedData.token = parsedData.token.trim(); // <--- TAMBAHKAN .trim() DI SINI
        }
        return parsedData;
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
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Token yang masuk ke sini sudah bersih dari getUserData()
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // Log ini akan sangat membantu jika ada pesan error dari backend
        console.error('Backend Error Response:', result);
        return {
          success: false,
          message: result.message?.errors || result.message || 'Gagal mengunggah avatar.',
        };
      }

      return {
        success: true,
        message: 'Avatar berhasil diunggah!',
        avatarPath: result.data.avatar,
      };
    } catch (err) {
      console.error('Network/Fetch Error:', err); // Log error jaringan lebih detail
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