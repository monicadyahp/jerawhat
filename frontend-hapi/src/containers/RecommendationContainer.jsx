// frontend-hapi > src > containers > RecommendationContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecommendationView from '../views/RecommendationView';
import useRecommendationPresenter from '../mvp/presenters/useRecommendationPresenter';

export default function RecommendationContainer() {
  const presenterProps = useRecommendationPresenter();

  return (
    <>
      <Header />
      <RecommendationView {...presenterProps} />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}