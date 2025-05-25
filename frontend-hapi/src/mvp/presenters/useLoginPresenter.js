// frontend-hapi > src > mvp > presenters > useLoginPresenter.js

import { useState, useEffect, useMemo } from "react"; // Pastikan useMemo diimport
import LoginModel from "../models/LoginModel";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function useLoginPresenter() {
  const model = useMemo(() => new LoginModel(), []); // Pastikan model stabil

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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

    setTimeout(async () => {
      const result = await model.login(email, password);

      setLoading(false);

      if (result.success) {
        const userDataToStore = {
            ...result.user,
            token: result.token.trim() // <--- TAMBAHKAN .trim() DI SINI JUGA
        };
        localStorage.setItem("user", JSON.stringify(userDataToStore));

        window.dispatchEvent(new Event('loginStatusUpdated'));

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
          navigate("/profile");
        });
      } else {
        // Jika model mengembalikan success: false
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal!',
          text: result.message, // result.message sudah berisi pesan error dari model
          background: '#fbeaea',
          confirmButtonColor: 'hsl(330, 91%, 85%)',
          color: 'hsl(323, 70%, 30%)',
          confirmButtonText: 'Coba Lagi'
        });
      }
    }, 800);
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