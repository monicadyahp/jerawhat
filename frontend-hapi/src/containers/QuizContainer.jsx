// frontend-hapi > src > containers > QuizContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizView from '../views/QuizView';
import useQuizPresenter from '../mvp/presenters/useQuizPresenter';

export default function QuizContainer() {
  const presenterProps = useQuizPresenter();

  return (
    <>
      <Header />
      <QuizView {...presenterProps} />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}