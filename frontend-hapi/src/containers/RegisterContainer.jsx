// src/containers/RegisterContainer.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterView from "../views/RegisterView";
import useRegisterPresenter from "../mvp/presenters/useRegisterPresenter";

export default function RegisterContainer() {
  const presenterProps = useRegisterPresenter();

  return (
    <>
      <Header />
      <RegisterView {...presenterProps} />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}