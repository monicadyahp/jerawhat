// src/views/RegisterView.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function RegisterView({
  name,
  email,
  password,
  confirmPassword,
  // status, // Hapus prop status
  loading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPassChange,
  onSubmit,
  scrollToTop,
}) {
  return (
    <>
      <section className="home container" id="home">
        <div className="swiper home-swiper">
          <div className="swiper-wrapper">
            <section className="swiper-slide">
              <div className="home__content grid">

                {/* Kiri: Ilustrasi */}
                <div className="home__group reveal-from-bottom">
                  <img
                    src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105266/register_tlzhv8.png"
                    alt="Ilustrasi"
                    className="home__img"
                  />
                  <div className="home__indicator"></div>
                  <div className="home__details-img">
                    <h4 className="home__details-title">Gabung Sekarang!</h4>
                    <span className="home__details-subtitle">
                      Daftar akun untuk mulai mendapatkan solusi kulitmu.
                    </span>
                  </div>
                </div>

                {/* Kanan: Form Register */}
                <div className="home__data reveal-from-bottom">
                  <h3 className="home__subtitle">Buat akun baru</h3>
                  <h1 className="home__title">Registrasi</h1>

                  <div className="register__container">
                    <form className="register__form" onSubmit={onSubmit}>

                      <div className="register__group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Masukkan nama lengkap"
                          value={name}
                          onChange={onNameChange}
                          required
                        />
                      </div>

                      <div className="register__group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Masukkan email"
                          value={email}
                          onChange={onEmailChange}
                          required
                        />
                      </div>

                      <div className="register__group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Masukkan password"
                          value={password}
                          onChange={onPasswordChange}
                          required
                        />
                      </div>

                      <div className="register__group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          placeholder="Konfirmasi password"
                          value={confirmPassword}
                          onChange={onConfirmPassChange}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="button register__button"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Register"}
                      </button>
                    </form>

                    <p className="register__footer">
                      Sudah punya akun? <Link to="/login">Login</Link>
                    </p>
                    
                    {/* {status && (
                      <p style={{ marginTop: 10, color: status.includes("berhasil") ? "green" : "crimson" }}>
                        {status}
                      </p>
                    )} */}
                    {/* Hapus baris di atas karena status akan ditangani SweetAlert */}
                  </div>
                </div>

              </div>
            </section>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>

      <a href="#" className="scrollup" id="scroll-up" onClick={scrollToTop}>
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}