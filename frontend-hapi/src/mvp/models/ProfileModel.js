const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id';
export default class ProfileModel {
  /**
   * Mengunggah avatar pengguna ke server.
   * @param {number} userId - ID pengguna.
   * @param {File} file - Objek File avatar.
   * @param {string} token - Token JWT untuk autentikasi.
   * @returns {Promise<{success: boolean, message: string, avatarPath?: string}>} Hasil operasi.
   */
  async uploadAvatar(userId, file, token) {
    if (!file || !(file instanceof File)) {
      return {
        success: false,
        message: 'File tidak valid. Silakan pilih file gambar.',
      };
    }
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: 'File harus berupa gambar JPG atau PNG.',
      };
    }
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message: 'Ukuran file terlalu besar. Maksimal 5MB.',
      };
    }
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message.error || 'Gagal mendapatkan data user untuk update avatar.');
      }
      const userData = await userResponse.json();
      formData.append('name', userData.data.name);
      formData.append('email', userData.data.email);
      formData.append('slug', userData.data.slug);
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const result = await response.json();
        console.error('Backend Error Response for Avatar Upload:', result);
        return {
          success: false,
          message: result.message?.errors || result.message || 'Gagal mengunggah avatar.',
        };
      }
      const result = await response.json();
      return {
        success: true,
        message: 'Avatar berhasil diunggah!',
        avatarPath: result.data.avatar,
      };
    } catch (err) {
      console.error('Network/Fetch Error during Avatar Upload:', err);
      return {
        success: false,
        message: err.message || 'Terjadi kesalahan jaringan saat mengunggah avatar.',
      };
    }
  }
  /**
   * Fungsi placeholder untuk update profil lainnya (jika ada).
   * @param {number} userId - ID pengguna.
   * @param {object} newData - Data profil yang diperbarui.
   * @returns {Promise<{success: boolean, message: string}>} Hasil operasi.
   */
  async updateProfile(userId, newData) {
    console.log(`Updating profile for user ${userId} with data:`, newData);
    return { success: true, message: "Profil berhasil diperbarui!" };
  }
  /**
   * Mengambil riwayat scan AI untuk pengguna yang sedang login.
   * @param {string} token - Token JWT untuk autentikasi.
   * @returns {Promise<{success: boolean, data?: Array<object>, message: string}>} Hasil operasi.
   */
  async getScanHistory(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/history/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        const error = await response.json();
        console.error('Backend Error Response for History:', error);
        throw new Error(error.message?.error || error.message || 'Gagal mengambil riwayat scan.');
      }
      const result = await response.json();
      return {
        success: true,
        data: result.data,
        message: 'Riwayat scan berhasil diambil.'
      };
    } catch (error) {
      console.error('Error fetching scan history:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat mengambil riwayat scan.'
      };
    }
  }
}