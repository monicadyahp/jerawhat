// src/mvp/models/Article1Model.js
export default class Article1Model {
  constructor() {
    this.tips = [
      {
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105258/article1a_kjww7a.png',
        title: 'Membersihkan wajah secara rutin',
        desc:
          'Membersihkan wajah dua kali sehari membantu menghilangkan kotoran, ' +
          'minyak, dan sisa makeup yang dapat menyumbat pori-pori dan menyebabkan jerawat.'
      },
      {
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105257/article1b_s67ioo.png',
        title: 'Gunakan pelembap sesuai jenis kulit',
        desc:
          'Pemilihan pelembap yang tepat sesuai jenis kulit (kering, berminyak, ' +
          'kombinasi) menjaga kelembapan kulit tanpa membuatnya berminyak berlebihan atau kering.'
      },
      {
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105256/article1c_xhr1ep.png',
        title: 'Perhatikan pola makan dan hidrasi',
        desc:
          'Mengonsumsi makanan sehat dan cukup minum air putih membantu menjaga ' +
          'elastisitas dan kelembapan kulit dari dalam, sehingga kulit tetap sehat dan bercahaya.'
      },
      {
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105255/article1d_jz9vbx.png',
        title: 'Hindari paparan sinar UV langsung',
        desc:
          'Melindungi kulit dari sinar matahari langsung dengan tabir surya mencegah ' +
          'kerusakan kulit, penuaan dini, dan munculnya flek hitam.'
      },
      {
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105257/article1e_l6popi.png',
        title: 'Rutin eksfoliasi dan maskeran',
        desc:
          'Eksfoliasi dan masker secara rutin membantu mengangkat sel kulit mati, ' +
          'membersihkan pori, dan memberikan nutrisi tambahan agar kulit tetap segar dan bersih.'
      },
      {
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105254/article1f_tb1prz.png',
        title: 'Istirahat yang cukup dan kelola stres',
        desc:
          'Tidur cukup dan mengelola stres penting untuk mengurangi produksi hormon ' +
          'penyebab jerawat dan menjaga kulit tetap sehat serta bercahaya.'
      }
    ];
  }

  getTips() {
    return this.tips;
  }
}