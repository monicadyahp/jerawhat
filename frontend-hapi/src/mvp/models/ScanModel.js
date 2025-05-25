// frontend-hapi > src > mvp > models > ScanModel.js
import * as tf from '@tensorflow/tfjs';
// import Jimp from 'jimp'; // <--- HAPUS BARIS INI

let loadedModel = null;

export default class ScanModel {
  constructor() {
    this.loadAcneModel();
  }

  async loadAcneModel() {
    if (loadedModel) {
      console.log('Model ML sudah dimuat.');
      return loadedModel;
    }
    try {
      const modelUrl = '/models/acne_model/model.json';

      // Tetap gunakan tf.loadGraphModel seperti yang kita coba terakhir
      loadedModel = await tf.loadGraphModel(modelUrl); 

      console.log('Model ML berhasil dimuat di frontend!');
      return loadedModel;
    } catch (error) {
      console.error('Gagal memuat model ML di frontend:', error);
      throw new Error('Gagal memuat model AI: ' + error.message + '. Harap coba refresh halaman atau hubungi administrator.');
    }
  }

  async predictAcne(imageFile) {
    try {
      if (!loadedModel) {
        await this.loadAcneModel();
        if (!loadedModel) {
            throw new Error("Model AI gagal dimuat.");
        }
      }

      const IMAGE_SIZE = 224; // SESUAIKAN UKURAN INPUT MODEL ANDA

      // --- PRA-PEMROSESAN GAMBAR DENGAN HTML CANVAS API ---
      // Kita akan membungkus ini dalam Promise karena FileReader dan Image loading adalah asinkron
      return new Promise(async (resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const img = new Image();
          img.crossOrigin = "anonymous"; // Penting jika gambar dari URL eksternal, tapi tidak wajib untuk upload lokal

          img.onload = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = IMAGE_SIZE;
            canvas.height = IMAGE_SIZE;
            const ctx = canvas.getContext('2d');

            // Gambar ulang di canvas dengan ukuran yang diinginkan
            ctx.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE);

            // Dapatkan data piksel dari canvas
            const imageData = ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE);

            // Buat tensor dari ImageData (yang sudah punya data, width, height)
            // Kita perlu channel 3 untuk RGB (bukan 4 untuk RGBA)
            let tensor = tf.browser.fromPixels(imageData, 3); // Ambil hanya 3 channel (RGB)

            // Normalisasi piksel ke 0-1
            tensor = tensor.toFloat().div(tf.scalar(255));

            // Tambahkan dimensi batch
            tensor = tensor.expandDims(0);

            // Lakukan prediksi
            const predictions = loadedModel.predict(tensor);
            const predictionsArray = await predictions.data();

            // Pasca-pemrosesan Hasil Prediksi
            const classNames = ['Tidak Ada Jerawat', 'Jerawat Ringan', 'Jerawat Sedang', 'Jerawat Parah']; // SESUAIKAN DENGAN KELAS OUTPUT MODEL ANDA

            const predictedClassIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
            const predictedClass = classNames[predictedClassIndex];
            const confidence = predictionsArray[predictedClassIndex];

            tensor.dispose(); // Buang tensor untuk menghemat memori

            resolve({
              success: true,
              message: 'Prediksi berhasil!',
              data: {
                predictedClass: predictedClass,
                confidence: confidence,
                rawPredictions: Array.from(predictionsArray)
              }
            });
          };
          img.onerror = (err) => reject(new Error('Gagal memuat gambar dari file.'));
          img.src = e.target.result; // Set sumber gambar dari FileReader (Data URL)
        };
        reader.onerror = (err) => reject(new Error('Gagal membaca file gambar.'));
        reader.readAsDataURL(imageFile); // Baca file sebagai Data URL
      }); // Akhir Promise
    } catch (error) {
      console.error("Error predicting acne (frontend ML):", error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat melakukan prediksi.'
      };
    }
  }
}