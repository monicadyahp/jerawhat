// src/mvp/models/MapsModel.js

import klinikData from '../../data/klinikData.json';

export default class MapsModel {
  getKlinikData() {
    return klinikData;
  }

  getPageTitle() {
    return 'Daftar Klinik Kecantikan di Indonesia';
  }

  getPageDesc() {
    return 'Temukan klinik kecantikan terbaik. Klik “Cari Lokasi Saya” untuk zoom ke posisi Anda.';
  }

  getDefaultMapCenter() {
    return [-2.5489, 118.0149]; // Indonesia
  }

  getDefaultZoom() {
    return 5;
  }
}