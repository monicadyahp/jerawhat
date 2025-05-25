// src/views/ArticleView.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleView({ intro, articles, scrollToTop }) {
  return (
    <>
      {/* Intro */}
      <section className="section article" id="article">
        <div className="container">
          <h2 className="section__title reveal-from-bottom">{intro.title}</h2>
          <p className="article__intro reveal-from-bottom">{intro.desc}</p>
        </div>
      </section>

      {/* List Artikel */}
      {articles.map((a, i) => (
        <section key={i} className="section about" id="about">
          <div className="about__container container grid">
            <div className="about__data">
              <h2 className="section__title about__title reveal-from-bottom">
                {a.title}
              </h2>
              <p className="about__description reveal-from-bottom">{a.desc}</p>
              <Link to={`/${a.id}`} className="button">
                Baca Artikel
              </Link>
            </div>
            <img src={a.img} alt="" className="about__img" />
          </div>
        </section>
      ))}

      {/* Scroll Up Button */}
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