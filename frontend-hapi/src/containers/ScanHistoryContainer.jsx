// frontend-hapi > src > containers > ScanHistoryContainer.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScanHistoryView from '../views/ScanHistoryView';
import { useScanHistoryPresenter } from '../mvp/presenters/useScanHistoryPresenter';

export default function ScanHistoryContainer() {
  const {
    scanHistory,
    loading,
    error,
    selectedScan,
    handleOpenModal,
    handleCloseModal,
    handleDeleteScan,
    createSharableImageForHistory, // Import fungsi ini
    getPhotoUrl, // Import fungsi ini
  } = useScanHistoryPresenter();

  return (
    <>
      <Header />
      <ScanHistoryView
        scanHistory={scanHistory}
        loading={loading}
        error={error}
        selectedScan={selectedScan}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleDeleteScan={handleDeleteScan}
        createSharableImageForHistory={createSharableImageForHistory} // Teruskan ke View
        getPhotoUrl={getPhotoUrl} // Teruskan ke View
      />
      <Footer />
    </>
  );
}