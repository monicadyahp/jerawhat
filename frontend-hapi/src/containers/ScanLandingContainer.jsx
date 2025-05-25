// src/containers/ScanLandingContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScanLandingView from '../views/ScanLandingView';
import useScanLandingPresenter from '../mvp/presenters/useScanLandingPresenter';

export default function ScanLandingContainer() {
  const { contents, scrollToTop } = useScanLandingPresenter();

  return (
    <>
      <Header />
      <ScanLandingView contents={contents} scrollToTop={scrollToTop} />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}