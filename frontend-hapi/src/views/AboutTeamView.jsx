// src/views/AboutTeamView.jsx
import React from 'react';

export default function AboutTeamView({ teamMembers, title, desc, scrollToTop }) {
  return (
    <>
      <section className="section about" id="about-team">
        <div className="container">
          <h2 className="section__title reveal-from-bottom">{title}</h2>
          <p className="about__description reveal-from-bottom">{desc}</p>

          <div className="team__container reveal-from-bottom">
            {teamMembers.map((m, idx) => (
              <div key={idx} className="team__card">
                <img src={m.img} alt={m.name} className="team__img" />
                <h3 className="team__name">{m.name}</h3>
                <span className="team__role">{m.role}</span>
                <span className="team__id">{m.id}</span>
                <span className="team__univ">{m.univ}</span>
                {m.linkedin && ( // Hanya tampilkan tombol jika ada URL LinkedIn
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link" // <--- UBAH DI SINI!
                  >
                    <i className="bx bxl-linkedin-square"></i> {/* Ikon Boxicons */}
                  </a>
                )}
              </div>
            ))}
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