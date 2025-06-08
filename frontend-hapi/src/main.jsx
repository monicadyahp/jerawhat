import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'swiper/css';
import './assets/css/styles.css'; // CSS utama kamu

// Tidak perlu lagi import Workbox dari 'workbox-window' di sini
// Karena vite-plugin-pwa akan menginjeksikan kode registrasi Service Worker secara otomatis
// sesuai dengan konfigurasi 'injectRegister: 'auto'' di vite.config.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);