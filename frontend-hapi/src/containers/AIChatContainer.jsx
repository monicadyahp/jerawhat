// src/containers/AIChatContainer.jsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AIChatView from "../views/AIChatView";
import useAIChatPresenter from "../mvp/presenters/useAIChatPresenter";

export default function AIChatContainer() {
  const presenterProps = useAIChatPresenter();

  // Pastikan useEffect DI LUAR return, dan penulisannya benar!
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <AIChatView {...presenterProps} />
      <Footer />
    </>
  );
}