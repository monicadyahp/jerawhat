// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer section">
    <div className="footer__container container grid">

      {/* Logo & sosial */}
      <div className="footer__content">
        <Link to="/" className="footer__logo">
          <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/logo_qcvmzx.png" alt="logo" className="footer__logo-img" />
          JeraWHAT?!
        </Link>
        <p className="footer__description">
        A collaborative project crafted by Capstone Team CC25-CF146 at Coding Camp.
        </p>
        <div className="footer__social">
          <a href="https://facebook.com"     className="footer__social-link"><i className='bx bxl-facebook'></i></a>
          <a href="https://instagram.com"    className="footer__social-link"><i className='bx bxl-instagram-alt'></i></a>
          <a href="https://twitter.com"      className="footer__social-link"><i className='bx bxl-twitter'></i></a>
        </div>
      </div>

      {/* Kolom 1: Pages */}
      <div className="footer__content">
        <h3 className="footer__title">Pages</h3>
        <ul className="footer__links">
          <li><Link to="/"            className="footer__link">Home</Link></li>
          <li><Link to="/about-scan"  className="footer__link">About Scan</Link></li>
          <li><Link to="/article"     className="footer__link">Article</Link></li>
        </ul>
      </div>

      {/* Kolom 2: Tentang Kami */}
      <div className="footer__content">
        <h3 className="footer__title">About Us</h3>
        <ul className="footer__links">
          <li><Link to="/about-team" className="footer__link">Team Profile</Link></li>
          <li><Link to="/our-mission" className="footer__link">Our Mission</Link></li>
          {/* Buat juga halaman /our-mission jika diperlukan */}
        </ul>
      </div>

      {/* Kolom 3: Lain‐lain atau Help */}
      <div className="footer__content">
        <h3 className="footer__title">Support</h3>
        <ul className="footer__links">
          <li><Link to="/contact-us"   className="footer__link">Contact Us</Link></li>
        </ul>
      </div>

    </div>

    <span className="footer__copy">© JeraWHAT?! 2025 All rights reserved</span>
    <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105258/footer1-img_m1cpa6.png" alt="" className="footer__img-one" />
    <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105259/footer2-img_ypz0c8.png" alt="" className="footer__img-two" />
  </footer>
);

export default Footer;