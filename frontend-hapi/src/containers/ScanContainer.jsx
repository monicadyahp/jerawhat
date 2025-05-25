// src/containers/ScanContainer.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanView from "../views/ScanView";
import useScanPresenter from "../mvp/presenters/useScanPresenter";

export default function ScanContainer() {
  const presenterProps = useScanPresenter();

  return (
    <>
      <Header />
      <ScanView {...presenterProps} />
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}