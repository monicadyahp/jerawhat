// src/views/OurMissionView.jsx
import React from "react";

export default function OurMissionView({ title, missionPoints, scrollToTop }) {
  return (
    <>
      <section className="section" id="our-mission">
        <div className="container">
          <h2 className="section__title reveal-from-bottom">{title}</h2>
          <div className="mission__container reveal-from-bottom">
            {missionPoints.map((m, i) => (
              <div key={i} className="mission__card">
                <h3 className="mission__card-title">{m.title}</h3>
                <p className="mission__card-text">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll Up Button */}
      <a
        href="#"
        id="scroll-up"
        className="scrollup"
        onClick={scrollToTop}
      >
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}