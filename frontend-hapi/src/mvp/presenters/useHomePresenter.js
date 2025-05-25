import { useEffect, useState } from 'react';
import HomeModel from '../models/HomeModel';

export default function useHomePresenter() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // ambil data slide
    const model = new HomeModel();
    setSlides(model.getSlides());

    // init Swiper
    import('swiper').then(({ default: Swiper }) => {
      // Modifikasi di sini: Tambahkan autoplay untuk .home-swiper
      new Swiper('.home-swiper', {
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: { // Tambahkan blok autoplay ini
          delay: 2000, // Geser setiap 2000ms (2 detik)
          disableOnInteraction: false, // Lanjutkan autoplay meskipun pengguna berinteraksi
        },
      });
      new Swiper('.new-swiper', { centeredSlides: true, slidesPerView: 'auto', loop: true, spaceBetween: 16 });
    });

    // init ScrollReveal
    import('scrollreveal').then(sr => {
      sr.default({ origin: 'top', distance: '60px', duration: 2500, delay: 400 })
        .reveal(`.home-swiper, .new-swiper, .newsletter__container`);
      sr.default().reveal(`.category__data, .habbit__content, .footer__content`, { interval: 100 });
      sr.default().reveal(`.about__data, .discount__img`, { origin: 'left' });
      sr.default().reveal(`.about__img, .discount__data`, { origin: 'right' });
    });

    // scroll-header & scroll-up
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header)
        header.classList.toggle('scroll-header', window.scrollY >= 50);
      const up = document.getElementById('scroll-up');
      if (up) up.classList.toggle('show-scroll', window.scrollY >= 460);
    };
    window.addEventListener('scroll', handleScroll);

    // menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const showMenu = () => navMenu.classList.add('show-menu');
    const hideMenu = () => navMenu.classList.remove('show-menu');
    if (navToggle) navToggle.addEventListener('click', showMenu);
    if (navClose) navClose.addEventListener('click', hideMenu);

    // close on link click
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => link.addEventListener('click', hideMenu));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navToggle) navToggle.removeEventListener('click', showMenu);
      if (navClose) navClose.removeEventListener('click', hideMenu);
      navLinks.forEach(link => link.removeEventListener('click', hideMenu));
    };
  }, []);

  return { slides };
}