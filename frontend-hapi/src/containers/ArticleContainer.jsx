// src/containers/ArticleContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useArticlePresenter from '../mvp/presenters/useArticlePresenter';
import ArticleView from '../views/ArticleView';

export default function ArticleContainer() {
  const { intro, articles, scrollToTop } = useArticlePresenter();

  return (
    <>
      <Header />
      <ArticleView
        intro={intro}
        articles={articles}
        scrollToTop={scrollToTop}
      />
      <Footer />
    </>
  );
}