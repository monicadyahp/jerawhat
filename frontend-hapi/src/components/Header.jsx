// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localStorageChange, setLocalStorageChange] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
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

  const toggleMenu = () => setMenuOpen(v => !v);
  const closeMenu = () => setMenuOpen(false);

  const scanPaths = ["/scanlanding", "/login", "/register", "/scan"];
  const isScanActive = scanPaths.includes(location.pathname);
  const isArticleDetail = location.pathname.startsWith("/article-");

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
              <NavLink
                to={isLoggedIn ? "/scan" : "/scanlanding"}
                className={({ isActive }) => 'nav__link' + ((isActive || isScanActive) ? ' active-link' : '')}
                onClick={closeMenu}
              >
                Scan
              </NavLink>
            </li>

            {isLoggedIn && (
              <li className="nav__item">
                <NavLink to="/profile" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Profile</NavLink>
              </li>
            )}
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