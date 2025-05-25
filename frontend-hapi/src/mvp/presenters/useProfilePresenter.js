// frontend-hapi > src > mvp > presenters > useProfilePresenter.js
import { useState, useEffect, useCallback, useMemo } from 'react'; // Tambahkan useMemo
import ProfileModel from '../models/ProfileModel';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function useProfilePresenter() {
  // Gunakan useMemo untuk memastikan instance model hanya dibuat sekali
  // dan tidak berubah pada setiap render kecuali dependencies-nya berubah.
  // Dalam kasus ini, model tidak punya dependencies, jadi dia akan stabil.
  const model = useMemo(() => new ProfileModel(), []); // <-- PERUBAHAN KRUSIAL DI SINI

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const navigate = useNavigate();

  // useEffect untuk memuat data profil dan event listener
  useEffect(() => {
    const userData = model.getUserData(); // model sekarang stabil
    if (userData) {
      setUser(userData);
    } else {
      // Periksa apakah sudah di halaman login, agar tidak terjadi redirect loop
      // saat misalnya token kadaluwarsa saat berada di halaman login itu sendiri
      if (window.location.pathname !== '/login') {
        navigate('/login');
      } else {
        // Jika sudah di halaman login dan tidak ada user, cukup set loading ke false
        setLoading(false);
      }
    }
    // Hanya set loading ke false jika user ditemukan atau sudah di halaman login
    if (userData || window.location.pathname === '/login') {
        setLoading(false);
    }


    // Bagian untuk scroll-header dan scroll-up
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
  }, [model, navigate]); // model sekarang stabil, tidak akan memicu re-render tak terbatas

  // Fungsi untuk memuat ulang data user setelah upload avatar sukses
  const refreshUserData = useCallback(() => {
    const updatedUserData = model.getUserData();
    if (updatedUserData) {
      setUser(updatedUserData);
    }
  }, [model]); // model adalah dependency yang stabil

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
        localStorage.removeItem('user');

        // PENTING: Memicu event kustom setelah localStorage dihapus
        window.dispatchEvent(new Event('loginStatusUpdated')); // <-- Tambahkan baris ini

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
    setSelectedAvatarFile(e.target.files[0]);
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
      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: result.message,
        background: '#fbeaea',
        confirmButtonColor: 'hsl(330, 91%, 85%)',
        color: 'hsl(323, 70%, 30%)',
      });
      refreshUserData(); // Panggil fungsi refreshUserData
      setSelectedAvatarFile(null); // Reset file yang dipilih
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: result.message,
        background: '#fbeaea',
        confirmButtonColor: 'hsl(330, 91%, 85%)',
        color: 'hsl(323, 70%, 30%)',
      });
    }
  };

  return {
    user,
    loading,
    selectedAvatarFile,
    handleLogout,
    onAvatarChange,
    handleAvatarUpload,
  };
}