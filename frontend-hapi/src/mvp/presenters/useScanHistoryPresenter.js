// frontend-hapi > src > mvp > presenters > useScanHistoryPresenter.js
import { useState, useEffect } from 'react';
import ScanHistoryModel from '../models/ScanHistoryModel';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

export function useScanHistoryPresenter() {
  const { user } = useAuth();
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScan, setSelectedScan] = useState(null);

  // useEffect untuk memuat riwayat scan dan memfilter berdasarkan hidden IDs
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      const model = new ScanHistoryModel(
        import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id',
        user?.token
      );

      const { data, message } = await model.fetchScanHistory();

      if (message) {
        setError(message);
      } else {
        // --- PERUBAHAN DI SINI: FILTER DARI LOCALSTORAGE ---
        const hiddenIds = JSON.parse(localStorage.getItem('hiddenScanIds') || '[]');
        const filteredData = data.filter(scan => !hiddenIds.includes(scan.id));
        setScanHistory(filteredData);
        // ----------------------------------------------------
      }
      setLoading(false);
    };

    fetchHistory();
    // Tambahkan 'handleDeleteScan' ke dependency array untuk re-fetch setelah delete.
    // Atau, jika Anda hanya ingin mengandalkan filter, biarkan tanpa itu
  }, [user]); // Tetap bergantung pada user untuk re-fetch jika user berubah

  const handleOpenModal = (scan) => setSelectedScan(scan);
  const handleCloseModal = () => setSelectedScan(null);

  const handleDeleteScan = async (idToDelete) => {
    const result = await Swal.fire({
      title: 'Apakah yakin akan menghapus riwayat scan?',
      text: 'Riwayat ini akan dihapus dari history scan Anda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(330, 91%, 85%)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batalkan',
      background: '#fbeaea',
      color: 'hsl(323, 70%, 30%)',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        // --- PERUBAHAN DI SINI: SIMPAN KE LOCALSTORAGE DAN UPDATE STATE ---
        const hiddenIds = JSON.parse(localStorage.getItem('hiddenScanIds') || '[]');
        if (!hiddenIds.includes(idToDelete)) {
          hiddenIds.push(idToDelete);
          localStorage.setItem('hiddenScanIds', JSON.stringify(hiddenIds));
        }

        setScanHistory(prevHistory => prevHistory.filter(scan => scan.id !== idToDelete));
        // ------------------------------------------------------------------

        handleCloseModal(); // Modal detail akan ditutup setelah penghapusan berhasil

        Swal.fire({
          title: 'Berhasil!',
          text: 'Riwayat scan telah dihapus.', // Ubah teks untuk lebih jelas
          icon: 'success',
          background: '#fbeaea',
          color: 'hsl(323, 70%, 30%)',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting scan history:", error);
        Swal.fire({
          title: 'Gagal!',
          text: `Gagal menyembunyikan riwayat scan: ${error.message || 'Terjadi kesalahan.'}`,
          icon: 'error',
          background: '#fbeaea',
          color: 'hsl(323, 70%, 30%)',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Dibatalkan',
        text: 'Penghapusan riwayat scan dibatalkan.',
        icon: 'info',
        background: '#fbeaea',
        color: 'hsl(323, 70%, 30%)',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return {
    scanHistory,
    loading,
    error,
    selectedScan,
    handleOpenModal,
    handleCloseModal,
    handleDeleteScan,
  };
}