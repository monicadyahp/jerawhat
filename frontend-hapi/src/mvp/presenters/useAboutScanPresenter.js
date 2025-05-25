// src/mvp/presenters/useAboutScanPresenter.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AboutScanModel from '../models/AboutScanModel';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

export default function useAboutScanPresenter() {
  const [blocks, setBlocks] = useState([]);
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const { user, loading } = useAuth(); // Dapatkan user dan loading dari AuthContext

  useEffect(() => {
    // load data
    const model = new AboutScanModel();
    setBlocks(model.getBlocks());

    // scroll-to-top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // ScrollReveal init
    import('scrollreveal').then(sr => {
      sr.default().reveal('.reveal-from-bottom', {
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out',
        reset: false
      });
    });

    // scroll-up button toggle
    const handleScrollUp = () => {
      const up = document.getElementById('scroll-up');
      if (up) { // Periksa keberadaan elemen sebelum menambahkan atau menghapus kelas
        if (window.scrollY >= 460) up.classList.add('show-scroll');
        else up.classList.remove('show-scroll');
      }
    };
    window.addEventListener('scroll', handleScrollUp);

    return () => window.removeEventListener('scroll', handleScrollUp);
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

  return { blocks, scrollToTop, handleMulaiClick }; // Tambahkan handleMulaiClick ke return
}