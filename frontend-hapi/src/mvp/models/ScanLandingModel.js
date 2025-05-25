// src/mvp/models/ScanLandingModel.js

export default class ScanLandingModel {
  getScanLandingContents() {
    return {
      hero: {
        img: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105256/scanlanding_opyuew.png",
        title: "Mulai Scan Sekarang!",
        subtitle: "Cek wajahmu dan temukan solusinya."
      },
      callToAction: {
        subtitle: "Tunggu Apa Lagi?",
        title: "Ayo,\nMulai Cek Kondisi Wajahmu!",
        description:
          "Apakah kamu siap untuk menemukan solusi yang tepat dalam perawatan kulitmu? " +
          "Kami dapat membantu kamu mendapatkan analisis wajahmu!",
        button: {
          text: "Login Sekarang!",
          link: "/login"
        }
      },
      scanImg: "assets/img/scan-img.png"
    };
  }
}