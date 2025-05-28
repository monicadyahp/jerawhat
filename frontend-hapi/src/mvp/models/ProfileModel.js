// ProfileModel.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id';

export default class ProfileModel {
  // Hapus fungsi getUserData() dari model ini.
  // Data pengguna sekarang akan diambil dari AuthContext.

  async uploadAvatar(userId, file, token) {
    if (!file || !(file instanceof File)) {
      return {
        success: false,
        message: 'File tidak valid. Silakan pilih file gambar.',
      };
    }

    // Validate file type (only allow jpg and png)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: 'File harus berupa gambar JPG atau PNG.',
      };
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message: 'Ukuran file terlalu besar. Maksimal 5MB.',
      };
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      // Get current user data first
      const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Gagal mendapatkan data user');
      }

      const userData = await userResponse.json();
      
      // Add required fields to formData
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
        console.error('Backend Error Response:', result);
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

  async getScanHistory(userId, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/scans/history/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gagal mengambil riwayat scan');
      }

      const result = await response.json();
      return {
        success: true,
        data: result.data,
        message: 'Riwayat scan berhasil diambil'
      };
    } catch (error) {
      console.error('Error fetching scan history:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat mengambil riwayat scan'
      };
    }
  }
}