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
          <p className="scan__subtitle reveal-from-bottom">
            Unggah foto wajahmu untuk mendapatkan analisis kulit secara otomatis.
          </p>
          <div className="model__status reveal-from-bottom" style={{ marginBottom: 10 }}>
            {renderModelStatus()}
          </div>
          <div className="scan__input-group reveal-from-bottom" style={{ marginBottom: 15 }}>
            <label htmlFor="cameraSelect" style={{ fontWeight: "bold", marginRight: 10 }}>
              📷 Pilih Kamera:
            </label>
            <select
              id="cameraSelect"
              value={selectedCameraId || ""}
              onChange={(e) => onCameraChange(e.target.value)}
              disabled={loading || modelStatus.status !== "ready"}
              style={{ padding: "6px", borderRadius: "6px" }}
            >
              <option value="" disabled>
                -- Pilih kamera --
              </option>
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
              style={{ marginLeft: "10px" }}
            >
              Mulai Kamera
            </button>
          </div>
          {isCameraActive && (
            <div className="scan__camera-preview reveal-from-bottom" style={{ textAlign: "center", marginBottom: 15 }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                width="320"
                height="240"
                style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
              />
            </div>
          )}
          <form className="scan__form" onSubmit={onSubmit}>
            <div
              className="scan__input-group reveal-from-bottom"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <label
                htmlFor="fileUpload"
                style={{
                  backgroundColor: "#ffb6c1",
                  color: "#721c24",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "inline-block",
                  fontWeight: "bold",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  transition: "background-color 0.3s",
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
                <p style={{ marginTop: 8, color: "#555", fontStyle: "italic" }}>{selectedImage.name}</p>
              )}
            </div>
            {imagePreview && (
              <div className="scan__preview reveal-from-bottom">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    margin: "1rem auto",
                    display: "block",
                  }}
                />
              </div>
            )}
            <div
              className="scan__actions reveal-from-bottom"
              style={{ marginBottom: 18, display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <button
                type="submit"
                className="button"
                disabled={loading || !selectedImage || modelStatus.status !== "ready"}
              >
                {loading ? "Menganalisis..." : "Mulai Scan"}
              </button>
              <button type="button" className="button button--ghost" disabled={loading} onClick={onReset}>
                Reset
              </button>
            </div>
            {statusMsg && (
              <p className="scan__status" style={{ color: statusMsg.includes("berhasil") ? "green" : "crimson" }}>
                {statusMsg}
              </p>
            )}
          </form>
          {predictionResult && (
            <div className="scan__result reveal-from-bottom" style={{ marginTop: 30 }}>
              <h3>Hasil Analisis Wajah:</h3>
              {predictionResult.predictedClass ? (
                <div>
                  <p>
                    <strong>Kondisi Jerawat:</strong> {predictionResult.predictedClass}
                  </p>
                  <p>
                    <strong>Keyakinan Model:</strong> {(predictionResult.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              ) : (
                <p>Tidak ditemukan masalah pada foto yang diupload.</p>
              )}
            </div>
          )}
        </div>
      </section>
      <a href="#" className="scrollup" id="scroll-up" onClick={scrollToTop}>
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}
