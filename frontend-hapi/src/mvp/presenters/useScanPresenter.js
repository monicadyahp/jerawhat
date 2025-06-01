// useScanPresenter.js
import { useState, useEffect, useRef } from "react";
import ScanModel from "../models/ScanModel";

export default function useScanPresenter() {
  const modelRef = useRef(null);
  if (!modelRef.current) {
    modelRef.current = new ScanModel();
  }
  const model = modelRef.current;

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [modelStatus, setModelStatus] = useState({ status: "idle", error: null });
  const [faceDetectionStatus, setFaceDetectionStatus] = useState({ status: "idle", error: null });
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const [lifestyleRecommendations, setLifestyleRecommendations] = useState(null);

  useEffect(() => {
    import("../../data/lifestyleRecomendation.json")
      .then((data) => {
        console.log("Loaded recommendations:", data.default);
        setLifestyleRecommendations(data.default);
      })
      .catch((error) => {
        console.error("Error loading recommendations:", error);
      });
  }, []);

  // Effect untuk mengelola status model
  useEffect(() => {
    const interval = setInterval(() => {
      const acneModelStatus = model.getAcneModelStatus();
      setModelStatus(acneModelStatus);
      const faceModelStatus = model.getFaceModelStatus();
      setFaceDetectionStatus((prev) => ({
        ...prev,
        status: faceModelStatus.status === "ready" ? "idle" : faceModelStatus.status,
        error: faceModelStatus.error,
      }));
      if (
        (acneModelStatus.status === "ready" || acneModelStatus.status === "error") &&
        (faceModelStatus.status === "ready" || faceModelStatus.status === "error")
      ) {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [model]);

  // Effect untuk membersihkan object URL gambar
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // Effect untuk scroll dan header
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

  // Effect untuk mengambil daftar kamera
  useEffect(() => {
    async function fetchCameras() {
      try {
        // Meminta izin kamera agar daftar perangkat muncul
        // Ini perlu dilakukan untuk mengisi setCameraDevices
        await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
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

  // --- PERUBAHAN UTAMA DI SINI ---
  // Effect untuk menghentikan kamera saat komponen di-unmount atau saat isCameraActive berubah menjadi false (jika dikelola dari luar)
  useEffect(() => {
    // Fungsi cleanup akan dijalankan saat komponen di-unmount
    // atau sebelum useEffect dijalankan lagi jika dependensi berubah.
    return () => {
      stopCamera(); // Panggil fungsi stopCamera saat komponen di-unmount
    };
  }, []); // Dependensi kosong agar hanya dijalankan sekali saat mount dan cleanup saat unmount

  // Effect untuk mengelola stream kamera ke videoRef.current
  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch((e) => console.error("Error playing video:", e));
      };
    } else if (!isCameraActive && videoRef.current) {
      // Pastikan srcObject direset saat kamera tidak aktif
      videoRef.current.srcObject = null;
    }
  }, [isCameraActive, streamRef.current, videoRef.current]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsCameraActive(false); // Pastikan status kamera diatur ke false
      console.log("Kamera berhasil dihentikan.");
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const onCameraChange = (deviceId) => {
    setSelectedCameraId(deviceId);
    stopCamera(); // Hentikan kamera saat kamera diubah
  };

  const onTakeSnapshot = async () => {
    if (!videoRef.current || loading || modelStatus.status !== "ready" || faceDetectionStatus.status !== "idle") return;
    setIsCapturing(true);
    setLoading(true);
    setStatusMsg("");
    setPredictionResult(null);
    setFaceDetectionStatus({ status: "idle", error: null });

    try {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/jpeg");
      setImagePreview(imageUrl);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
      if (!blob) throw new Error("Gagal mengambil gambar dari kamera.");
      const file = new File([blob], "camera-snapshot.jpg", { type: "image/jpeg" });
      setSelectedImage(file);

      // Tidak langsung menghentikan kamera di sini jika ingin tetap aktif setelah snapshot,
      // tapi instruksi Anda adalah menghentikannya. Jadi, tetap panggil stopCamera.
      stopCamera();
    } catch (error) {
      console.error("Error taking snapshot:", error);
      setStatusMsg("Gagal mengambil gambar: " + error.message);
    } finally {
      setLoading(false);
      setIsCapturing(false);
    }
  };

  const onStartCamera = async () => {
    if (!selectedCameraId) {
      setStatusMsg("Pilih kamera terlebih dahulu.");
      return;
    }

    stopCamera(); // Pastikan kamera sebelumnya berhenti sebelum memulai yang baru

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCameraId },
        audio: false,
      });
      streamRef.current = stream; // Simpan stream di ref
      setIsCameraActive(true); // Aktifkan status kamera

      setSelectedImage(null);
      setPredictionResult(null);
      setStatusMsg("");
      setFaceDetectionStatus({ status: "idle", error: null });
      setImagePreview(null);
    } catch (error) {
      console.error("Gagal mengakses kamera:", error);
      setStatusMsg(
        "Gagal mengakses kamera. Pastikan izin sudah diberikan atau tidak ada aplikasi lain yang menggunakan kamera."
      );
      setIsCameraActive(false);
    }
  };

  const onReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPredictionResult(null);
    setStatusMsg("");
    setFaceDetectionStatus({ status: "idle", error: null });
    setIsCapturing(false);
    stopCamera(); // Hentikan kamera saat reset
    setLoading(false);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveHistoryToBackend = async (dataToSave) => {
    try {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        throw new Error("Data user tidak ditemukan di penyimpanan lokal. Anda harus login.");
      }
      const userData = JSON.parse(userDataString);
      const token = userData.token;
      if (!token) {
        throw new Error("Token autentikasi tidak ditemukan dalam data user. Anda harus login.");
      }

      const formData = new FormData();
      formData.append("photo", dataToSave.photo);
      formData.append("kondisi_jerawat", dataToSave.kondisi_jerawat);
      formData.append("keyakinan_model", dataToSave.keyakinan_model);
      formData.append("rekomendasi_makanan", dataToSave.rekomendasi_makanan);
      formData.append("makanan_tidak_boleh_dimakan", dataToSave.makanan_tidak_boleh_dimakan);
      formData.append("rekomendasi_aktivitas_fisik", dataToSave.rekomendasi_aktivitas_fisik);
      formData.append("rekomendasi_manajemen_stress", dataToSave.rekomendasi_manajemen_stress);

      const response = await fetch("https://api.afridika.my.id/history", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Backend error response:", result);
        throw new Error(
          result.message.error || (result.message.errors ? result.message.errors.join(", ") : "Gagal menyimpan riwayat.")
        );
      }

      console.log("Riwayat berhasil disimpan:", result);
      setStatusMsg("Riwayat berhasil disimpan!");
    } catch (error) {
      console.error("Error saving history to backend:", error);
      setStatusMsg("Gagal menyimpan riwayat: " + error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || loading || modelStatus.status !== "ready" || faceDetectionStatus.status === "detecting") return;

    setLoading(true);
    setStatusMsg("");
    setPredictionResult(null);
    setFaceDetectionStatus({ status: "detecting", error: null });

    try {
      const faceDetectionRes = await model.detectFace(selectedImage);
      if (!faceDetectionRes.success) {
        setFaceDetectionStatus({ status: "error", error: faceDetectionRes.message });
        setStatusMsg(faceDetectionRes.message);
        setLoading(false);
        return;
      }
      if (faceDetectionRes.data.predictedClass === "non wajah") {
        setFaceDetectionStatus({ status: "no_face", error: null });
        setStatusMsg("Tidak ada wajah yang terdeteksi dalam gambar.");
        setLoading(false);
        return;
      }
      setFaceDetectionStatus({ status: "detected", error: null });

      const result = await model.predictAcne(selectedImage);
      if (result.success) {
        setPredictionResult(result.data);
        setStatusMsg(result.message);

        if (result.data.predictedClass !== "Tidak Ada Jerawat" && lifestyleRecommendations) {
          const recommendationKey =
            result.data.predictedClass === "Jerawat Ringan"
              ? "jerawat_ringan"
              : result.data.predictedClass === "Jerawat Sedang"
              ? "kulit_sedang"
              : result.data.predictedClass === "Jerawat Parah"
              ? "kulit_parah"
              : null;

          if (recommendationKey && lifestyleRecommendations[recommendationKey]) {
            const recommendations = lifestyleRecommendations[recommendationKey];
            const dataToSave = {
              photo: selectedImage,
              kondisi_jerawat: result.data.predictedClass,
              keyakinan_model: result.data.confidence,
              rekomendasi_makanan: recommendations.makanan_dianjurkan.join("; "),
              makanan_tidak_boleh_dimakan: recommendations.makanan_dilarang.join("; "),
              rekomendasi_aktivitas_fisik: recommendations.aktivitas_fisik.join("; "),
              rekomendasi_manajemen_stress: recommendations.manajemen_stres.join("; "),
            };
            await saveHistoryToBackend(dataToSave);
          } else {
            console.warn("Tidak ada rekomendasi yang cocok untuk kelas prediksi:", result.data.predictedClass);
          }
        }
      } else {
        setStatusMsg(result.message || "Terjadi error saat proses prediksi jerawat.");
      }
    } catch (error) {
      console.error("Error during full prediction process:", error);
      setStatusMsg("Gagal melakukan analisis: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    stopCamera(); // Hentikan kamera saat file diupload
    setSelectedImage(e.target.files[0] || null);
    setPredictionResult(null);
    setStatusMsg("");
    setFaceDetectionStatus({ status: "idle", error: null });
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
    isCapturing,
    faceDetectionStatus,
    lifestyleRecommendations,
  };
}