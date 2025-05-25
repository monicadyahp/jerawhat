// src/containers/Article3Container.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Article3View from "../views/Article3View";
import useArticle3Presenter from "../mvp/presenters/useArticle3Presenter";

export default function Article3Container() {
  const { title, intros, foods, outros, scrollToTop, handleMulaiClick } = useArticle3Presenter(); // Add handleMulaiClick

  return (
    <>
      <Header />
      <Article3View
        title={title}
        intros={intros}
        foods={foods}
        outros={outros}
        scrollToTop={scrollToTop}
        handleMulaiClick={handleMulaiClick} // Pass handleMulaiClick
      />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}