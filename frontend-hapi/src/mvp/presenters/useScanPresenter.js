// src/mvp/presenters/useScanPresenter.js
import { useState, useEffect, useRef } from "react";
import ScanModel from "../models/ScanModel";

export default function useScanPresenter() {
  const model = new ScanModel();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [modelStatus, setModelStatus] = useState({ status: "idle", error: null });

  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Load model status monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const status = model.getModelStatus();
      setModelStatus(status);
      if (status.status === "ready" || status.status === "error") {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Preview gambar upload file
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // Scroll efek
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

  // Ambil daftar kamera
  useEffect(() => {
    async function fetchCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        setCameraDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Gagal mendapatkan device kamera:", error);
      }
    }
    fetchCameras();
  }, []);

  // Handler pilih kamera
  const onCameraChange = (deviceId) => {
    setSelectedCameraId(deviceId);
  };

  // Fungsi untuk scan frame video secara realtime
  const scanFrame = async () => {
    if (!videoRef.current || loading || modelStatus.status !== "ready") return;

    setLoading(true);
    setStatusMsg("");
    setPredictionResult(null);

    try {
      // Ambil frame video ke canvas
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas ke Blob dan ke File untuk model predict
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
      if (!blob) throw new Error("Gagal mengambil frame kamera.");

      const file = new File([blob], "realtime-snapshot.jpg", { type: "image/jpeg" });

      const result = await model.predictAcne(file);

      if (result.success) {
        setPredictionResult(result.data);
        setStatusMsg(result.message);
      } else {
        setStatusMsg(result.message || "Terjadi error saat proses prediksi.");
      }
    } catch (error) {
      console.error("Error scanFrame:", error);
      setStatusMsg("Gagal melakukan scan realtime: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Start kamera dan mulai scan otomatis
  const onStartCamera = async () => {
    if (!selectedCameraId) return;

    // Stop stream lama dan interval scan jika ada
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCameraId },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setSelectedImage(null);
      setPredictionResult(null);
      setStatusMsg("");
      setImagePreview(null);

      // Mulai scan frame tiap 1 detik (1000ms)
      scanIntervalRef.current = setInterval(scanFrame, 1500);
    } catch (error) {
      console.error("Gagal mengakses kamera:", error);
      setStatusMsg("Gagal mengakses kamera. Pastikan izin sudah diberikan.");
    }
  };

  // Stop kamera & scan realtime
  const onReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPredictionResult(null);
    setStatusMsg("");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsCameraActive(false);
    setLoading(false);
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
    onFileChange: (e) => {
      // Jika user upload file dari disk, stop kamera dan scan realtime
      if (isCameraActive && streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
      setIsCameraActive(false);
      setSelectedImage(e.target.files[0] || null);
      setPredictionResult(null);
      setStatusMsg("");
    },
    onSubmit: (e) => e.preventDefault(), // disable form submit karena realtime
    onReset,
    scrollToTop,
    cameraDevices,
    selectedCameraId,
    onCameraChange,
    onStartCamera,
    // onTakeSnapshot dihapus karena gak perlu tombol ambil foto lagi
    videoRef,
    isCameraActive,
  };
}
