// src/containers/Article2Container.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Article2View from "../views/Article2View";
import useArticle2Presenter from "../mvp/presenters/useArticle2Presenter";

export default function Article2Container() {
  const { title, intro, benefits, outro, scrollToTop } = useArticle2Presenter();

  return (
    <>
      <Header />
      <Article2View
        title={title}
        intro={intro}
        benefits={benefits}
        outro={outro}
        scrollToTop={scrollToTop}
      />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}