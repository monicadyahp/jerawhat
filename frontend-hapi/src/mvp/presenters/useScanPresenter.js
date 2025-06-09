// frontend-hapi > src > mvp > presenters > useScanPresenter.js
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [modelLoadStatus, setModelLoadStatus] = useState("idle");
  const [faceDetectionStatus, setFaceDetectionStatus] = useState({ status: "idle", error: null });
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const [lifestyleRecommendations, setLifestyleRecommendations] = useState(null);

  const STATIC_APP_URL = 'https://jerahwat.vercel.app/scan';

  useEffect(() => {
    import("../../data/lifestyleRecomendation.json") // Periksa kembali jalur ini jika ada masalah
      .then((data) => {
        console.log("Loaded recommendations:", data.default);
        setLifestyleRecommendations(data.default);
      })
      .catch((error) => {
        console.error("Error loading recommendations:", error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const acneModelCurrentStatus = model.getAcneModelStatus().status;
      const faceModelCurrentStatus = model.getFaceModelStatus().status;

      if (acneModelCurrentStatus === "loading" || faceModelCurrentStatus === "loading") {
        setModelLoadStatus("loading");
      } else if (acneModelCurrentStatus === "error" || faceModelCurrentStatus === "error") {
        setModelLoadStatus("error");
      } else if (acneModelCurrentStatus === "ready" && faceModelCurrentStatus === "ready") {
        setModelLoadStatus("ready");
        clearInterval(interval);
      } else {
        setModelLoadStatus("idle");
      }

      setFaceDetectionStatus((prev) => ({
        ...prev,
        status: faceModelCurrentStatus === "ready" ? "idle" : faceModelCurrentStatus,
        error: model.getFaceModelStatus().error,
      }));

    }, 500);
    return () => clearInterval(interval);
  }, [model]);

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

  // Pastikan `stopCamera` didefinisikan sebagai useCallback untuk stabilitas.
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
      console.log("Kamera berhasil dihentikan.");
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    // Tambahkan baris ini untuk mereset srcObject video saat kamera berhenti
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []); // Dependensi kosong karena fungsi ini hanya bergantung pada refs

  useEffect(() => {
    // Cleanup kamera saat komponen di-unmount
    return () => {
      stopCamera();
    };
  }, [stopCamera]); // Tambahkan stopCamera sebagai dependensi

  useEffect(() => {
    if (isCameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      // Periksa videoRef.current sebelum mengakses properti onloadedmetadata dan play()
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.onloadedmetadata = () => {
          videoElement.play().catch((e) => console.error("Error playing video:", e));
        };
      }
    } else if (!isCameraActive && videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [isCameraActive, streamRef.current]); // videoRef.current dihapus dari dependencies karena sudah useRef

  const onCameraChange = (deviceId) => {
    setSelectedCameraId(deviceId);
    stopCamera();
  };

  const onTakeSnapshot = async () => {
    if (!videoRef.current || loading || modelLoadStatus !== "ready" || faceDetectionStatus.status !== "idle") return;
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

    stopCamera(); // Hentikan kamera yang aktif sebelumnya

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCameraId },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraActive(true);

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
    stopCamera();
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
      let userData;
      try {
        userData = JSON.parse(userDataString);
      } catch (e) {
        throw new Error("Data user di penyimpanan lokal rusak. Silakan login ulang.");
      }

      const token = userData.token;
      if (!token) {
        throw new Error("Token autentikasi tidak ditemukan dalam data user. Anda harus login.");
      }

      // ⚠️ PERBAIKAN: Definisikan formData di sini
      const formData = new FormData();
      formData.append('photo', dataToSave.photo); // Tambahkan file gambar
      formData.append('kondisi_jerawat', dataToSave.kondisi_jerawat);
      formData.append('keyakinan_model', dataToSave.keyakinan_model);
      formData.append('rekomendasi_makanan', dataToSave.rekomendasi_makanan);
      formData.append('makanan_tidak_boleh_dimakan', dataToSave.makanan_tidak_boleh_dimakan);
      formData.append('rekomendasi_aktivitas_fisik', dataToSave.rekomendasi_aktivitas_fisik);
      formData.append('rekomendasi_manajemen_stress', dataToSave.rekomendasi_manajemen_stress);


      const response = await fetch("https://api.afridika.my.id/history", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Penting: Jangan set 'Content-Type': 'application/json' jika menggunakan FormData
          // Browser akan otomatis mengaturnya sebagai 'multipart/form-data' dengan boundary yang benar
          // saat Anda mengirim objek FormData
        },
        body: formData, // Gunakan formData yang sudah didefinisikan
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Backend error response:", result);
        let errorMessage = result.message || "Gagal menyimpan riwayat.";
        if (response.status === 401) {
          errorMessage = result.message || "Sesi login Anda telah berakhir. Silakan login ulang.";
        }
        throw new Error(errorMessage);
      }

      console.log("Riwayat berhasil disimpan:", result);
    } catch (error) {
      console.error("Error saving history to backend:", error);
      setStatusMsg("Gagal menyimpan riwayat: " + error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || loading || modelLoadStatus !== "ready" || faceDetectionStatus.status === "detecting") return;

    setLoading(true);
    setStatusMsg("Menganalisis gambar...");
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
        setStatusMsg("Prediksi jerawat berhasil!");

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
              photo: selectedImage, // File gambar yang akan diupload
              kondisi_jerawat: result.data.predictedClass,
              keyakinan_model: result.data.confidence,
              rekomendasi_makanan: recommendations.makanan_dianjurkan.join("; "),
              makanan_tidak_boleh_dimakan: recommendations.makanan_dilarang.join("; "),
              rekomendasi_aktivitas_fisik: recommendations.aktivitas_fisik.join("; "),
              rekomendasi_manajemen_stress: recommendations.manajemen_stres.join("; "),
            };
            try {
              await saveHistoryToBackend(dataToSave);
            } catch (historyError) {
              console.error("Error saving history after prediction:", historyError);
            }
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
    stopCamera();
    setSelectedImage(e.target.files[0] || null);
    setPredictionResult(null);
    setStatusMsg("");
    setFaceDetectionStatus({ status: "idle", error: null });
  };

  const createSharableImage = useCallback(async () => {
    if (!imagePreview || !predictionResult || !lifestyleRecommendations) {
      setStatusMsg("Tidak ada gambar, hasil prediksi, atau rekomendasi untuk dibagikan.");
      return null;
    }

    setLoading(true);
    setStatusMsg("Mempersiapkan gambar untuk dibagikan...");

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imagePreview;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const CANVAS_WIDTH = 720;
      const CANVAS_HEIGHT = 1280;

      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      ctx.fillStyle = "#FBEAEA";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const titleText = "✨ Hasil Scan Wajahku ✨";
      const taglineText = "Dapatkan analisis jerawat dan rekomendasi gaya hidup!";
      ctx.fillStyle = "#721c24";
      ctx.textAlign = "center";
      ctx.font = "bold 48px Arial";
      ctx.fillText(titleText, CANVAS_WIDTH / 2, 70);
      ctx.font = "24px Arial";
      ctx.fillText(taglineText, CANVAS_WIDTH / 2, 110);

      const smallImageSize = 150;
      const margin = 30;
      const detailTextLineHeight = 30;

      ctx.font = "20px Arial";
      const maxTextWidth = Math.max(
        ctx.measureText(`Tanggal Scan: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`).width,
        ctx.measureText(`Kondisi Jerawat: ${predictionResult.predictedClass}`).width,
        ctx.measureText(`Keyakinan Model: ${(predictionResult.confidence * 100).toFixed(2)}%`).width
      ) + 10;

      const contentBlockWidth = smallImageSize + margin + maxTextWidth;
      const startXContent = (CANVAS_WIDTH - contentBlockWidth) / 2;
      const startYContentBlock = 160;
      let imgXAligned = startXContent;
      let imgYAligned = startYContentBlock + ((3 * detailTextLineHeight * 2) - smallImageSize) / 2 - 20;


      ctx.save();
      ctx.beginPath();
      ctx.arc(imgXAligned + smallImageSize / 2, imgYAligned + smallImageSize / 2, smallImageSize / 2, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.drawImage(img, imgXAligned, imgYAligned, smallImageSize, smallImageSize);
      ctx.restore();

      ctx.strokeStyle = "#721c24";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(imgXAligned + smallImageSize / 2, imgYAligned + smallImageSize / 2, smallImageSize / 2, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.lineWidth = 1;

      let textXDetail = imgXAligned + smallImageSize + margin;
      let currentYDetail = startYContentBlock;

      ctx.fillStyle = "#333";
      ctx.textAlign = "left";

      const currentDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      ctx.font = "bold 22px Arial";
      ctx.fillText(`Tanggal Scan:`, textXDetail, currentYDetail);
      ctx.font = "20px Arial";
      ctx.fillText(`${currentDate}`, textXDetail, currentYDetail + detailTextLineHeight);
      currentYDetail += detailTextLineHeight * 2;

      ctx.font = "bold 22px Arial";
      ctx.fillText(`Kondisi Jerawat:`, textXDetail, currentYDetail);
      ctx.font = "20px Arial";
      ctx.fillText(`${predictionResult.predictedClass}`, textXDetail, currentYDetail + detailTextLineHeight);
      currentYDetail += detailTextLineHeight * 2;

      ctx.font = "bold 22px Arial";
      ctx.fillText(`Keyakinan Model:`, textXDetail, currentYDetail);
      ctx.font = "20px Arial";
      ctx.fillText(`${(predictionResult.confidence * 100).toFixed(2)}%`, textXDetail, currentYDetail + detailTextLineHeight);
      currentYDetail += detailTextLineHeight * 2;


      let currentYRekomendasi = currentYDetail + margin;

      ctx.fillStyle = "#721c24";
      ctx.textAlign = "center";
      ctx.font = "bold 36px Arial";
      ctx.fillText("Rekomendasi Gaya Hidup", CANVAS_WIDTH / 2, currentYRekomendasi);
      currentYRekomendasi += 40;

      const recommendationKey = predictionResult.predictedClass === "Jerawat Ringan" ? "jerawat_ringan" :
        predictionResult.predictedClass === "Jerawat Sedang" ? "kulit_sedang" :
          predictionResult.predictedClass === "Jerawat Parah" ? "kulit_parah" : null;
      const recommendations = lifestyleRecommendations?.[recommendationKey];

      if (recommendations) {
        ctx.textAlign = "left";
        ctx.fillStyle = "#333";
        const bulletOffset = 25;
        const categorySpacing = 40;
        const itemSpacing = 28;

        ctx.font = "bold 24px Arial";
        ctx.fillText("🍎 Makanan Dianjurkan:", margin, currentYRekomendasi);
        currentYRekomendasi += itemSpacing;
        ctx.font = "20px Arial";
        recommendations.makanan_dianjurkan.forEach(item => {
          ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
        });
        currentYRekomendasi += categorySpacing;

        ctx.font = "bold 24px Arial";
        ctx.fillText("❌ Makanan Dilarang:", margin, currentYRekomendasi);
        currentYRekomendasi += itemSpacing;
        ctx.font = "20px Arial";
        recommendations.makanan_dilarang.forEach(item => {
          ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
        });
        currentYRekomendasi += categorySpacing;

        ctx.font = "bold 24px Arial";
        ctx.fillText("🏃‍♂️ Aktivitas Fisik:", margin, currentYRekomendasi);
        currentYRekomendasi += itemSpacing;
        ctx.font = "20px Arial";
        recommendations.aktivitas_fisik.forEach(item => {
          ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
        });
        currentYRekomendasi += categorySpacing;

        ctx.font = "bold 24px Arial";
        ctx.fillText("🧘‍♀️ Manajemen Stres:", margin, currentYRekomendasi);
        currentYRekomendasi += itemSpacing;
        ctx.font = "20px Arial";
        recommendations.manajemen_stres.forEach(item => {
          ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
        });
        currentYRekomendasi += categorySpacing;
      }

      const promoText = "Yuk, cek kondisi kulitmu juga di:";
      const appUrl = `${STATIC_APP_URL}/scan`;
      ctx.fillStyle = "#721c24";
      ctx.textAlign = "center";
      ctx.font = "bold 28px Arial";
      ctx.fillText(promoText, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80);
      ctx.font = "28px Arial";
      ctx.fillText(appUrl, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);


      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error("Error creating sharable image:", error);
      setStatusMsg("Gagal membuat gambar untuk dibagikan: " + error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [imagePreview, predictionResult, lifestyleRecommendations, setStatusMsg, setLoading, STATIC_APP_URL]);

  return {
    selectedImage,
    imagePreview,
    predictionResult,
    loading,
    statusMsg,
    modelLoadStatus,
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
    setPredictionResult,
  };
}