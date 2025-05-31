import * as tf from '@tensorflow/tfjs';
let loadedAcneModel = null;
let loadedFaceModel = null;
export default class ScanModel {
  constructor() {
    this.acneModelStatus = 'idle';
    this.acneLoadError = null;
    this.faceModelStatus = 'idle';
    this.faceLoadError = null;
    this.loadAcneModel();
    this.loadFaceModel();
  }
  getAcneModelStatus() {
    return {
      status: this.acneModelStatus,
      error: this.acneLoadError,
    };
  }
  getFaceModelStatus() {
    return {
      status: this.faceModelStatus,
      error: this.faceLoadError,
    };
  }
  async loadAcneModel() {
    if (loadedAcneModel) {
      this.acneModelStatus = 'ready';
      return loadedAcneModel;
    }
    this.acneModelStatus = 'loading';
    try {
      const modelUrl = '/model/model.json';
      loadedAcneModel = await tf.loadGraphModel(modelUrl);
      this.acneModelStatus = 'ready';
      console.log('✅ Model Deteksi Jerawat berhasil dimuat!');
      return loadedAcneModel;
    } catch (error) {
      this.acneModelStatus = 'error';
      this.acneLoadError = error.message;
      console.error('❌ Gagal memuat Model Deteksi Jerawat:', error);
      throw new Error('Gagal memuat model AI Jerawat: ' + error.message);
    }
  }
  async loadFaceModel() {
    if (loadedFaceModel) {
      this.faceModelStatus = 'ready';
      return loadedFaceModel;
    }
    this.faceModelStatus = 'loading';
    try {
      const faceModelUrl = '/model_wajah/model.json';
      loadedFaceModel = await tf.loadGraphModel(faceModelUrl);
      this.faceModelStatus = 'ready';
      console.log('✅ Model Deteksi Wajah berhasil dimuat!');
      return loadedFaceModel;
    } catch (error) {
      this.faceModelStatus = 'error';
      this.faceLoadError = error.message;
      console.error('❌ Gagal memuat Model Deteksi Wajah:', error);
      throw new Error('Gagal memuat model AI Wajah: ' + error.message);
    }
  }
  async preprocessImage(imageFile, targetSize) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, targetSize, targetSize);
          const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
          let tensor = tf.browser.fromPixels(imageData, 3)
            .toFloat()
            .div(tf.scalar(255))
            .expandDims(0);
          resolve(tensor);
        };
        img.onerror = () => reject(new Error('Gagal memuat gambar.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Gagal membaca file.'));
      reader.readAsDataURL(imageFile);
    });
  }
  async detectFace(imageFile) {
    try {
      if (!loadedFaceModel) {
        await this.loadFaceModel();
        if (!loadedFaceModel) {
          throw new Error('Model deteksi wajah belum siap.');
        }
      }
      const IMAGE_SIZE_FACE = 150;
      const tensor = await this.preprocessImage(imageFile, IMAGE_SIZE_FACE);
      const predictions = tf.tidy(() => loadedFaceModel.predict(tensor));
      const predictionsArray = await predictions.data();
      const classNames = ['non wajah', 'wajah'];
      const predictedClassIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
      const predictedClass = classNames[predictedClassIndex];
      const confidence = predictionsArray[predictedClassIndex];
      tensor.dispose();
      predictions.dispose();
      return {
        success: true,
        message: predictedClass === "wajah" ? "Wajah terdeteksi!" : "Tidak ada wajah terdeteksi.",
        data: {
          predictedClass,
          confidence,
          rawPredictions: Array.from(predictionsArray),
        },
      };
    } catch (error) {
      console.error('❌ Error saat deteksi wajah:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat deteksi wajah.',
      };
    }
  }
  async predictAcne(imageFile) {
    try {
      if (!loadedAcneModel) {
        await this.loadAcneModel();
        if (!loadedAcneModel) {
          throw new Error('Model deteksi jerawat belum siap.');
        }
      }
      const IMAGE_SIZE_ACNE = 224;
      const tensor = await this.preprocessImage(imageFile, IMAGE_SIZE_ACNE);
      const predictions = tf.tidy(() => loadedAcneModel.predict(tensor));
      const predictionsArray = await predictions.data();
      console.log(predictionsArray);
      const classNames = ['Jerawat Parah', 'Jerawat Ringan', 'Jerawat Sedang'];
      const predictedClassIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
      const predictedClass = classNames[predictedClassIndex];
      const confidence = predictionsArray[predictedClassIndex];
      tensor.dispose();
      predictions.dispose();
      return {
        success: true,
        message: 'Prediksi jerawat berhasil!',
        data: {
          predictedClass,
          confidence,
          rawPredictions: Array.from(predictionsArray),
        },
      };
    } catch (error) {
      console.error('❌ Error saat prediksi jerawat:', error);
      return {
        success: false,
        message: error.message || 'Terjadi kesalahan saat prediksi jerawat.',
      };
    }
  }
}