// frontend-hapi > src > views > LoginView.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LoginView({
  email,
  password,
  // status, // Hapus prop status
  loading,
  onEmailChange,
  onPasswordChange,
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
                <div className="home__group reveal-from-bottom">
                  <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105267/login_qp4aom.png" alt="" className="home__img" />
                  <div className="home__indicator"></div>
                  <div className="home__details-img">
                    <h4 className="home__details-title">Mulai login sekarang!</h4>
                    <span className="home__details-subtitle">
                      Cek wajahmu dan temukan solusinya.
                    </span>
                  </div>
                </div>
                <div className="home__data reveal-from-bottom">
                  <h3 className="home__subtitle">Mari login sekarang!</h3>
                  <h1 className="home__title">Login</h1>
                  <div className="login__container">
                    <form className="login__form" onSubmit={onSubmit}>
                      <div className="login__group">
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
                      <div className="login__group">
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
                      <button type="submit" className="button login__button" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </form>
                    <p className="login__footer">
                      Belum punya akun? <Link to="/register">Register</Link>
                    </p>
                    {/* {status && <p style={{ marginTop: 10, color: "crimson" }}>{status}</p>} */}
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