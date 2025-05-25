// src/mvp/presenters/useScanLandingPresenter.js

import { useEffect, useState } from 'react';
import ScanLandingModel from '../models/ScanLandingModel';

export default function useScanLandingPresenter() {
  const [contents, setContents] = useState(null);

  useEffect(() => {
    // Ambil data dari model
    const model = new ScanLandingModel();
    setContents(model.getScanLandingContents());

    // Scroll ke atas saat halaman dimuat
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Inisialisasi Swiper (jika ada class .home-swiper)
    import('swiper').then(({ default: Swiper }) => {
      new Swiper('.home-swiper', {
        spaceBetween: 30,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
      });
      new Swiper('.new-swiper', {
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 16,
      });
    });

    // Inisialisasi ScrollReveal
    import('scrollreveal').then(sr => {
      sr.default({ origin: 'top', distance: '60px', duration: 2500, delay: 400 })
        .reveal(`.home-swiper, .new-swiper, .newsletter__container`);
      sr.default().reveal(`.category__data, .habbit__content, .footer__content`, { interval: 100 });
      sr.default().reveal(`.about__data, .discount__img`, { origin: 'left' });
      sr.default().reveal(`.about__img, .discount__data`, { origin: 'right' });
    });

    // Toggle header background & scroll-up button
    const handleScroll = () => {
      // Scroll-header
      const header = document.getElementById('header');
      if (header)
        header.classList.toggle('scroll-header', window.scrollY >= 50);

      // Show/hide scroll-up
      const up = document.getElementById('scroll-up');
      if (up)
        up.classList.toggle('show-scroll', window.scrollY >= 460);
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Klik tombol scroll-up
  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { contents, scrollToTop };
}