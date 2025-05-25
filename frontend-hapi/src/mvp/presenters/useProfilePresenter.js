// useProfilePresenter.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import ProfileModel from '../models/ProfileModel';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext'; // Penting: Import useAuth

export default function useProfilePresenter() {
  const model = useMemo(() => new ProfileModel(), []);
  const { user, loading: authLoading, logout, login } = useAuth(); // Dapatkan user, loading, login, dan logout dari AuthContext

  // State lokal tidak lagi menyimpan user, karena akan diambil dari AuthContext
  // const [user, setUser] = useState(null); // Hapus baris ini
  const [loading, setLoading] = useState(true); // Gunakan loading terpisah untuk operasi presenter ini
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Jika AuthContext masih loading, tunggu
    if (authLoading) {
      setLoading(true);
      return;
    }

    // Jika user tidak ada setelah AuthContext selesai loading, arahkan ke login
    if (!user) {
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
    }
    setLoading(false); // Setelah user status diketahui, set loading false

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
  }, [user, authLoading, navigate]); // Tambahkan user dan authLoading sebagai dependensi

  // Callback untuk memperbarui data user di AuthContext setelah upload avatar
  const refreshUserData = useCallback((updatedAvatarPath) => {
    if (user && updatedAvatarPath) {
      const updatedUser = { ...user, avatar: updatedAvatarPath };
      login(updatedUser); // Update user di AuthContext
      console.log('User data refreshed in AuthContext. New avatar path:', updatedAvatarPath);
      setPreviewAvatarUrl(null); // Reset preview URL setelah data user di-refresh
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
        logout(); // Panggil fungsi logout dari AuthContext
        // window.dispatchEvent(new Event('loginStatusUpdated')); // Ini tidak lagi diperlukan
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
    });

    const result = await model.uploadAvatar(user.id, selectedAvatarFile, user.token);

    Swal.close();

    if (result.success) {
      // Panggil refreshUserData untuk memperbarui AuthContext
      refreshUserData(result.avatarPath); // Kirim path avatar yang baru

      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: result.message,
        background: '#fbeaea',
        confirmButtonColor: 'hsl(330, 91%, 85%)',
        color: 'hsl(323, 70%, 30%)',
      });
      setSelectedAvatarFile(null);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: result.message,
        background: '#fbeaea',
        confirmButtonColor: 'hsl(330, 91%, 85%)',
        color: 'hsl(323, 70%, 30%)',
      });
      setPreviewAvatarUrl(null);
    }
  };

  return {
    user, // Sekarang user datang dari AuthContext
    loading: loading || authLoading, // Gabungkan status loading
    selectedAvatarFile,
    previewAvatarUrl,
    handleLogout,
    onAvatarChange,
    handleAvatarUpload,
  };
}