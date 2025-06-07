// frontend-hapi > src > mvp > models > ScanHistoryModel.js
export default class ScanHistoryModel {
  constructor(apiBaseUrl, userToken) {
    this.apiBaseUrl = apiBaseUrl;
    this.userToken = userToken;
  }

  async fetchScanHistory() {
    if (!this.userToken) {
      return { data: [], message: 'Anda belum login.' };
    }
    const apiUrl = `${this.apiBaseUrl}/history/me`;
    try {
      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${this.userToken}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        return { data: data.data, message: null };
      } else {
        return { data: [], message: data.message || 'Gagal mengambil riwayat scan.' };
      }
    } catch (e) {
      console.error('Error fetching scan history:', e);
      return { data: [], message: 'Terjadi error koneksi: ' + e.message };
    }
  }
}