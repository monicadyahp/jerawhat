// frontend-hapi > src > containers > ProfileContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileView from '../views/ProfileView'; // Pastikan path benar
import useProfilePresenter from '../mvp/presenters/useProfilePresenter'; // Pastikan path benar

export default function ProfileContainer() {
  const presenterProps = useProfilePresenter();

  return (
    <>
      <Header />
      <ProfileView {...presenterProps} />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}