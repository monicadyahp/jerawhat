// frontend-hapi > src > mvp > presenters > useScanHistoryPresenter.js
import { useState, useEffect, useCallback } from 'react';
import ScanHistoryModel from '../models/ScanHistoryModel';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

export function useScanHistoryPresenter() {
  const { user } = useAuth();
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScan, setSelectedScan] = useState(null);
  const [lifestyleRecommendations, setLifestyleRecommendations] = useState(null);

  const STATIC_APP_URL = 'https://jerahwat.vercel.app/scan';

  useEffect(() => {
    import("../../data/lifestyleRecomendation.json")
      .then((data) => {
        setLifestyleRecommendations(data.default);
      })
      .catch((error) => {
        console.error("Error loading recommendations:", error);
      });
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      const model = new ScanHistoryModel(
        import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id',
        user?.token
      );

      const { data, message } = await model.fetchScanHistory();

      if (message) {
        setError(message);
      } else {
        const hiddenIds = JSON.parse(localStorage.getItem('hiddenScanIds') || '[]');
        const filteredData = data.filter(scan => !hiddenIds.includes(scan.id));
        setScanHistory(filteredData);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  const handleOpenModal = (scan) => setSelectedScan(scan);
  const handleCloseModal = () => setSelectedScan(null);

  const handleDeleteScan = async (idToDelete) => {
    const result = await Swal.fire({
      title: 'Apakah yakin akan menghapus riwayat scan?',
      text: 'Riwayat ini akan dihapus dari history scan Anda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(330, 91%, 85%)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batalkan',
      background: '#fbeaea',
      color: 'hsl(323, 70%, 30%)',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const hiddenIds = JSON.parse(localStorage.getItem('hiddenScanIds') || '[]');
        if (!hiddenIds.includes(idToDelete)) {
          hiddenIds.push(idToDelete);
          localStorage.setItem('hiddenScanIds', JSON.stringify(hiddenIds));
        }

        setScanHistory(prevHistory => prevHistory.filter(scan => scan.id !== idToDelete));

        handleCloseModal();

        Swal.fire({
          title: 'Berhasil!',
          text: 'Riwayat scan telah dihapus.',
          icon: 'success',
          background: '#fbeaea',
          color: 'hsl(323, 70%, 30%)',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting scan history:", error);
        Swal.fire({
          title: 'Gagal!',
          text: `Gagal menyembunyikan riwayat scan: ${error.message || 'Terjadi kesalahan.'}`,
          icon: 'error',
          background: '#fbeaea',
          color: 'hsl(323, 70%, 30%)',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Dibatalkan',
        text: 'Penghapusan riwayat scan dibatalkan.',
        icon: 'info',
        background: '#fbeaea',
        color: 'hsl(323, 70%, 30%)',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getPhotoUrl = (photo) => {
    if (!photo) {
      console.warn("Photo path is empty or null.");
      return ''; // Mengembalikan string kosong jika path foto kosong
    }
    // Jika foto sudah berupa URL lengkap, gunakan langsung
    if (photo.startsWith('http://') || photo.startsWith('https://')) {
      return photo;
    }
    // Jika hanya path relatif, gabungkan dengan base URL API
    const base = import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id';
    // Pastikan tidak ada double slash atau missing slash
    return base.replace(/\/$/, '') + '/' + photo.replace(/^\/?/, '');
  };

  const createSharableImageForHistory = useCallback(async (scanData) => {
    // Validasi awal
    if (!scanData || !lifestyleRecommendations) {
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'Tidak ada data scan atau rekomendasi untuk dibagikan.',
      });
      return null;
    }

    const imageUrl = getPhotoUrl(scanData.photo);
    if (!imageUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'URL gambar tidak valid. Mohon pastikan gambar riwayat tersedia.',
      });
      return null;
    }

    Swal.fire({
      title: 'Mempersiapkan Gambar...',
      html: 'Mohon tunggu, kami sedang membuat gambar untuk dibagikan.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Penting untuk menghindari masalah CORS
      img.src = imageUrl;

      // Tunggu hingga gambar benar-benar dimuat
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => {
          console.error("Failed to load image for sharing:", imageUrl);
          reject(new Error("Gagal memuat gambar dari server."));
        };
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
        ctx.measureText(`Tanggal Scan: ${new Date(scanData.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`).width,
        ctx.measureText(`Kondisi Jerawat: ${scanData.kondisi_jerawat}`).width,
        ctx.measureText(`Keyakinan Model: ${(scanData.keyakinan_model * 100).toFixed(2)}%`).width
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

      const scanDate = new Date(scanData.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      ctx.font = "bold 22px Arial";
      ctx.fillText(`Tanggal Scan:`, textXDetail, currentYDetail);
      ctx.font = "20px Arial";
      ctx.fillText(`${scanDate}`, textXDetail, currentYDetail + detailTextLineHeight);
      currentYDetail += detailTextLineHeight * 2;

      ctx.font = "bold 22px Arial";
      ctx.fillText(`Kondisi Jerawat:`, textXDetail, currentYDetail);
      ctx.font = "20px Arial";
      ctx.fillText(`${scanData.kondisi_jerawat}`, textXDetail, currentYDetail + detailTextLineHeight);
      currentYDetail += detailTextLineHeight * 2;

      ctx.font = "bold 22px Arial";
      ctx.fillText(`Keyakinan Model:`, textXDetail, currentYDetail);
      ctx.font = "20px Arial";
      ctx.fillText(`${(scanData.keyakinan_model * 100).toFixed(2)}%`, textXDetail, currentYDetail + detailTextLineHeight);
      currentYDetail += detailTextLineHeight * 2;

      let currentYRekomendasi = currentYDetail + margin;

      ctx.fillStyle = "#721c24";
      ctx.textAlign = "center";
      ctx.font = "bold 36px Arial";
      ctx.fillText("Rekomendasi Gaya Hidup", CANVAS_WIDTH / 2, currentYRekomendasi);
      currentYRekomendasi += 40;

      const recommendationKey = scanData.kondisi_jerawat === "Jerawat Ringan" ? "jerawat_ringan" :
        scanData.kondisi_jerawat === "Jerawat Sedang" ? "kulit_sedang" :
        scanData.kondisi_jerawat === "Jerawat Parah" ? "kulit_parah" : null;
      const recommendations = lifestyleRecommendations?.[recommendationKey];

      // Jika ada rekomendasi dari data history, gunakan itu. Jika tidak, gunakan dari lifestyleRecommendations.
      // Prioritaskan data dari scanData jika sudah ada (misalnya, jika backend menyimpannya)
      // Jika tidak, fallback ke lifestyleRecommendations
      const foodsAllowed = scanData.rekomendasi_makanan ? scanData.rekomendasi_makanan.split('; ').map(item => item.trim()) : (recommendations?.makanan_dianjurkan || []);
      const foodsDisallowed = scanData.makanan_tidak_boleh_dimakan ? scanData.makanan_tidak_boleh_dimakan.split('; ').map(item => item.trim()) : (recommendations?.makanan_dilarang || []);
      const physicalActivity = scanData.rekomendasi_aktivitas_fisik ? scanData.rekomendasi_aktivitas_fisik.split('; ').map(item => item.trim()) : (recommendations?.aktivitas_fisik || []);
      const stressManagement = scanData.rekomendasi_manajemen_stress ? scanData.rekomendasi_manajemen_stress.split('; ').map(item => item.trim()) : (recommendations?.manajemen_stres || []);


      if (foodsAllowed.length > 0 || foodsDisallowed.length > 0 || physicalActivity.length > 0 || stressManagement.length > 0) {
        ctx.textAlign = "left";
        ctx.fillStyle = "#333";
        const bulletOffset = 25;
        const categorySpacing = 40;
        const itemSpacing = 28;

        if (foodsAllowed.length > 0) {
          ctx.font = "bold 24px Arial";
          ctx.fillText("🍎 Makanan Dianjurkan:", margin, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
          ctx.font = "20px Arial";
          foodsAllowed.forEach(item => {
            ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
            currentYRekomendasi += itemSpacing;
          });
          currentYRekomendasi += categorySpacing;
        }

        if (foodsDisallowed.length > 0) {
          ctx.font = "bold 24px Arial";
          ctx.fillText("❌ Makanan Dilarang:", margin, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
          ctx.font = "20px Arial";
          foodsDisallowed.forEach(item => {
            ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
            currentYRekomendasi += itemSpacing;
          });
          currentYRekomendasi += categorySpacing;
        }

        if (physicalActivity.length > 0) {
          ctx.font = "bold 24px Arial";
          ctx.fillText("🏃‍♂️ Aktivitas Fisik:", margin, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
          ctx.font = "20px Arial";
          physicalActivity.forEach(item => {
            ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
            currentYRekomendasi += itemSpacing;
          });
          currentYRekomendasi += categorySpacing;
        }

        if (stressManagement.length > 0) {
          ctx.font = "bold 24px Arial";
          ctx.fillText("🧘‍♀️ Manajemen Stres:", margin, currentYRekomendasi);
          currentYRekomendasi += itemSpacing;
          ctx.font = "20px Arial";
          stressManagement.forEach(item => {
            ctx.fillText("• " + item, margin + bulletOffset, currentYRekomendasi);
            currentYRekomendasi += itemSpacing;
          });
          currentYRekomendasi += categorySpacing;
        }
      } else {
        // Jika tidak ada rekomendasi
        ctx.textAlign = "center";
        ctx.fillStyle = "#333";
        ctx.font = "20px Arial";
        ctx.fillText("Tidak ada rekomendasi gaya hidup yang tersedia untuk kondisi ini.", CANVAS_WIDTH / 2, currentYRekomendasi);
        currentYRekomendasi += 30; // Tambah sedikit spasi
      }


      const promoText = "Yuk, cek kondisi kulitmu juga di:";
      const appUrl = `${STATIC_APP_URL}/scan`;
      ctx.fillStyle = "#721c24";
      ctx.textAlign = "center";
      ctx.font = "bold 28px Arial";
      ctx.fillText(promoText, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80);
      ctx.font = "28px Arial";
      ctx.fillText(appUrl, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);

      Swal.close();
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error("Error creating sharable image for history:", error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Membuat Gambar',
        text: 'Gagal membuat gambar untuk dibagikan: ' + error.message,
      });
      return null;
    }
  }, [lifestyleRecommendations]);


  return {
    scanHistory,
    loading,
    error,
    selectedScan,
    handleOpenModal,
    handleCloseModal,
    handleDeleteScan,
    createSharableImageForHistory,
    getPhotoUrl,
  };
}