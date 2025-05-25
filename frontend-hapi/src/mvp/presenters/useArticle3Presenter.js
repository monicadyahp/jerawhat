// src/mvp/presenters/useArticle3Presenter.js
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Article3Model from "../models/Article3Model";
import { useAuth } from '../../context/AuthContext'; // Import useAuth

export default function useArticle3Presenter() {
  const [title, setTitle] = useState("");
  const [intros, setIntros] = useState([]);
  const [foods, setFoods] = useState([]);
  const [outros, setOutros] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const { user, loading } = useAuth(); // Get user and loading from AuthContext

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
      if (scrollUpEl) { // Check if element exists before adding/removing class
        if (window.scrollY >= 460) {
          scrollUpEl.classList.add("show-scroll");
        } else {
          scrollUpEl.classList.remove("show-scroll");
        }
      }
    };
    window.addEventListener("scroll", handleScrollUp);
    return () => window.removeEventListener("scroll", handleScrollUp);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // New function to handle the "Mulai" button click in CTA Scan
  const handleMulaiClick = () => {
    if (loading) {
      // If authentication status is still loading, do nothing
      return;
    }

    if (user) { // If user is logged in (user is not null)
      navigate('/scan'); // Redirect to ScanView.jsx
    } else { // If user is not logged in
      navigate('/scanlanding'); // Redirect to ScanLandingView.jsx
    }
  };

  return { title, intros, foods, outros, scrollToTop, handleMulaiClick }; // Add handleMulaiClick to return
}