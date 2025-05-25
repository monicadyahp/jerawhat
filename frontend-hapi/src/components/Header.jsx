// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Penting: Import useAuth

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Dapatkan user dan loading dari AuthContext
  // user akan berupa objek jika login, null jika tidak
  // loading akan true saat AuthContext sedang memeriksa localStorage
  const { user, loading } = useAuth();
  const isLoggedIn = !!user; // Menentukan status login: true jika user ada, false jika null

  // Hapus semua useEffect dan state terkait isLoggedIn lokal yang lama
  // karena sekarang kita mengandalkan useAuth secara penuh.
  /*
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user'); // Ini sebelumnya sumber masalah: membaca kunci 'user'
      setIsLoggedIn(!!user);
    };

    checkLoginStatus();

    const handleStorageChange = () => {
        checkLoginStatus();
        setLocalStorageChange(prev => prev + 1);
    };
    window.addEventListener('storage', handleStorageChange);

    const handleLoginStatusUpdate = () => {
        checkLoginStatus();
        setLocalStorageChange(prev => prev + 1);
    };
    window.addEventListener('loginStatusUpdated', handleLoginStatusUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('loginStatusUpdated', handleLoginStatusUpdate);
    };
  }, [localStorageChange]);
  */

  const toggleMenu = () => setMenuOpen(v => !v);
  const closeMenu = () => setMenuOpen(false);

  const scanPaths = ["/scanlanding", "/login", "/register", "/scan"];
  const isScanActive = scanPaths.includes(location.pathname);
  const isArticleDetail = location.pathname.startsWith("/article-");

  // Jika AuthContext masih memuat, kita bisa memutuskan untuk tidak menampilkan menu
  // atau menampilkan menu tanpa status login yang final.
  // Dalam kasus header, biasanya kita tetap menampilkan struktur dasar.
  // Konten yang bergantung pada login akan disembunyikan secara kondisional.
  if (loading) {
      // Anda bisa mengembalikan null atau placeholder jika ingin header tidak muncul
      // sampai status loading selesai. Namun, ini bisa menyebabkan flicker.
      // Lebih baik biarkan conditional rendering di bawah yang bekerja.
      // console.log("Header: AuthContext still loading, conditional items might be hidden.");
  }


  return (
    <header className="header" id="header">
      <nav className="nav container">
        <div className="nav__logo">
          JeraWHAT?!
        </div>
        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <i className="bx bx-grid-alt"></i>
        </div>
        <div className={`nav__menu ${menuOpen ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Home</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about-scan" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>About</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/article" className={({ isActive }) => 'nav__link' + ((isActive || isArticleDetail) ? ' active-link' : '')} onClick={closeMenu}>Article</NavLink>
            </li>

            <li className="nav__item">
              <NavLink to="/quiz" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Kuis</NavLink>
            </li>

            <li className="nav__item">
              <NavLink to="/maps" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Maps</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/ai-chat" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>AI Chat</NavLink>
            </li>

            {/* NEW: Menu Rekomendasi */}
            <li className="nav__item">
              <NavLink to="/rekomendasi" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Rekomendasi</NavLink>
            </li>

            <li className="nav__item">
              {/* Link Scan yang adaptif */}
              <NavLink
                to={isLoggedIn ? "/scan" : "/scanlanding"} // Tetap adaptif
                className={({ isActive }) => 'nav__link' + ((isActive || isScanActive) ? ' active-link' : '')}
                onClick={closeMenu}
              >
                Scan
              </NavLink>
            </li>

            {/* Tampilkan menu Profile HANYA jika sudah login dan AuthContext tidak sedang loading */}
            {!loading && isLoggedIn && (
              <li className="nav__item">
                <NavLink to="/profile" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Profile</NavLink>
              </li>
            )}
            {/* Hapus semua logika menu Login/Logout yang baru saya tambahkan sebelumnya */}
            {/* Tidak ada lagi tombol Logout tambahan di sini */}

          </ul>
          <div className="nav__close" id="nav-close" onClick={closeMenu}>
            <i className="bx bx-x"></i>
          </div>
          <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105258/detailjerawat1_h4lojo.png" alt="" className="nav__img" />
        </div>
      </nav>
    </header>
  );
};

export default Header;