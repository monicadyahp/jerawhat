// src/containers/AboutTeamContainer.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutTeamView from "../views/AboutTeamView";
import useAboutTeamPresenter from "../mvp/presenters/useAboutTeamPresenter";

export default function AboutTeamContainer() {
  const presenterProps = useAboutTeamPresenter();

  return (
    <>
      <Header />
      <AboutTeamView {...presenterProps} />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}