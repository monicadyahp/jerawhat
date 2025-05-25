// src/mvp/models/Article2Model.js

export default class Article2Model {
  constructor() {
    this.title = "Teknologi Scan Wajah dan Manfaatnya";
    this.intro = [
      "Teknologi scan wajah semakin populer dalam dunia perawatan kulit. Temukan bagaimana inovasi ini dapat membantu Anda mendapatkan diagnosis kulit yang akurat dan perawatan yang lebih personal.",
      "Teknologi ini menggunakan algoritma canggih yang mampu memetakan kondisi kulit wajah secara detail. Dengan data yang diperoleh, profesional kecantikan dan dermatolog dapat memberikan rekomendasi perawatan yang lebih tepat dan efektif. Manfaatnya yaitu sebagai berikut:"
    ];
    this.benefits = [
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105253/article2a_rlsmow.png",
        title: "Diagnosa Kulit Akurat",
        desc: "Mengidentifikasi masalah kulit seperti jerawat, komedo, penuaan dini, dan pigmentasi secara lebih tepat."
      },
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105253/article2b_awexui.png",
        title: "Personalisasi Perawatan",
        desc: "Memberikan rekomendasi perawatan yang sesuai dengan kondisi kulit individual."
      },
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/article2c_mzonuy.png",
        title: "Monitoring Perkembangan",
        desc: "Melacak perubahan kondisi kulit dari waktu ke waktu untuk menilai efektivitas perawatan."
      },
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105251/article2d_ar4blp.png",
        title: "Hasil Lebih Optimal",
        desc: "Membantu mendapatkan hasil perawatan yang maksimal dan sesuai harapan."
      }
    ];
    this.outro = "Dengan mengadopsi teknologi ini, proses perawatan kulit menjadi lebih modern, efisien, dan hasilnya dapat dipantau secara berkala untuk memastikan kulit tetap sehat dan bercahaya.";
  }

  getTitle() {
    return this.title;
  }

  getIntro() {
    return this.intro;
  }

  getBenefits() {
    return this.benefits;
  }

  getOutro() {
    return this.outro;
  }
}