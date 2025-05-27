// frontend-hapi > src > mvp > models > ScanModel.js
import * as tf from '@tensorflow/tfjs';

let loadedModel = null;

export default class ScanModel {
  constructor() {
    this.modelStatus = 'idle'; // 'idle' | 'loading' | 'ready' | 'error'
    this.loadError = null;
    this.loadAcneModel();
  }

  getModelStatus() {
    return {
      status: this.modelStatus,
      error: this.loadError,
    };
  }

  async loadAcneModel() {
    if (loadedModel) {
      this.modelStatus = 'ready';
      return loadedModel;
    }

    this.modelStatus = 'loading';

    try {
      const modelUrl = '/model/model.json'; // Pastikan path ini sesuai
      loadedModel = await tf.loadGraphModel(modelUrl);
      this.modelStatus = 'ready';
      console.log('✅ Model ML berhasil dimuat!');
      return loadedModel;
    } catch (error) {
      this.modelStatus = 'error';
      this.loadError = error.message;
      console.error('❌ Gagal memuat model ML:', error);
      throw new Error('Gagal memuat model AI: ' + error.message);
    }
  }

  async predictAcne(imageFile) {
    try {
      if (!loadedModel) {
        await this.loadAcneModel();
        if (!loadedModel) {
          throw new Error('Model belum siap.');
        }
      }

      const IMAGE_SIZE = 224;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';

          img.onload = async () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = IMAGE_SIZE;
              canvas.height = IMAGE_SIZE;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE);

              const imageData = ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE);

              let tensor = tf.browser.fromPixels(imageData, 3)
                .toFloat()
                .div(tf.scalar(255))
                .expandDims(0); // [1, 224, 224, 3]

              const predictions = tf.tidy(() => loadedModel.predict(tensor));
              const predictionsArray = await predictions.data();

              const classNames = ['Tidak Ada Jerawat', 'Jerawat Ringan', 'Jerawat Sedang', 'Jerawat Parah'];

              const predictedClassIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
              const predictedClass = classNames[predictedClassIndex];
              const confidence = predictionsArray[predictedClassIndex];

              tensor.dispose();

              resolve({
                success: true,
                message: 'Prediksi berhasil!',
                data: {
                  predictedClass,
                  confidence,
                  rawPredictions: Array.from(predictionsArray),
                },
              });
            } catch (err) {
              reject(new Error('Gagal memproses gambar: ' + err.message));
            }
          };

          img.onerror = () => reject(new Error('Gagal memuat gambar.'));
          img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error('Gagal membaca file.'));
        reader.readAsDataURL(imageFile);
      });
    } catch (error) {
      console.error('❌ Error saat prediksi:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat prediksi.',
      };
    }
  }
}
