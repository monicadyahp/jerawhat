// src/containers/OurMissionContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OurMissionView from '../views/OurMissionView';
import useOurMissionPresenter from '../mvp/presenters/useOurMissionPresenter';

export default function OurMissionContainer() {
  const { title, missionPoints, scrollToTop } = useOurMissionPresenter();

  return (
    <>
      <Header />
      <OurMissionView
        title={title}
        missionPoints={missionPoints}
        scrollToTop={scrollToTop}
      />
      <Footer />
    </>
  );
}