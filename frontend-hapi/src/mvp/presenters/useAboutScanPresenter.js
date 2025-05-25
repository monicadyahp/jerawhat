// src/mvp/presenters/useAboutScanPresenter.js
import { useEffect, useState } from 'react';
import AboutScanModel from '../models/AboutScanModel';

export default function useAboutScanPresenter() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // load data
    const model = new AboutScanModel();
    setBlocks(model.getBlocks());

    // scroll-to-top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // ScrollReveal init
    import('scrollreveal').then(sr => {
      sr.default().reveal('.reveal-from-bottom', {
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out',
        reset: false
      });
    });

    // scroll-up button toggle
    const handleScrollUp = () => {
      const up = document.getElementById('scroll-up');
      if (window.scrollY >= 460) up.classList.add('show-scroll');
      else up.classList.remove('show-scroll');
    };
    window.addEventListener('scroll', handleScrollUp);

    return () => window.removeEventListener('scroll', handleScrollUp);
  }, []);

  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { blocks, scrollToTop };
}