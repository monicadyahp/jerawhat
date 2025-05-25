// src/views/Article1View.jsx
import React from 'react';
// Hapus Link dari sini jika tombol "Mulai" hanya akan menggunakan onClick
// Jika ada Link lain di view ini, tetap biarkan Link diimpor
import { Link } from 'react-router-dom';


export default function Article1View({ tips, handleMulaiClick }) { // Terima handleMulaiClick
  return (
    <section className="section article-detail" id="article-detail">
      <div className="container">
        <h2 className="section__title reveal-from-bottom">
          Tips Merawat Kulit Wajah agar Tetap Sehat
        </h2>

        <div className="article__content reveal-from-bottom">
          <p>
            Perawatan kulit wajah yang tepat dan konsisten sangat memegang
            peranan penting dalam menjaga kesehatan serta meningkatkan
            kecantikan alami kulit Anda. Dengan memperhatikan cara membersihkan,
            melembapkan, dan melindungi kulit setiap hari, Anda dapat mencegah
            berbagai masalah kulit seperti jerawat, kusam, dan penuaan dini.
            Tidak hanya itu, perawatan yang tepat juga membantu kulit tetap
            segar, elastis, dan bercahaya, sehingga Anda selalu tampil
            percaya diri dan memancarkan pesona alami. Berikut ini beberapa
            langkah sederhana namun efektif yang bisa Anda terapkan untuk
            mendapatkan kulit wajah yang sehat dan indah setiap hari.
          </p>

          <section className="section about" id="about">
            <div className="about__container container grid">
              {tips.map((tip, idx) => (
                <div key={idx} className="habbit__content reveal-from-bottom">
                  <img
                    src={tip.img}
                    alt={tip.title}
                    className="habbit__img"
                  />
                  <h3 className="habbit__title">{tip.title}</h3>
                  <span className="habbit__subtitle">{tip.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Scan - Modifikasi di sini */}
          <section className="section scan">
            <div className="scan__container container grid">
              <div className="scan reveal-from-bottom">
                <h2 className="scan__title">Scan Kulit Wajahmu</h2>
                {/* Ganti Link dengan button dan gunakan onClick handler */}
                <button type="button" className="button" onClick={handleMulaiClick}>
                  Mulai
                </button>
              </div>
              <img
                src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/scan-img_ju8xb5.png"
                alt=""
                className="scan__img reveal-from-bottom"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}