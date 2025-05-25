// src/views/AboutScanView.jsx
import React from 'react';
// Hapus Link dari sini jika tombol "Mulai" hanya akan menggunakan onClick
// Jika ada Link lain di view ini, tetap biarkan Link diimpor
import { Link } from 'react-router-dom';


export default function AboutScanView({ blocks, scrollToTop, handleMulaiClick }) { // Terima handleMulaiClick
  return (
    <>
      {blocks.map((b, i) => (
        <section
          key={i}
          className="section about reveal-from-bottom"
          id="about"
        >
          <div className="about__container container grid">
            {b.reverse && <img src={b.img} alt={b.title} className="about__img" />}
            <div className="about__data">
              <h2 className="section__title about__title">{b.title}</h2>
              <p className="about__description">{b.description}</p>
            </div>
            {!b.reverse && <img src={b.img} alt={b.title} className="about__img" />}
          </div>
        </section>
      ))}

      {/* CTA Scan - Modifikasi di sini */}
      <section className="section scan reveal-from-bottom">
        <div className="scan__container container grid">
          <div className="scan">
            <h2 className="scan__title">Scan Kulit Wajahmu</h2>
            {/* Ganti Link dengan button dan gunakan onClick handler */}
            <button type="button" className="button" onClick={handleMulaiClick}>
              Mulai
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/scan-img_ju8xb5.png"
            alt="scan"
            className="scan__img"
          />
        </div>
      </section>

      {/* Scroll Up Button */}
      <a
        href="#"
        className="scrollup"
        id="scroll-up"
        onClick={scrollToTop}
      >
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}