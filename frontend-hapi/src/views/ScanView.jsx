// src/views/ScanView.jsx
import React from "react";
export default function ScanView({
  selectedImage,
  imagePreview,
  predictionResult,
  loading,
  statusMsg,
  modelStatus,
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
}) {
  const renderModelStatus = () => {
    switch (modelStatus.status) {
      case "loading":
        return <p style={{ color: "orange" }}>⏳ Model sedang dimuat...</p>;
      case "ready":
        return <p style={{ color: "green" }}>✅ Model siap digunakan</p>;
      case "error":
        return <p style={{ color: "red" }}>❌ Gagal memuat model: {modelStatus.error}</p>;
      case "idle":
      default:
        return <p style={{ color: "gray" }}>ℹ️ Menunggu model dimuat...</p>;
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
            <div className="model__status reveal-from-bottom" style={{ marginBottom: "1.5rem" }}>
              {renderModelStatus()}
            </div>

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
                disabled={loading || modelStatus.status !== "ready"}
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
                disabled={!selectedCameraId || loading || modelStatus.status !== "ready"}
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
                    disabled={loading || modelStatus.status !== "ready" || isCapturing}
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
                      fontSize: "1rem"
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
                  📷 Pilih Foto Wajah
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    disabled={loading || modelStatus.status !== "ready"}
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
                  disabled={loading || !selectedImage || modelStatus.status !== "ready"}
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
                  disabled={loading} 
                  onClick={onReset}
                  style={{ 
                    padding: "0.75rem 2rem",
                    fontSize: "1.1rem"
                  }}
                >
                  Reset
                </button>
              </div>

              {statusMsg && (
                <p className="scan__status" style={{ 
                  color: statusMsg.includes("berhasil") ? "green" : "crimson",
                  textAlign: "center",
                  fontSize: "1.1rem",
                  marginBottom: "2rem"
                }}>
                  {statusMsg}
                </p>
              )}
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
                      color: "#666"
                    }}>
                      <strong>Keyakinan Model:</strong> {(predictionResult.confidence * 100).toFixed(2)}%
                    </p>
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
              </div>
            )}
          </div>
        </div>
      </section>
      <a href="#" className="scrollup" id="scroll-up" onClick={scrollToTop}>
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}
