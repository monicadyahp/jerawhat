// frontend-hapi > src > mvp > presenters > useLoginPresenter.js

import { useState, useEffect, useMemo } from "react";
import LoginModel from "../models/LoginModel";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext'; // <--- Tambahkan ini untuk mengimpor useAuth

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Pastikan ini benar

export default function useLoginPresenter() {
  const model = useMemo(() => new LoginModel(API_BASE_URL), []); // <--- Pastikan LoginModel menerima API_BASE_URL jika diperlukan

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // <--- Dapatkan fungsi 'login' dari AuthContext

  useEffect(() => {
    // Scroll and header/scroll-up logic
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (header)
        header.classList.toggle("scroll-header", window.scrollY >= 50);
      const up = document.getElementById("scroll-up");
      if (up) up.classList.toggle("show-scroll", window.scrollY >= 460);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Hapus setTimeout jika tidak ada keperluan UI yang jelas untuk penundaan ini.
    // Penundaan 800ms bisa membuat pengalaman pengguna terasa lambat.
    // Jika tujuannya untuk animasi, pertimbangkan cara lain.
    // Untuk tujuan autentikasi, lebih baik langsung panggil model.login().
    // Contoh ini akan mempertahankan setTimeout, tetapi sarannya adalah untuk menghapusnya.
    setTimeout(async () => {
      const result = await model.login(email, password); // Memanggil metode login dari LoginModel

      setLoading(false);

      if (result.success) {
        // Data yang akan disimpan di localStorage dan AuthContext
        const userDataToStore = {
          ...result.user,
          token: result.token.trim()
        };

        // Panggil fungsi 'login' dari AuthContext
        // Ini akan menyimpan 'user' ke state global AuthContext
        // DAN juga menyimpan ke localStorage (seperti yang didefinisikan di AuthContext.jsx)
        login(userDataToStore); // <--- INI PENTING! Ganti localStorage.setItem yang lama

        // window.dispatchEvent(new Event('loginStatusUpdated')); // Ini mungkin tidak lagi diperlukan jika Anda mengandalkan useAuth

        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil!',
          text: 'Selamat datang kembali!',
          background: '#fbeaea',
          confirmButtonColor: 'hsl(330, 91%, 85%)',
          color: 'hsl(323, 70%, 30%)',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate("/profile"); // <--- Arahkan ke halaman profil ("/profile") setelah login berhasil        
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal!',
          text: result.message,
          background: '#fbeaea',
          confirmButtonColor: 'hsl(330, 91%, 85%)',
          color: 'hsl(323, 70%, 30%)',
          confirmButtonText: 'Coba Lagi'
        });
      }
    }, 800); // Penundaan 800ms
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    email,
    password,
    loading,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    scrollToTop,
  };
}