// src/mvp/presenters/useArticle2Presenter.js
import { useEffect, useState } from "react";
import Article2Model from "../models/Article2Model";

export default function useArticle2Presenter() {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [outro, setOutro] = useState("");

  useEffect(() => {
    const model = new Article2Model();
    setTitle(model.getTitle());
    setIntro(model.getIntro());
    setBenefits(model.getBenefits());
    setOutro(model.getOutro());

    // Scroll ke atas saat halaman dimuat
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Show/hide scroll-up button
    const handleScrollUp = () => {
      const scrollUpEl = document.getElementById("scroll-up");
      if (window.scrollY >= 460) {
        scrollUpEl?.classList.add("show-scroll");
      } else {
        scrollUpEl?.classList.remove("show-scroll");
      }
    };
    window.addEventListener("scroll", handleScrollUp);
    return () => window.removeEventListener("scroll", handleScrollUp);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { title, intro, benefits, outro, scrollToTop };
}