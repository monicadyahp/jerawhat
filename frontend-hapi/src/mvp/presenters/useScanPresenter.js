// src/mvp/presenters/useScanPresenter.js
import { useState, useEffect } from "react";
import ScanModel from "../models/ScanModel"; // Pastikan path benar

export default function useScanPresenter() {
  const model = new ScanModel();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [modelStatus, setModelStatus] = useState({ status: "idle", error: null });

  // Monitor status model AI (loading, ready, error)
  useEffect(() => {
    const interval = setInterval(() => {
      const status = model.getModelStatus();
      setModelStatus(status);
      if (status.status === "ready" || status.status === "error") {
        clearInterval(interval);
      }
    }, 500); // Cek status model setiap 500ms

    return () => clearInterval(interval);
  }, []);

  // Preview gambar saat user upload
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // Scroll efek untuk header dan tombol scroll-up
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
  }, []);

  const onFileChange = (e) => {
    setSelectedImage(e.target.files[0] || null);
    setPredictionResult(null);
    setStatusMsg("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setStatusMsg("Silakan upload foto wajah terlebih dahulu.");
      return;
    }

    if (modelStatus.status !== "ready") {
      setStatusMsg("Model AI belum siap digunakan. Mohon tunggu beberapa saat...");
      return;
    }

    setLoading(true);
    setStatusMsg("");
    setPredictionResult(null);

    try {
      const result = await model.predictAcne(selectedImage);

      if (result.success) {
        setPredictionResult(result.data);
        setStatusMsg(result.message);
      } else {
        setStatusMsg(result.message || "Terjadi error saat proses prediksi.");
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setStatusMsg("Terjadi error yang tidak diketahui saat proses prediksi.");
    }

    setLoading(false);
  };

  const onReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPredictionResult(null);
    setStatusMsg("");
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
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
  };
}