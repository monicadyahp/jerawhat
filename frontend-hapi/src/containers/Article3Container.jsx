// src/containers/Article3Container.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Article3View from "../views/Article3View";
import useArticle3Presenter from "../mvp/presenters/useArticle3Presenter";

export default function Article3Container() {
  const { title, intros, foods, outros, scrollToTop } = useArticle3Presenter();

  return (
    <>
      <Header />
      <Article3View
        title={title}
        intros={intros}
        foods={foods}
        outros={outros}
        scrollToTop={scrollToTop}
      />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}