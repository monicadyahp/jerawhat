// src/views/Article2View.jsx
import React from "react";
// Remove Link from here if the "Mulai" button will only use onClick
// If there are other Links in this view, keep Link imported
import { Link } from "react-router-dom";

export default function Article2View({ title, intro, benefits, outro, scrollToTop, handleMulaiClick }) { // Receive handleMulaiClick
  return (
    <section className="section article-detail" id="article-detail">
      <div className="container">
        <h2 className="section__title reveal-from-bottom">{title}</h2>
        <div className="article__content reveal-from-bottom">
          {intro.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}

          <section className="section about" id="about">
            <div className="about__container container grid">
              {benefits.map((b, idx) => (
                <div key={idx} className="habbit__content reveal-from-bottom">
                  <img src={b.img} alt={b.title} className="habbit__img" />
                  <h3 className="habbit__title">{b.title}</h3>
                  <span className="habbit__subtitle">{b.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="reveal-from-bottom">{outro}</p>
        </div>
      </div>

      {/* CTA SCAN - Modification here */}
      <section className="section scan">
        <div className="scan__container container grid">
          <div className="scan reveal-from-bottom">
            <h2 className="scan__title">Scan Kulit Wajahmu</h2>
            {/* Replace Link with button and use onClick handler */}
            <button type="button" className="button" onClick={handleMulaiClick}>
              Mulai
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/scan-img_ju8xb5.png"
            alt=""
            className="scan__img reveal-from-bottom"
          />
        </div>
      </section>

      {/* Scroll Up Button */}
      <a
        href="#"
        className="scrollup"
        id="scroll-up"
        onClick={scrollToTop}
      >
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </section>
  );
}