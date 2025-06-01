import React, { useState } from 'react';

const getPhotoUrl = (photo) => {
  if (!photo) return '';
  if (photo.startsWith('http')) return photo;
  const base = import.meta.env.VITE_API_BASE_URL || '';
  // Pastikan hanya satu slash di antara base dan path
  return base.replace(/\/$/, '') + '/' + photo.replace(/^\/?/, '');
};

export default function ScanHistoryView({ scanHistory = [], loading, error }) {
  const [selectedScan, setSelectedScan] = useState(null);

  const handleOpenModal = (scan) => setSelectedScan(scan);
  const handleCloseModal = () => setSelectedScan(null);

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
                  }}
                  onClick={() => handleOpenModal(scan)}
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
                    <button
                      className="button button--ghost"
                      style={{ fontSize: '.9rem', padding: '.5rem 1.2rem', marginTop: '.5rem' }}
                      onClick={e => { e.stopPropagation(); handleOpenModal(scan); }}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Belum ada riwayat scan.</p>
          )}
        </div>
      </div>
      {/* Modal Detail */}
      {selectedScan && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.35)',
            zIndex: 9999,
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
          </div>
        </div>
      )}
    </section>
  );
} 