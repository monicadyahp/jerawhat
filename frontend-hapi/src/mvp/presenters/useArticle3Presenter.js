// src/mvp/presenters/useArticle3Presenter.js
import { useEffect, useState } from "react";
import Article3Model from "../models/Article3Model";

export default function useArticle3Presenter() {
  const [title, setTitle] = useState("");
  const [intros, setIntros] = useState([]);
  const [foods, setFoods] = useState([]);
  const [outros, setOutros] = useState([]);

  useEffect(() => {
    const model = new Article3Model();
    setTitle(model.getTitle());
    setIntros(model.getIntros());
    setFoods(model.getFoods());
    setOutros(model.getOutros());

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

  return { title, intros, foods, outros, scrollToTop };
}