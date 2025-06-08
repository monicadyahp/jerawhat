// src/mvp/presenters/useRegisterPresenter.js
import { useState, useEffect } from "react";
import RegisterModel from "../models/RegisterModel";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function useRegisterPresenter() {
  const model = new RegisterModel();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const onScroll = () => {
      const header = document.getElementById("header");
      if (header)
        header.classList.toggle("scroll-header", window.scrollY >= 50);
      const up = document.getElementById("scroll-up");
      if (up) up.classList.toggle("show-scroll", window.scrollY >= 460);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onConfirmPassChange = (e) => setConfirmPass(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      const result = await model.register({
        name,
        email,
        password,
        confirmPassword,
      });
      setLoading(false);

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registrasi Berhasil!',
          text: 'Anda sekarang bisa login.',
          background: '#fbeaea', // Warna pink pastel dari CSS Anda
          confirmButtonColor: 'hsl(330, 91%, 85%)', // --first-color
          color: 'hsl(323, 70%, 30%)', // --title-color
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPass("");
          navigate("/login"); // Redirect ke halaman login setelah registrasi sukses
        });
      } else {
        // Tampilkan pesan error dari result.message
        // result.message sekarang akan langsung berisi string pesan yang spesifik
        const errorMessage = result.message; 
        Swal.fire({
          icon: 'error',
          title: 'Registrasi Gagal!',
          text: errorMessage, // Pesan error yang lebih spesifik
          background: '#fbeaea', // Warna pink pastel
          confirmButtonColor: 'hsl(330, 91%, 85%)', // --first-color
          color: 'hsl(323, 70%, 30%)', // --title-color
          confirmButtonText: 'Coba Lagi'
        });
      }
    }, 800); // Simulasi loading
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    loading,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPassChange,
    onSubmit,
    scrollToTop,
  };
}