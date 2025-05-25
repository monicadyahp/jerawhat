// src/containers/Article1Container.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Article1View from '../views/Article1View';
import useArticle1Presenter from '../mvp/presenters/useArticle1Presenter';

export default function Article1Container() {
  const { tips, scrollToTop, handleMulaiClick } = useArticle1Presenter(); // Add handleMulaiClick

  return (
    <>
      <Header />
      <Article1View tips={tips} handleMulaiClick={handleMulaiClick} /> {/* Pass handleMulaiClick */}
      <div className="reveal-from-bottom">
        <Footer />
      </div>
      <a
        href="#"
        className="scrollup"
        id="scroll-up"
        onClick={scrollToTop}
      >
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}