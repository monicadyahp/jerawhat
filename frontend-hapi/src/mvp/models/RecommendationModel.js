// frontend-hapi > src > mvp > models > RecommendationModel.js

import productRecommendationsData from '../../data/productRecommendations.json';

export default class RecommendationModel {
  constructor() {
    this.products = productRecommendationsData;
  }

  // Mengambil semua produk
  getAllProducts() {
    return this.products;
  }

  // Mendapatkan rekomendasi berdasarkan kondisi kulit
  getRecommendationsByCondition(conditions = []) {
    if (!Array.isArray(conditions) || conditions.length === 0) {
      // Jika tidak ada kondisi spesifik, kembalikan semua produk atau yang umum
      return this.products.filter(p => p.suitableFor.includes('semua_jenis_kulit') || p.benefits.includes('dasar'));
    }

    const filteredProducts = this.products.filter(product => {
      // Cek apakah produk cocok untuk setidaknya satu dari kondisi yang diberikan
      return conditions.some(condition => product.suitableFor.includes(condition));
    });

    // Jika tidak ada produk yang cocok, bisa kembalikan beberapa produk umum
    return filteredProducts.length > 0 ? filteredProducts : this.products.filter(p => p.suitableFor.includes('semua_jenis_kulit') || p.benefits.includes('dasar'));
  }

  // Anda bisa menambahkan logika yang lebih kompleks di sini,
  // misalnya mendapatkan rekomendasi berdasarkan skor kuis atau kombinasi hasil scan.
}