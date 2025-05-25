// frontend-hapi > src > views > ScanView.jsx
import React from "react";

export default function ScanView({
  selectedImage, // Ubah dari selectedFile
  imagePreview,
  predictionResult, // Ubah dari scanResult
  loading,
  statusMsg, // Ubah dari statusMsg
  onFileChange,
  onSubmit, // Ini adalah fungsi yang dipanggil saat submit form
  onReset,
  scrollToTop,
}) {
  return (
    <>
      <section className="section scan-page" id="scan-page">
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
          <h2 className="section__title reveal-from-bottom">Scan Wajah</h2>
          <p className="scan__subtitle reveal-from-bottom">
            Unggah foto wajahmu untuk mendapatkan analisis kulit secara otomatis.
          </p>
          <form className="scan__form" onSubmit={onSubmit}> {/* Form tetap, tapi aksi sudah di presenter */}
            <div className="scan__input-group reveal-from-bottom">
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                disabled={loading}
              />
            </div>
            {imagePreview && (
              <div className="scan__preview reveal-from-bottom">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%', // Agar responsif
                    maxHeight: '300px', // Batasi tinggi
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Shadow lebih lembut
                    margin: "1rem auto",
                    display: 'block' // Agar bisa center dengan margin auto
                  }}
                />
              </div>
            )}
            <div className="scan__actions reveal-from-bottom" style={{ marginBottom: 18, display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                type="submit"
                className="button"
                disabled={loading || !selectedImage} // Ubah dari selectedFile
              >
                {loading ? "Menganalisis..." : "Mulai Scan"}
              </button>
              <button
                type="button"
                className="button button--ghost"
                disabled={loading} // Hapus !selectedFile karena tombol reset harusnya selalu aktif saat ada file
                onClick={onReset}
              >
                Reset
              </button>
            </div>
            {statusMsg && (
              <p className="scan__status" style={{ color: statusMsg.includes("berhasil") ? "green" : "crimson" }}>
                {statusMsg}
              </p>
            )}
          </form>
          {/* Hasil Scan */}
          {predictionResult && ( // Ubah dari scanResult
            <div className="scan__result reveal-from-bottom" style={{ marginTop: 30 }}>
              <h3>Hasil Analisis Wajah:</h3>
              {predictionResult.predictedClass ? ( // Cek apakah ada kelas prediksi
                <div>
                  <p>
                    **Kondisi Jerawat:** {predictionResult.predictedClass}
                  </p>
                  <p>
                    **Keyakinan Model:** {(predictionResult.confidence * 100).toFixed(2)}%
                  </p>
                  {/* Tambahkan saran/solusi berdasarkan predictionResult.predictedClass */}
                  {/* Contoh:
                  {predictionResult.predictedClass === "Jerawat Ringan" && (
                    <p style={{ color: "#555" }}>Saran: Cuci muka 2x sehari, gunakan produk non-komedogenik.</p>
                  )}
                  */}
                </div>
              ) : (
                <p>Tidak ditemukan masalah pada foto yang diupload.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Scroll Up Button */}
      <a
        href="#"
        className="scrollup"
        id="scroll-up"
        onClick={scrollToTop}
      >
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </>
  );
}