// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import BackgroundMusic from './components/BackgroundMusic'; // Import komponen musik Anda

function App() {
  return (
    <BrowserRouter>
      {/* Komponen musik diletakkan di sini. */}
      {/* Ini akan memastikan BackgroundMusic selalu ada dan aktif */}
      {/* di seluruh aplikasi, tidak peduli rute mana yang sedang aktif. */}
      <BackgroundMusic />
      
      {/* AppRoutes akan menangani semua rute dan tampilan spesifik */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;