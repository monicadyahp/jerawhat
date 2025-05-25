// src/mvp/presenters/useAboutTeamPresenter.js
import { useEffect, useState } from "react";
import AboutTeamModel from "../models/AboutTeamModel";

export default function useAboutTeamPresenter() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    // Data dari model
    const model = new AboutTeamModel();
    setTeamMembers(model.getTeamMembers());
    setTitle(model.getTitle());
    setDesc(model.getDescription());

    // Scroll ke atas saat mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scroll up button logic
    const handleScrollUp = () => {
      const btn = document.getElementById('scroll-up');
      if (btn)
        window.scrollY >= 460
          ? btn.classList.add('show-scroll')
          : btn.classList.remove('show-scroll');
    };
    window.addEventListener('scroll', handleScrollUp);
    return () => window.removeEventListener('scroll', handleScrollUp);
  }, []);

  // Handler klik scroll-up
  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    teamMembers,
    title,
    desc,
    scrollToTop
  };
}