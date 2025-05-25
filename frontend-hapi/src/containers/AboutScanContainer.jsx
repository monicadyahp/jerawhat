// src/containers/AboutScanContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutScanView from '../views/AboutScanView';
import useAboutScanPresenter from '../mvp/presenters/useAboutScanPresenter';

export default function AboutScanContainer() {
  const { blocks, scrollToTop } = useAboutScanPresenter();

  return (
    <>
      <Header />
      <AboutScanView blocks={blocks} scrollToTop={scrollToTop} />
      <Footer />
    </>
  );
}