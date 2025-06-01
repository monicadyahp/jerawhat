// bertugas menyimpan semua data statis untuk Home
export default class HomeModel {
  constructor() {
    this.slides = [
      {
        groupImg: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105263/home1-img_lvfnys.png',
        detailsTitle: 'Jerawat Mengganggu?',
        detailsSubtitle: 'Kami Punya Solusinya!',
        dataSubtitle: 'Masalah Jerawat? Kami Pahami!',
        dataTitle: 'Wajah Kena Jerawat?\nJangan Khawatir, Kami Bantu!',
        dataDescription:
          'Apakah kamu merasa sedih karena jerawat yang muncul? ' +
          'Kami punya solusi untuk merawat dan mengatasi masalah kulitmu.',
        btnText: 'Cek Sekarang',
        btnLink: '/scanlanding'
      },
      {
        groupImg: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105261/home2-img_qdmyud.png',
        detailsTitle: 'Scan Wajah Mudah',
        detailsSubtitle: 'Deteksi Jerawat Instan!',
        dataSubtitle: 'Teknologi Canggih untuk Kulit Sehat',
        dataTitle: 'Scan Wajah\nDeteksi Jerawat\nDengan Mudah!',
        dataDescription:
          'Hanya dengan handphone untuk memindai wajah dan mengetahui ' +
          'kondisi kulit serta jerawat yang ada. Teknologi canggih untuk ' +
          'perawatan kulit yang lebih baik.',
        btnText: 'Cek Sekarang',
        btnLink: '/scanlanding'
      },
      {
        groupImg: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105264/home3-img_qkykrh.png',
        detailsTitle: 'Solusi Rekomendasi Sehat',
        detailsSubtitle: 'Kurangi Cepat Jerawat',
        dataSubtitle: 'Rekomendasi Sehat Untuk Kulit Bersih',
        dataTitle: 'Rekomendasi Sehat\nUntuk Kulit Bebas Jerawat!',
        dataDescription:
          'Kami memberikan rekomendasi makanan dan gaya hidup sehat yang dapat membantu ' +
          'mengurangi jerawat dan menjaga kulit tetap bersih dan cerah.',
        btnText: 'Cek Sekarang',
        btnLink: '/scanlanding'
      }
    ];
  }

  getSlides() {
    return this.slides;
  }
}