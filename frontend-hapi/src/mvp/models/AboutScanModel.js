// src/mvp/models/AboutScanModel.js
export default class AboutScanModel {
  constructor() {
    this.blocks = [
      {
        title: 'Tentang Website JeraWHAT?!',
        description:
          'Website ini dirancang untuk membantu kamu memeriksa kondisi kulit wajah ' +
          'dengan teknologi scan wajah. Dengan menggunakan ponsel pintar, kamu dapat ' +
          'dengan mudah menganalisis kondisi kulit kamu, termasuk jerawat dan masalah ' +
          'kulit lainnya. Dapatkan rekomendasi perawatan yang tepat untuk menjaga ' +
          'kulit tetap sehat dan cerah.',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105259/aboutscan1_evljyl.png',
        reverse: false
      },
      {
        title: 'Fitur Scan Kulit Wajah',
        description:
          'Fitur ini memungkinkan kamu untuk melakukan pemindaian wajah secara instan ' +
          'dan akurat menggunakan teknologi canggih. Dengan fitur ini, kamu dapat ' +
          'mengetahui kondisi kulit wajahmu, seperti tingkat jerawat, komedo, dan ' +
          'masalah kulit lainnya.',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105259/aboutscan2_ldu2lv.png',
        reverse: true
      },
      {
        title: 'Apa yang bisa kamu dapatkan?',
        description:
          'Kamu bisa mendapatkan diagnosa kondisi kulit secara real-time, rekomendasi ' +
          'produk perawatan kulit, tips perawatan kulit berdasarkan hasil scan. Dengan ' +
          'fitur ini, kamu bisa tracking perkembangan kondisi kulit dari waktu ke waktu.',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105258/aboutscan3_fsktx7.png',
        reverse: false
      }
    ];
  }

  getBlocks() {
    return this.blocks;
  }
}