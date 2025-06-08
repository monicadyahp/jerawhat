// frontend-hapi > src > containers > ScanContainer.jsx
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanView from "../views/ScanView";
import useScanPresenter from "../mvp/presenters/useScanPresenter";

export default function ScanContainer() {
  const presenterProps = useScanPresenter(); // Tetap seperti ini agar semua props diteruskan

  // Tambahkan useEffect untuk cleanup saat komponen di-unmount
  useEffect(() => {
    // Fungsi yang dikembalikan dari useEffect akan dijalankan saat komponen di-unmount
    return () => {
      // Panggil stopCamera dari presenterProps
      if (presenterProps.stopCamera) { // Pastikan fungsi ada
        presenterProps.stopCamera();
        console.log("Kamera dimatikan karena pindah halaman.");
      }
    };
    // Dependency array: cukup pastikan presenterProps tersedia (tidak berubah terlalu sering)
    // Jika presenterProps stabil (objeknya tidak dibuat ulang setiap render), ini sudah cukup.
    // Jika tidak, Anda bisa coba tambahkan navigate (dari react-router-dom) jika digunakan.
  }, [presenterProps]); 

  return (
    <>
      <Header />
      <ScanView {...presenterProps} /> {/* Teruskan semua props seperti biasa */}
      <div className="reveal-from-bottom">
        <Footer />
      </div>
    </>
  );
}