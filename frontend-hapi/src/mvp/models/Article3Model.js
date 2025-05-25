// src/mvp/models/Article3Model.js

export default class Article3Model {
  constructor() {
    this.title = "Makanan Sehat untuk Kulit Bersih dan Cerah";
    this.intros = [
      "Apa yang kita konsumsi berpengaruh besar terhadap kondisi kulit. Makanan dan nutrisi yang tepat dapat membantu menjaga kulit tetap cerah, sehat, dan bersinar dari dalam.",
      "Mengonsumsi makanan yang kaya akan vitamin, mineral, dan antioksidan sangat penting untuk mendukung kesehatan kulit. Berikut beberapa makanan yang baik untuk kulit:"
    ];
    this.foods = [
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105250/article3a_dz6o38.png",
        title: "Buah-buahan",
        desc: "seperti beri, wortel, bayam, dan paprika yang kaya vitamin C dan beta-karoten."
      },
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105250/article3b_gl6wdo.png",
        title: "Kacang-kacangan",
        desc: "sumber vitamin E dan selenium, penting untuk melindungi kulit dari kerusakan akibat radikal bebas."
      },
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105250/article3c_rmaojd.png",
        title: "Ikan berlemak",
        desc: "seperti salmon dan makarel yang kaya omega-3 untuk mengurangi peradangan dan menjaga elastisitas kulit."
      },
      {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105250/article3d_gwdqik.png",
        title: "Air Putih",
        desc: "sangat penting untuk hidrasi kulit agar tetap lembap dan bercahaya."
      }
    ];
    this.outros = [
      "Selain mengonsumsi makanan sehat, hindari makanan berlemak tinggi, gula berlebih, dan makanan olahan yang dapat menyebabkan inflamasi dan merusak kulit.",
      "Kombinasi pola makan sehat dan gaya hidup yang baik akan membantu kulit Anda tetap cerah, bersih, dan sehat dari dalam."
    ];
  }

  getTitle() {
    return this.title;
  }
  getIntros() {
    return this.intros;
  }
  getFoods() {
    return this.foods;
  }
  getOutros() {
    return this.outros;
  }
}