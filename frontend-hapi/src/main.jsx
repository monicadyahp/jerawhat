import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'swiper/css';
import './assets/css/styles.css'; // CSS utama kamu

// Jika kamu pakai JS eksternal seperti ScrollReveal dan Swiper, inisialisasi di dalam App.jsx atau di sini
// Tapi karena kita sudah masukkan di useEffect di App.jsx, jadi cukup di sini saja

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);