import React, { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert
import 'sweetalert2/dist/sweetalert2.min.css'; // Import CSS SweetAlert

// Contoh placeholder Modal (tetap sama)
const SimpleModal = ({ isOpen, onClose, children }) => {
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
      zIndex: 1000
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


export default function ScanView({
  selectedImage,
  imagePreview,
  predictionResult,
  loading,
  statusMsg,
  modelLoadStatus, // Gunakan state baru ini
  onFileChange,
  onSubmit,
  onReset,
  scrollToTop,
  cameraDevices,
  selectedCameraId,
  onCameraChange,
  onStartCamera,
  onTakeSnapshot,
  videoRef,
  isCameraActive,
  isCapturing,
  faceDetectionStatus,
  lifestyleRecommendations,
  createSharableImage,
  setStatusMsg,
  setPredictionResult
}) {
  const [sharableImageUrl, setSharableImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref untuk melacak apakah SweetAlert loading sedang aktif
  const loadingSwalActive = useRef(false);

  // Effect untuk menampilkan SweetAlert berdasarkan status umum (bukan loading model)
  useEffect(() => {
    // Tutup SweetAlert loading jika tidak ada loading atau statusMsg kosong
    if (!loading && !statusMsg && loadingSwalActive.current) {
        Swal.close();
        loadingSwalActive.current = false;
    }

    if (statusMsg) {
      if (statusMsg.includes("Prediksi jerawat berhasil!")) {
        // Pastikan loading Swal ditutup sebelum menampilkan sukses
        if (loadingSwalActive.current) {
            Swal.close();
            loadingSwalActive.current = false;
        }
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: statusMsg,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          setStatusMsg(""); // Bersihkan status setelah ditampilkan
        });
      } else if (statusMsg.includes("Gagal") || statusMsg.includes("Tidak ada wajah terdeteksi")) {
        // Pastikan loading Swal ditutup sebelum menampilkan error
        if (loadingSwalActive.current) {
            Swal.close();
            loadingSwalActive.current = false;
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: statusMsg,
        }).then(() => {
          setStatusMsg(""); // Bersihkan status setelah ditampilkan
        });
      } else if (statusMsg.includes("Menganalisis gambar...")) { // Hanya untuk pesan analisis
        Swal.fire({
          title: 'Menganalisis...',
          html: 'Mohon tunggu, kami sedang memproses gambar Anda.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            loadingSwalActive.current = true; // Set flag
          },
        });
      }
    }
  }, [statusMsg, loading, setStatusMsg]); // statusMsg, loading, dan setStatusMsg sebagai dependencies

  // Effect untuk menampilkan SweetAlert khusus status loading model
  useEffect(() => {
    if (modelLoadStatus === "loading") {
      Swal.fire({
        title: 'Memuat Model AI...',
        html: 'Mohon tunggu, model deteksi wajah dan jerawat sedang dimuat.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          loadingSwalActive.current = true; // Set flag
        },
      });
    } else if (modelLoadStatus === "ready") {
      if (loadingSwalActive.current) { // Hanya tutup jika SweetAlert loading model sedang aktif
        Swal.close();
        loadingSwalActive.current = false;
      }
      Swal.fire({
        icon: 'success',
        title: 'Model Siap!',
        text: 'Model AI deteksi wajah dan jerawat berhasil dimuat.',
        timer: 1500,
        showConfirmButton: false,
        toast: true, // Tampilkan sebagai toast
        position: 'top-end', // Posisikan di pojok kanan atas
      });
    } else if (modelLoadStatus === "error") {
      if (loadingSwalActive.current) {
        Swal.close();
        loadingSwalActive.current = false;
      }
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Model!',
        text: 'Terjadi kesalahan saat memuat model AI. Silakan coba refresh halaman.',
      });
    } else if (modelLoadStatus === "idle") {
        // Jika model idle, pastikan SweetAlert loading model ditutup
        if (loadingSwalActive.current) {
            Swal.close();
            loadingSwalActive.current = false;
        }
    }
  }, [modelLoadStatus]); // modelLoadStatus sebagai dependency

  // Hapus `renderModelStatus` dan `renderFaceDetectionStatus` jika hanya ingin pakai SweetAlert
  const renderModelStatus = () => {
    // Teks ini hanya akan muncul sebagai fallback atau jika Anda masih ingin tampilan teks selain SweetAlert
    switch (modelLoadStatus) {
      case "loading":
        return <p style={{ color: "orange" }}>⏳ Model sedang dimuat...</p>;
      case "ready":
        return <p style={{ color: "green" }}>✅ Model siap digunakan</p>;
      case "error":
        return <p style={{ color: "red" }}>❌ Gagal memuat model: {modelLoadStatus.error}</p>;
      case "idle":
      default:
        return <p style={{ color: "gray" }}>ℹ️ Menunggu model dimuat...</p>;
    }
  };

  const renderFaceDetectionStatus = () => {
    if (faceDetectionStatus.status === "detecting") {
      return <p style={{ color: "blue" }}>🔍 Mendeteksi wajah...</p>;
    } else if (faceDetectionStatus.status === "no_face") {
      return <p style={{ color: "orange" }}>⚠️ Tidak ada wajah terdeteksi dalam gambar.</p>;
    } else if (faceDetectionStatus.status === "error") {
      return <p style={{ color: "red" }}>❌ Error deteksi wajah: {faceDetectionStatus.error}</p>;
    }
    return null;
  };


  const handleShareResultClick = async () => {
    if (!predictionResult) {
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'Silakan lakukan scan terlebih dahulu untuk mendapatkan hasil.',
      });
      return;
    }
    if (!navigator.share) {
      Swal.fire({
        icon: 'info',
        title: 'Fitur Tidak Tersedia',
        text: 'Browser Anda tidak mendukung fitur berbagi langsung. Silakan unduh gambar dan bagikan secara manual.',
      });
      return;
    }

    const imageUrl = await createSharableImage();
    if (imageUrl) {
      setSharableImageUrl(imageUrl);
      setIsModalOpen(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Membuat Gambar',
        text: 'Gagal membuat gambar untuk dibagikan. Silakan coba lagi.',
      });
    }
  };

  const handleShareFromModal = async () => {
    if (!sharableImageUrl || !predictionResult) {
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'Tidak ada gambar atau hasil prediksi untuk dibagikan.',
      });
      return;
    }

    try {
      const response = await fetch(sharableImageUrl);
      const blob = await response.blob();
      const file = new File([blob], `hasil_scan_jerawat_${new Date().getTime()}.png`, { type: blob.type });

      const shareText = `Saya baru saja melakukan scan jerawat dan hasilnya: ${predictionResult.predictedClass}! Dapatkan analisis kulitmu di ${window.location.origin}/scan`;
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
          text: 'Gagal berbagi: ' + error.message,
        });
      }
    } finally {
      setIsModalOpen(false);
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
    <>
      <section className="section scan-page" id="scan-page">
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
          <h2 className="section__title reveal-from-bottom">Scan Wajah</h2>
          <p className="scan__subtitle reveal-from-bottom" style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
            Unggah foto wajahmu untuk mendapatkan analisis kulit secara otomatis.
          </p>
          <div style={{
            padding: "2rem",
            borderRadius: "16px",
            backgroundColor: "#fbeaea",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "2rem"
          }}>
            {/* Tampilan status model bisa dihapus jika hanya ingin mengandalkan SweetAlert */}
            {/* <div className="model__status reveal-from-bottom" style={{ marginBottom: "1.5rem" }}>
              {renderModelStatus()}
            </div> */}
            {faceDetectionStatus.status !== "idle" && faceDetectionStatus.status !== "detected" && (
              <div className="face-detection__status reveal-from-bottom" style={{ marginBottom: "1.5rem" }}>
                {renderFaceDetectionStatus()}
              </div>
            )}
            <div className="scan__input-group reveal-from-bottom" style={{ marginBottom: "2rem" }}>
              <label htmlFor="cameraSelect" style={{
                fontWeight: "bold",
                marginRight: "1rem",
                fontSize: "1.1rem"
              }}>
                📷 Pilih Kamera:
              </label>
              <select
                id="cameraSelect"
                value={selectedCameraId || ""}
                onChange={(e) => onCameraChange(e.target.value)}
                disabled={loading || modelLoadStatus !== "ready"}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                  minWidth: "200px",
                  backgroundColor: "white"
                }}
              >
                <option value="" disabled>-- Pilih kamera --</option>
                {cameraDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId}`}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="button"
                onClick={onStartCamera}
                disabled={!selectedCameraId || loading || modelLoadStatus !== "ready"}
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem 1.5rem",
                  fontSize: "1rem"
                }}
              >
                Mulai Kamera
              </button>
            </div>
            {isCameraActive && (
              <div className="scan__camera-preview reveal-from-bottom" style={{
                textAlign: "center",
                marginBottom: "2rem"
              }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  width="320"
                  height="240"
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    marginBottom: "1rem",
                    backgroundColor: "white"
                  }}
                />
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                  <button
                    type="button"
                    className="button"
                    onClick={onTakeSnapshot}
                    disabled={loading || modelLoadStatus !== "ready" || isCapturing}
                    style={{
                      padding: "0.75rem 1.5rem",
                      fontSize: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    {isCapturing ? "Mengambil Gambar..." : "📸 Ambil Gambar"}
                  </button>
                  <button
                    type="button"
                    className="button button--ghost"
                    onClick={onReset}
                    disabled={loading}
                    style={{
                      padding: "0.75rem 1.5rem",
                      fontSize: "1.1rem"
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
            <form className="scan__form" onSubmit={onSubmit}>
              <div className="scan__input-group reveal-from-bottom" style={{
                textAlign: "center",
                marginBottom: "2rem"
              }}>
                <label
                  htmlFor="fileUpload"
                  style={{
                    backgroundColor: "#ffb6c1",
                    color: "#721c24",
                    padding: "1rem 2rem",
                    borderRadius: "12px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "bold",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    fontSize: "1.1rem"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff94b8")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffb6c1")}
                >
                  📷 Pilih Gambar Wajah dari Galeri
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    disabled={loading || modelLoadStatus !== "ready"}
                    style={{ display: "none" }}
                  />
                </label>
                {selectedImage && (
                  <p style={{
                    marginTop: "1rem",
                    color: "#555",
                    fontStyle: "italic",
                    fontSize: "0.9rem"
                  }}>
                    {selectedImage.name}
                  </p>
                )}
              </div>
              {imagePreview && (
                <div className="scan__preview reveal-from-bottom" style={{
                  marginBottom: "2rem"
                }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      margin: "0 auto",
                      display: "block",
                      backgroundColor: "white"
                    }}
                  />
                </div>
              )}
              <div className="scan__actions reveal-from-bottom" style={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem"
              }}>
                <button
                  type="submit"
                  className="button"
                  disabled={loading || !selectedImage || modelLoadStatus !== "ready" || faceDetectionStatus.status === "detecting"}
                  style={{
                    padding: "0.75rem 2rem",
                    fontSize: "1.1rem"
                  }}
                >
                  {loading ? "Menganalisis..." : "Mulai Scan"}
                </button>
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={onReset}
                  disabled={loading}
                  style={{
                    padding: "0.75rem 2rem",
                    fontSize: "1.1rem"
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
            {predictionResult && (
              <div className="scan__result reveal-from-bottom">
                <h3 style={{
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                  color: "#333"
                }}>
                  Hasil Analisis Wajah
                </h3>
                {predictionResult.predictedClass ? (
                  <div style={{ textAlign: "center" }}>
                    <p style={{
                      fontSize: "1.2rem",
                      marginBottom: "1rem"
                    }}>
                      <strong>Kondisi Jerawat:</strong> {predictionResult.predictedClass}
                    </p>
                    <p style={{
                      fontSize: "1.1rem",
                      color: "#666",
                      marginBottom: "2rem"
                    }}>
                      <strong>Keyakinan Model:</strong> {(predictionResult.confidence * 100).toFixed(2)}%
                    </p>
                    {/* Lifestyle Recommendations */}
                    {predictionResult.predictedClass !== "Tidak Ada Jerawat" && lifestyleRecommendations && (
                      <div style={{
                        background: "white",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        marginTop: "2rem",
                        textAlign: "left"
                      }}>
                        <h4 style={{
                          fontSize: "1.3rem",
                          color: "#333",
                          marginBottom: "1.5rem",
                          textAlign: "center"
                        }}>
                          Rekomendasi Gaya Hidup
                        </h4>
                        {(() => {
                          const recommendationKey = predictionResult.predictedClass === "Jerawat Ringan" ? "jerawat_ringan" :
                            predictionResult.predictedClass === "Jerawat Sedang" ? "kulit_sedang" :
                              predictionResult.predictedClass === "Jerawat Parah" ? "kulit_parah" : null;
                          console.log("Prediction Class:", predictionResult.predictedClass);
                          console.log("Recommendation Key:", recommendationKey);
                          if (!recommendationKey) return null;
                          const recommendations = lifestyleRecommendations[recommendationKey];
                          console.log("Recommendations:", recommendations);
                          if (!recommendations) {
                            console.error("No recommendations found for key:", recommendationKey);
                            return null;
                          }
                          return (
                            <div style={{ display: "grid", gap: "1.5rem" }}>
                              <div>
                                <h5 style={{ color: "#721c24", marginBottom: "0.5rem" }}>🍎 Makanan yang Dianjurkan</h5>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                  {recommendations.makanan_dianjurkan.map((item, index) => (
                                    <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                                      <span style={{ position: "absolute", left: 0 }}>•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 style={{ color: "#721c24", marginBottom: "0.5rem" }}>❌ Makanan yang Dilarang</h5>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                  {recommendations.makanan_dilarang.map((item, index) => (
                                    <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                                      <span style={{ position: "absolute", left: 0 }}>•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 style={{ color: "#721c24", marginBottom: "0.5rem" }}>🏃‍♂️ Aktivitas Fisik</h5>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                  {recommendations.aktivitas_fisik.map((item, index) => (
                                    <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                                      <span style={{ position: "absolute", left: 0 }}>•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 style={{ color: "#721c24", marginBottom: "0.5rem" }}>🧘‍♀️ Manajemen Stres</h5>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                  {recommendations.manajemen_stres.map((item, index) => (
                                    <li key={index} style={{ marginBottom: "0.5rem", paddingLeft: "1.5rem", position: "relative" }}>
                                      <span style={{ position: "absolute", left: 0 }}>•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{
                    textAlign: "center",
                    fontSize: "1.1rem",
                    color: "#666"
                  }}>
                    Tidak ditemukan masalah pada foto yang diupload.
                  </p>
                )}

                {/* Tombol tunggal untuk memicu modal hasil scan */}
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <button
                    type="button"
                    className="button"
                    onClick={handleShareResultClick}
                    disabled={loading || !predictionResult || !navigator.share}
                    style={{
                      padding: "0.75rem 2rem",
                      fontSize: "1.1rem",
                      backgroundColor: 'var(--first-color)',
                      color: 'var(--title-color)'
                    }}
                  >
                    Bagikan Hasil Scan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <a href="#" className="scrollup" id="scroll-up" onClick={scrollToTop}>
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>

      {/* Modal untuk menampilkan hasil scan dan tombol berbagi */}
      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center", color: "#333" }}>
          Hasil Analisis Wajah
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
        {predictionResult && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              <strong>Kondisi Jerawat:</strong> {predictionResult.predictedClass}
            </p>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              <strong>Keyakinan Model:</strong> {(predictionResult.confidence * 100).toFixed(2)}%
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
    </>
  );
}