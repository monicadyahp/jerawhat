// src/mvp/presenters/useArticle1Presenter.js
import { useEffect, useState } from 'react';
import Article1Model from '../models/Article1Model';

export default function useArticle1Presenter() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    // load tips dari model
    const model = new Article1Model();
    setTips(model.getTips());

    // scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // toggle scroll-up button
    const handleScroll = () => {
      const btn = document.getElementById('scroll-up');
      btn.classList.toggle('show-scroll', window.scrollY >= 460);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { tips, scrollToTop };
}