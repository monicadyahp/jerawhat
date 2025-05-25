// src/views/ScanLandingView.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ScanLandingView({ contents, scrollToTop }) {
  if (!contents) return null;

  const { hero, callToAction } = contents;

  return (
    <>
      <section className="home container" id="home">
        <div className="swiper home-swiper">
          <div className="swiper-wrapper">
            <section className="swiper-slide">
              <div className="home__content grid">
                <div className="home__group">
                  <img src={hero.img} alt="" className="home__img" />
                  <div className="home__indicator"></div>
                  <div className="home__details-img">
                    <h4 className="home__details-title">{hero.title}</h4>
                    <span className="home__details-subtitle">
                      {hero.subtitle}
                    </span>
                  </div>
                </div>
                <div className="home__data">
                  <h3 className="home__subtitle">{callToAction.subtitle}</h3>
                  <h1 className="home__title">
                    {callToAction.title.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>{line}<br /></React.Fragment>
                    ))}
                  </h1>
                  <p className="home__description">
                    {callToAction.description}
                  </p>
                  <div className="home__buttons">
                    <Link to={callToAction.button.link} className="button">
                      {callToAction.button.text}
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
    </>
  );
}