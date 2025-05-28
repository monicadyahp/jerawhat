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
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);
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
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);
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
  useEffect(() => {
    async function fetchCameras() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === "videoinput");
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
  const onCameraChange = (deviceId) => {
    setSelectedCameraId(deviceId);
  };
  const onTakeSnapshot = async () => {
    if (!videoRef.current || loading || modelStatus.status !== "ready") return;
    
    setIsCapturing(true);
    setLoading(true);
    setStatusMsg("");
    setPredictionResult(null);
    
    try {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Create image preview
      const imageUrl = canvas.toDataURL("image/jpeg");
      setImagePreview(imageUrl);
      
      // Convert to blob and create file
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
      if (!blob) throw new Error("Gagal mengambil gambar dari kamera.");
      
      const file = new File([blob], "camera-snapshot.jpg", { type: "image/jpeg" });
      setSelectedImage(file);

      // Stop camera after taking picture
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsCameraActive(false);
      
    } catch (error) {
      console.error("Error taking snapshot:", error);
      setStatusMsg("Gagal mengambil gambar: " + error.message);
    } finally {
      setLoading(false);
      setIsCapturing(false);
    }
  };
  const onStartCamera = async () => {
    if (!selectedCameraId) return;
    
    // Stop any existing camera stream
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
    } catch (error) {
      console.error("Gagal mengakses kamera:", error);
      setStatusMsg("Gagal mengakses kamera. Pastikan izin sudah diberikan.");
      setIsCameraActive(false);
    }
  };
  const onReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPredictionResult(null);
    setStatusMsg("");
    setIsCapturing(false);
    
    // Stop camera
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
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || loading || modelStatus.status !== "ready") return;

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
    } catch (error) {
      console.error("Error during prediction:", error);
      setStatusMsg("Gagal melakukan prediksi: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const onFileChange = (e) => {
    // Stop camera if active
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
    cameraDevices,
    selectedCameraId,
    onCameraChange,
    onStartCamera,
    onTakeSnapshot,
    videoRef,
    isCameraActive,
    isCapturing
  };
}
