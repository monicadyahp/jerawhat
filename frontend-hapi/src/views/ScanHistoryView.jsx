// frontend-hapi > src > views > ScanHistoryView.jsx
import React, { useState } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SimpleModal = ({ isOpen, onClose, children, zIndex = 1050 }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: zIndex
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        maxWidth: '90%',
        maxHeight: '90%',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};


export default function ScanHistoryView({ scanHistory = [], loading, error, selectedScan, handleOpenModal, handleCloseModal, handleDeleteScan, createSharableImageForHistory, getPhotoUrl }) {
  const [sharableImageUrl, setSharableImageUrl] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  // State baru untuk menyimpan data scan yang akan dibagikan secara lokal
  const [scanDataToShareInModal, setScanDataToShareInModal] = useState(null);


  const handleShareResultClick = async (scan) => {
    if (!navigator.share) {
      Swal.fire({
        icon: 'info',
        title: 'Fitur Tidak Tersedia',
        text: 'Browser Anda tidak mendukung fitur berbagi langsung. Silakan unduh gambar dan bagikan secara manual.',
      });
      return;
    }

    if (!scan) {
      Swal.fire({
        icon: 'info',
        title: 'Informasi Tidak Lengkap',
        text: 'Data scan tidak tersedia untuk membuat gambar yang dapat dibagikan.',
      });
      return;
    }

    // PENTING: Set state lokal dengan data scan yang akan dibagikan SEBELUM membuat gambar dan menutup modal detail.
    // Ini memastikan data tersebut tetap ada dan konsisten di modal pratinjau.
    setScanDataToShareInModal(scan);

    handleCloseModal(); // Tutup modal detail riwayat scan (ini akan mengeset selectedScan di presenter menjadi null)

    const imageUrl = await createSharableImageForHistory(scan); // Gunakan 'scan' yang diteruskan langsung
    if (imageUrl) {
      setSharableImageUrl(imageUrl);
      setIsShareModalOpen(true); // Buka modal pratinjau berbagi
    } else {
      // Jika pembuatan gambar gagal, reset juga state lokal
      setScanDataToShareInModal(null);
      setSharableImageUrl(null);
    }
  };

  const handleShareFromModal = async () => {
    // Perbaikan: Gunakan scanDataToShareInModal dan sharableImageUrl yang diatur di handleShareResultClick
    if (!sharableImageUrl || !scanDataToShareInModal) {
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'Tidak ada gambar atau detail prediksi yang disiapkan untuk dibagikan. Silakan coba lagi.',
      });
      // DEBUGGING HINT: Ini adalah tempat terbaik untuk console.log jika masih bermasalah
      console.log("Debug: sharableImageUrl:", sharableImageUrl);
      console.log("Debug: scanDataToShareInModal:", scanDataToShareInModal);
      return;
    }

    try {
      const response = await fetch(sharableImageUrl);
      const blob = await response.blob();
      const file = new File([blob], `hasil_scan_jerawat_${new Date().getTime()}.png`, { type: blob.type });

      // Pastikan data ini ada dan valid untuk dibagikan
      const predictedClass = scanDataToShareInModal.kondisi_jerawat || "Tidak diketahui";
      const shareText = `Saya baru saja melakukan scan jerawat dan hasilnya: ${predictedClass}! Dapatkan analisis kulitmu di ${window.location.origin}/scan`;
      const shareTitle = 'Hasil Scan Jerawatku!';

      await navigator.share({
        title: shareTitle,
        text: shareText,
        files: [file],
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Berhasil dibagikan!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      if (error.name === 'AbortError') {
        Swal.fire({
          icon: 'info',
          title: 'Dibatalkan',
          text: 'Berbagi dibatalkan oleh pengguna.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Berbagi',
          text: 'Terjadi kesalahan saat berbagi: ' + error.message,
        });
      }
    } finally {
      setIsShareModalOpen(false);
      // Reset state lokal setelah modal ditutup atau berbagi selesai
      setSharableImageUrl(null);
      setScanDataToShareInModal(null);
    }
  };

  const handleDownloadImage = () => {
    if (sharableImageUrl) {
      const link = document.createElement('a');
      link.href = sharableImageUrl;
      link.download = `hasil_scan_jerawat_${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Gambar hasil scan berhasil diunduh!',
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'Tidak ada gambar untuk diunduh. Buat gambar terlebih dahulu.',
      });
    }
  };

  return (
    <section className="section scan-history-page" id="scan-history-page">
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <h2 className="section__title reveal-from-bottom">Riwayat Scan</h2>
        <div style={{
          background: '#fbeaea',
          padding: '2rem',
          borderRadius: '.75rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto',
          color: 'hsl(323, 70%, 30%)'
        }}>
          {error && (
            <p style={{ color: 'crimson', marginBottom: '1rem' }}>{error}</p>
          )}
          {loading ? (
            <p>Memuat riwayat scan...</p>
          ) : scanHistory.length > 0 ? (
            <div style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'
            }}>
              {scanHistory.map((scan, index) => (
                <div
                  key={scan.id || index}
                  style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '260px',
                    position: 'relative',
                  }}
                  title="Lihat detail riwayat scan"
                >
                  <img
                    src={getPhotoUrl(scan.photo)}
                    alt={`Scan ${index + 1}`}
                    style={{
                      width: '100%',
                      maxWidth: '120px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                      marginBottom: '0.75rem',
                      background: '#fbeaea',
                    }}
                  />
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, color: '#b85294', marginBottom: '.5rem' }}>
                      {scan.kondisi_jerawat || 'Tidak ada prediksi'}
                    </div>
                    <div style={{ fontSize: '.95rem', marginBottom: '.5rem' }}>
                      {new Date(scan.createdAt).toLocaleString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '.4rem', marginTop: '.5rem' }}>
                      <button
                        className="button button--ghost"
                        style={{
                          fontSize: '.8rem',
                          padding: '.4rem .8rem',
                          whiteSpace: 'nowrap'
                        }}
                        onClick={e => { e.stopPropagation(); handleOpenModal(scan); }}
                      >
                        Lihat Detail
                      </button>
                      <button
                        style={{
                          fontSize: '.8rem',
                          padding: '.4rem .8rem',
                          backgroundColor: 'crimson',
                          color: 'white',
                          border: 'none',
                          borderRadius: '.5rem',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteScan(scan.id);
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Belum ada riwayat scan.</p>
          )}
        </div>
        {selectedScan && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.35)',
              zIndex: 1050,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleCloseModal}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '1rem',
                maxWidth: '420px',
                width: '95vw',
                padding: '2rem 1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                position: 'relative',
                color: '#b85294',
                animation: 'slideInFromBottom 0.3s',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#b85294',
                  cursor: 'pointer',
                }}
                aria-label="Tutup"
              >
                &times;
              </button>
              <img
                src={getPhotoUrl(selectedScan.photo)}
                alt="Foto Scan Detail"
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                  margin: '0 auto 1rem auto',
                  display: 'block',
                  background: '#fbeaea',
                }}
              />
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '.5rem' }}>{selectedScan.kondisi_jerawat || 'Tidak ada prediksi'}</div>
              <div style={{ fontSize: '.98rem', marginBottom: '.5rem' }}>
                {new Date(selectedScan.createdAt).toLocaleString('id-ID', {
                  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </div>
              {selectedScan.keyakinan_model && (
                <div style={{ marginBottom: '.5rem' }}>
                  <strong>Keyakinan Model:</strong> {(selectedScan.keyakinan_model * 100).toFixed(2)}%
                </div>
              )}
              {selectedScan.rekomendasi_makanan && (
                <div style={{ marginBottom: '.5rem', fontSize: '.95rem' }}>
                  <strong>Rekomendasi Makanan:</strong> {selectedScan.rekomendasi_makanan}
                </div>
              )}
              {selectedScan.makanan_tidak_boleh_dimakan && (
                <div style={{ marginBottom: '.5rem', fontSize: '.95rem' }}>
                  <strong>Makanan Dilarang:</strong> {selectedScan.makanan_tidak_boleh_dimakan}
                </div>
              )}
              {selectedScan.rekomendasi_aktivitas_fisik && (
                <div style={{ marginBottom: '.5rem', fontSize: '.95rem' }}>
                  <strong>Aktivitas Fisik:</strong> {selectedScan.rekomendasi_aktivitas_fisik}
                </div>
              )}
              {selectedScan.rekomendasi_manajemen_stress && (
                <div style={{ marginBottom: '.5rem', fontSize: '.95rem' }}>
                  <strong>Manajemen Stres:</strong> {selectedScan.rekomendasi_manajemen_stress}
                </div>
              )}

              {/* Tombol Bagikan di Modal Detail */}
              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <button
                  type="button"
                  className="button"
                  onClick={() => handleShareResultClick(selectedScan)}
                  disabled={!selectedScan || !navigator.share}
                  style={{
                    padding: "0.75rem 2rem",
                    fontSize: "1.1rem",
                    backgroundColor: 'var(--first-color)',
                    color: 'var(--title-color)',
                    marginBottom: '1rem',
                  }}
                >
                  Bagikan Hasil Scan
                </button>
              </div>

              {/* Tombol Hapus di Modal Detail */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button
                  style={{
                    fontSize: '.9rem',
                    padding: '.6rem 1.5rem',
                    backgroundColor: 'crimson',
                    color: 'white',
                    border: 'none',
                    borderRadius: '.5rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    maxWidth: '200px',
                  }}
                  onClick={() => {
                    handleDeleteScan(selectedScan.id);
                  }}
                >
                  Hapus Riwayat Ini
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal untuk menampilkan gambar yang dapat dibagikan dan tombol berbagi/unduh */}
        <SimpleModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} zIndex={1051}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center", color: "#333" }}>
            Pratinjau Gambar untuk Dibagikan
          </h3>
          {sharableImageUrl && (
            <div style={{ marginBottom: "1rem" }}>
              <img
                src={sharableImageUrl}
                alt="Hasil Scan"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  display: "block",
                  margin: "0 auto",
                  backgroundColor: "white"
                }}
              />
            </div>
          )}
          {scanDataToShareInModal && ( // Pastikan menggunakan state lokal di sini!
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                <strong>Kondisi Jerawat:</strong> {scanDataToShareInModal.kondisi_jerawat}
              </p>
              <p style={{ fontSize: "1.1rem", color: "#666" }}>
                <strong>Keyakinan Model:</strong> {(scanDataToShareInModal.keyakinan_model * 100).toFixed(2)}%
              </p>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "1rem" }}>Bagikan Hasil:</p>
            <button
              type="button"
              className="button"
              onClick={handleShareFromModal}
              disabled={!sharableImageUrl || !navigator.share}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                backgroundColor: 'var(--first-color)',
                color: 'var(--title-color)'
              }}
            >
              Bagikan Hasil Scan
            </button>
            <button
              type="button"
              className="button button--ghost"
              onClick={handleDownloadImage}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                marginLeft: "1rem",
              }}
            >
              Unduh Hasil Scan
            </button>
          </div>
        </SimpleModal>
      </div>
    </section>
  );
}