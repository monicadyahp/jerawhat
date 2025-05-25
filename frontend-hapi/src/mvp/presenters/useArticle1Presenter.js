// src/mvp/presenters/useArticle1Presenter.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Article1Model from '../models/Article1Model';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

export default function useArticle1Presenter() {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const { user, loading } = useAuth(); // Dapatkan user dan loading dari AuthContext

  useEffect(() => {
    // load tips dari model
    const model = new Article1Model();
    setTips(model.getTips());

    // scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // toggle scroll-up button
    const handleScroll = () => {
      const btn = document.getElementById('scroll-up');
      if (btn) { // Periksa keberadaan elemen sebelum menambahkan atau menghapus kelas
        btn.classList.toggle('show-scroll', window.scrollY >= 460);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fungsi baru untuk menangani klik tombol "Mulai" di CTA Scan
  const handleMulaiClick = () => {
    if (loading) {
      // Jika status autentikasi masih loading, jangan lakukan apa-apa
      return;
    }

    if (user) { // Jika user sudah login (user tidak null)
      navigate('/scan'); // Arahkan ke halaman ScanView.jsx
    } else { // Jika user belum login
      navigate('/scanlanding'); // Arahkan ke halaman ScanLandingView.jsx
    }
  };

  return { tips, scrollToTop, handleMulaiClick }; // Tambahkan handleMulaiClick ke return
}