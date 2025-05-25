import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactUsView from '../views/ContactUsView';
import { useContactPresenter } from '../mvp/presenters/useContactPresenter';

export default function ContactUsContainer() {
  const { name, message, status, onNameChange, onMessageChange, onSubmit } =
    useContactPresenter();

  // scroll‐up button & scroll‐to‐top logic
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const onScroll = () => {
      const btn = document.getElementById('scroll-up');
      window.scrollY >= 460
        ? btn.classList.add('show-scroll')
        : btn.classList.remove('show-scroll');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <ContactUsView
        name={name}
        message={message}
        status={status}
        onNameChange={onNameChange}
        onMessageChange={onMessageChange}
        onSubmit={onSubmit}
      />
      <Footer />
      <a href="#" id="scroll-up" className="scrollup" onClick={scrollToTop}>
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}