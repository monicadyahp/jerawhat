// src/containers/LoginContainer.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginView from "../views/LoginView";
import useLoginPresenter from "../mvp/presenters/useLoginPresenter"; // Sudah benar

export default function LoginContainer() {
  const presenterProps = useLoginPresenter();

  return (
    <>
      <Header />
      <LoginView {...presenterProps} /> {/* LoginView akan menerima props dari presenter */}
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}