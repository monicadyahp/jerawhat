// src/containers/MapsContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MapsView from '../views/MapsView';
import { useMapsPresenter } from '../mvp/presenters/useMapsPresenter';

export default function MapsContainer() {
  const presenterProps = useMapsPresenter();

  return (
    <>
      <Header />
      <MapsView {...presenterProps} />
      <Footer />
    </>
  );
}