// frontend-hapi > src > mvp > presenters > useScanPresenter.js
import { useState, useEffect } from "react";
import ScanModel from "../models/ScanModel"; // Pastikan path benar

export default function useScanPresenter() {
  const model = new ScanModel(); // Mungkin perlu useMemo juga jika ada masalah re-render berulang

  const [selectedImage, setSelectedImage] = useState(null); // Ubah dari selectedFile
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null); // Ubah dari scanResult
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(""); // Untuk pesan error/status

  // Effect untuk menampilkan preview gambar dan membersihkan URL objek
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);
    
    // Cleanup function untuk mencabut URL objek saat komponen unmount atau selectedImage berubah
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]); // Bergantung pada selectedImage

  // Untuk scroll-header dan scroll-up (tetap sama)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const onScroll = () => {
      const header = document.getElementById("header");
      if (header) header.classList.toggle("scroll-header", window.scrollY >= 50);
      const up = document.getElementById("scroll-up");
      if (up) up.classList.toggle("show-scroll", window.scrollY >= 460);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Dependencies kosong agar hanya berjalan sekali

  const onFileChange = (e) => {
    setSelectedImage(e.target.files[0] || null); // Ubah dari setSelectedFile
    setPredictionResult(null); // Reset hasil prediksi
    setStatusMsg(""); // Reset pesan status
  };

  const onSubmit = async (e) => { // Ubah dari onSubmit
    e.preventDefault();
    if (!selectedImage) { // Ubah dari selectedFile
      setStatusMsg("Silakan upload foto wajah terlebih dahulu.");
      return;
    }
    setLoading(true);
    setStatusMsg("");
    setPredictionResult(null); // Reset hasil prediksi

    try {
      const result = await model.predictAcne(selectedImage); // Panggil predictAcne dari model

      if (result.success) {
        setPredictionResult(result.data); // Set hasil prediksi
        setStatusMsg(result.message); // Set pesan sukses
      } else {
        setStatusMsg(result.message || "Terjadi error saat proses prediksi."); // Set pesan error
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setStatusMsg("Terjadi error yang tidak diketahui saat proses prediksi.");
    }
    setLoading(false);
  };

  const onReset = () => { // Ubah dari onReset
    setSelectedImage(null); // Ubah dari setSelectedFile
    setImagePreview(null);
    setPredictionResult(null); // Reset hasil prediksi
    setStatusMsg("");
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    selectedImage, // Ubah dari selectedFile
    imagePreview,
    predictionResult, // Ubah dari scanResult
    loading,
    statusMsg,
    onFileChange,
    onSubmit, // Ini adalah fungsi yang dipanggil saat submit form
    onReset,
    scrollToTop,
  };
}