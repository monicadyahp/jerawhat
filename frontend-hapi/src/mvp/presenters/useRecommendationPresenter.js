// frontend-hapi > src > mvp > presenters > useRecommendationPresenter.js
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import RecommendationModel from '../models/RecommendationModel';

export default function useRecommendationPresenter() {
  const model = useMemo(() => new RecommendationModel(), []);
  const location = useLocation(); // Untuk membaca query parameter dari URL
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentConditions, setCurrentConditions] = useState([]); // Kondisi yang sedang direkomendasikan

  useEffect(() => {
    // Ambil kondisi dari URL query parameter
    // Contoh URL: /rekomendasi?conditions=jerawat_parah,kulit_berminyak
    const params = new URLSearchParams(location.search);
    const conditionsParam = params.get('conditions'); // "jerawat_parah,kulit_berminyak"
    
    let conditionsArray = [];
    if (conditionsParam) {
      conditionsArray = conditionsParam.split(',').map(c => c.trim());
    } else {
      // Default jika tidak ada query param, misalnya rekomendasi umum
      conditionsArray = ['semua_jenis_kulit']; // Atau biarkan kosong dan model akan mengembalikan default
    }

    setCurrentConditions(conditionsArray); // Simpan kondisi yang aktif

    const fetchRecommendations = async () => {
      setLoading(true);
      const recommendations = model.getRecommendationsByCondition(conditionsArray);
      setRecommendedProducts(recommendations);
      setLoading(false);
    };

    fetchRecommendations();

    // Scroll to top and handle header/scroll-up (boilerplate)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header) header.classList.toggle('scroll-header', window.scrollY >= 50);
      const up = document.getElementById('scroll-up');
      if (up) up.classList.toggle('show-scroll', window.scrollY >= 460);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.search, model]); // Bergantung pada location.search untuk memicu ulang saat param berubah

  return {
    recommendedProducts,
    loading,
    currentConditions,
  };
}