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
        setScanHistory(data);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  const handleOpenModal = (scan) => setSelectedScan(scan);
  const handleCloseModal = () => setSelectedScan(null); // Fungsi untuk menutup modal

  const handleDeleteScan = async (idToDelete) => {
    // 1. Pop-up Konfirmasi
    const result = await Swal.fire({
      title: 'Apakah yakin akan menghapus riwayat scan?',
      text: 'Riwayat ini hanya akan disembunyikan dari tampilan Anda, tidak terhapus dari database.',
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
        setScanHistory(prevHistory => prevHistory.filter(scan => scan.id !== idToDelete));

        // Pindahkan handleCloseModal() ke sini, setelah konfirmasi sukses
        // Ini memastikan modal ditutup hanya setelah item berhasil disembunyikan
        handleCloseModal(); // <<-- PERUBAHAN DI SINI

        Swal.fire({
          title: 'Berhasil!',
          text: 'Riwayat scan telah dihapus.',
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
      // Jika dibatalkan, jangan tutup modal detail
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