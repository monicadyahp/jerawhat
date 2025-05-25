// src/mvp/presenters/useOurMissionPresenter.js
import { useEffect, useState } from "react";
import OurMissionModel from "../models/OurMissionModel";

export default function useOurMissionPresenter() {
  const [title, setTitle] = useState('');
  const [missionPoints, setMissionPoints] = useState([]);

  useEffect(() => {
    const model = new OurMissionModel();
    setTitle(model.getTitle());
    setMissionPoints(model.getMissionPoints());

    // Scroll ke atas saat mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Toggle scroll-up button
    const onScroll = () => {
      const btn = document.getElementById('scroll-up');
      if (btn) {
        window.scrollY >= 460
          ? btn.classList.add('show-scroll')
          : btn.classList.remove('show-scroll');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handler klik scroll-up
  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    title,
    missionPoints,
    scrollToTop
  };
}