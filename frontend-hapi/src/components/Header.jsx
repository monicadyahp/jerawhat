// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import notificationService from '../utils/notification'; // Path relatif yang sudah kita betulkan

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { user, loading } = useAuth();
  const isLoggedIn = !!user;

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [pushLoading, setPushLoading] = useState(true);

  useEffect(() => {
    async function checkPushStatus() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const swRegistration = await navigator.serviceWorker.ready;
          const subscription = await swRegistration.pushManager.getSubscription();
          setIsPushEnabled(!!subscription);
        } catch (error) {
          console.error("Failed to check push subscription status:", error);
        }
      }
      setPushLoading(false);
    }
    checkPushStatus();
  }, [user]);

  const handlePushToggle = async () => {
    setPushLoading(true);
    try {
      if (isPushEnabled) {
        await notificationService.unregisterPush();
        Swal.fire('Berhasil!', 'Push notification dinonaktifkan.', 'success');
      } else {
        await notificationService.registerPush();
        Swal.fire('Berhasil!', 'Push notification diaktifkan.', 'success');
      }
      setIsPushEnabled(!isPushEnabled);
    } catch (error) {
      Swal.fire('Gagal!', `Terjadi kesalahan: ${error.message}`, 'error');
      console.error('Push toggle error:', error);
    } finally {
      setPushLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header) header.classList.toggle('scroll-header', window.scrollY >= 50);
      const up = document.getElementById('scroll-up');
      if (up) up.classList.toggle('show-scroll', window.scrollY >= 460);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Yakin ingin keluar?',
      text: 'Anda akan keluar dari akun Anda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(330, 91%, 85%)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal',
      background: '#fbeaea',
      color: 'hsl(323, 70%, 30%)',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Keluar!',
          text: 'Anda telah berhasil keluar dari akun.',
          background: '#fbeaea',
          confirmButtonColor: 'hsl(330, 91%, 85%)',
          color: 'hsl(323, 70%, 30%)',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // window.location.reload(); // Atau ini untuk full reload jika diperlukan
          // Jika Anda ingin routing tanpa full reload:
          // navigate('/login'); // Pastikan Anda mengimpor useNavigate dari react-router-dom jika pakai ini
        });
      }
    });
  };

  const scanPaths = ["/scanlanding", "/login", "/register", "/scan"];
  const isScanActive = scanPaths.includes(location.pathname);
  const isArticleDetail = location.pathname.startsWith("/article-");

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          JeraWHAT?!
        </Link>

        {/* Tombol Hamburger (Menu Toggle) untuk Mobile */}
        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <i className="bx bx-grid-alt"></i>
        </div>

        <div className={`nav__menu ${menuOpen ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            {/* Menus for NOT LOGGED IN users */}
            {!loading && !isLoggedIn && (
              <>
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
                  <NavLink
                    to="/scanlanding"
                    className={({ isActive }) => 'nav__link' + ((isActive || isScanActive) ? ' active-link' : '')}
                    onClick={closeMenu}
                  >
                    Scan
                  </NavLink>
                </li>
              </>
            )}

            {/* Menus for LOGGED IN users */}
            {!loading && isLoggedIn && (
              <>


                <li className="nav__item nav__dropdown">
                  <span className={
                    'nav__link' + (isScanActive || location.pathname.startsWith('/scan/history') ? ' active-link' : '')
                  }>
                    Scan <i className="bx bx-chevron-down"></i>
                  </span>
                  <ul className="nav__dropdown-menu">
                    <li>
                      <NavLink
                        to="/scan"
                        className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')}
                        onClick={closeMenu}
                      >
                        Mulai Scan
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/scan/history"
                        className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')}
                        onClick={closeMenu}
                      >
                        Riwayat Scan
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav__item">
                  <NavLink to="/quiz" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Kuis</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to="/rekomendasi" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Rekomendasi</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to="/maps" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Maps</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to="/ai-chat" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>AI Chat</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to="/profile" className={({ isActive }) => 'nav__link' + (isActive ? ' active-link' : '')} onClick={closeMenu}>Profile</NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav__close" id="nav-close" onClick={closeMenu}>
            <i className="bx bx-x"></i>
          </div>
          <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105258/detailjerawat1_h4lojo.png" alt="" className="nav__img" />
        </div>

        {/* Kosongkan nav__btns karena tombol login/logout akan di dalam menu atau dihilangkan */}

      </nav>
    </header>
  );
};

export default Header;