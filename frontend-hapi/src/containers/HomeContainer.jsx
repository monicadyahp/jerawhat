import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeView from '../views/HomeView';
import useHomePresenter from '../mvp/presenters/useHomePresenter';

export default function HomeContainer() {
  const { slides } = useHomePresenter();

  const scrollToTop = e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); };

  return (
    <>
      <Header />
      <HomeView slides={slides} />
      <Footer />
      <a href="#" id="scroll-up" className="scrollup" onClick={scrollToTop}>
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}