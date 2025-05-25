// ProfileModel.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default class ProfileModel {
  // Hapus fungsi getUserData() dari model ini.
  // Data pengguna sekarang akan diambil dari AuthContext.

  async uploadAvatar(userId, file, token) {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
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
      console.error('Network/Fetch Error:', err);
      return {
        success: false,
        message: err.message || 'Terjadi kesalahan jaringan saat mengunggah avatar.',
      };
    }
  }

  async updateProfile(userId, newData) {
    console.log(`Updating profile for user ${userId} with data:`, newData);
    return { success: true, message: "Profil berhasil diperbarui!" };
  }
}