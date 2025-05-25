// src/mvp/presenters/useArticlePresenter.js
import { useEffect, useState } from 'react';
import ArticleModel from '../models/ArticleModel';

export default function useArticlePresenter() {
  const [intro, setIntro] = useState({ title: '', desc: '' });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const model = new ArticleModel();
    setIntro(model.getIntro());
    setArticles(model.getArticles());

    // scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // toggle scroll-up button
    const onScroll = () => {
      const btn = document.getElementById('scroll-up');
      if (window.scrollY >= 460) btn.classList.add('show-scroll');
      else btn.classList.remove('show-scroll');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { intro, articles, scrollToTop };
}