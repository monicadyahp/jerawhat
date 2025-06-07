// frontend-hapi > src > mvp > presenters > useProfilePresenter.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import ProfileModel from '../models/ProfileModel';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
export default function useProfilePresenter() {
  const model = useMemo(() => new ProfileModel(), []);
  const { user, loading: authLoading, logout, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }
    if (!user) {
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
    }
    setLoading(false);
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header)
        header.classList.toggle('scroll-header', window.scrollY >= 50);
      const up = document.getElementById('scroll-up');
      if (up) up.classList.toggle('show-scroll', window.scrollY >= 460);
    };
    window.addEventListener('scroll', handleScroll);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, authLoading, navigate]);
  useEffect(() => {
    const fetchScanHistory = async () => {
      if (user && user.token) {
        setHistoryLoading(true);
        const result = await model.getScanHistory(user.token);
        if (result.success) {
          setScanHistory(result.data);
        } else {
          console.error("Failed to fetch scan history:", result.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Gagal mengambil riwayat scan: ${result.message}`,
            background: '#fbeaea',
            confirmButtonColor: 'hsl(330, 91%, 85%)',
            color: 'hsl(323, 70%, 30%)',
          });
        }
        setHistoryLoading(false);
      } else if (!authLoading && !user) {
        setScanHistory([]);
      }
    };
    fetchScanHistory();
  }, [user, authLoading, model]);
  const refreshUserData = useCallback((updatedAvatarPath) => {
    if (user && updatedAvatarPath) {
      const updatedUser = { ...user, avatar: updatedAvatarPath };
      login(updatedUser);
      console.log('User data refreshed in AuthContext. New avatar path:', updatedAvatarPath);
      setPreviewAvatarUrl(null);
    }
  }, [user, login]);
  const handleLogout = () => {
    Swal.fire({
      title: 'Yakin ingin keluar?',
      text: 'Anda akan keluar dari akun Anda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(330, 91%, 85%)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal',
      background: '#fbeaea',
      color: 'hsl(323, 70%, 30%)',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Keluar!',
          text: 'Anda telah berhasil keluar dari akun.',
          background: '#fbeaea',
          confirmButtonColor: 'hsl(330, 91%, 85%)',
          color: 'hsl(323, 70%, 30%)',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/login');
        });
      }
    });
  };
  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewAvatarUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewAvatarUrl(null);
    }
  };
  const handleAvatarUpload = async () => {
    if (!selectedAvatarFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih file gambar terlebih dahulu!',
        background: '#fbeaea',
        confirmButtonColor: 'hsl(330, 91%, 85%)',
        color: 'hsl(323, 70%, 30%)',
      });
      return;
    }
    if (!user || !user.token || !user.id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Anda tidak memiliki izin untuk mengunggah avatar atau data user tidak lengkap.',
        background: '#fbeaea',
        confirmButtonColor: 'hsl(330, 91%, 85%)',
        color: 'hsl(323, 70%, 30%)',
      });
      return;
    }
    Swal.fire({
      title: 'Mengunggah...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#fbeaea',
      color: 'hsl(323, 70%, 30%)',
      showConfirmButton: false, // Tambahkan ini
    });
    const result = await model.uploadAvatar(user.id, selectedAvatarFile, user.token);
    Swal.close();
    if (result.success) {
      refreshUserData(result.avatarPath);
      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: result.message,
        background: '#fbeaea',
        // confirmButtonColor: 'hsl(330, 91%, 85%)', // Hapus atau nonaktifkan ini
        // color: 'hsl(323, 70%, 30%)', // Ini masih bisa digunakan untuk warna teks
        showConfirmButton: false, // Tambahkan ini untuk menghilangkan tombol konfirmasi
        timer: 2000, // Opsional: tambahkan timer agar pop-up hilang otomatis
      });
      setSelectedAvatarFile(null);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: result.message,
        background: '#fbeaea',
        // confirmButtonColor: 'hsl(330, 91%, 85%)', // Hapus atau nonaktifkan ini
        // color: 'hsl(323, 70%, 30%)', // Ini masih bisa digunakan untuk warna teks
        showConfirmButton: false, // Tambahkan ini untuk menghilangkan tombol konfirmasi
        timer: 3000, // Opsional: tambahkan timer agar pop-up hilang otomatis
      });
      setPreviewAvatarUrl(null);
    }
  };
  return {
    user,
    loading: loading || authLoading,
    selectedAvatarFile,
    previewAvatarUrl,
    handleLogout,
    onAvatarChange,
    handleAvatarUpload,
    scanHistory,
    historyLoading
  };
}