// src/mvp/models/ArticleModel.js
export default class ArticleModel {
  constructor() {
    this.intro = {
      title: 'Artikel Terbaru',
      desc: 'Selamat datang di halaman artikel kami! Di sini, Anda akan menemukan berbagai artikel informatif dan tips seputar perawatan kulit, teknologi kesehatan, dan gaya hidup sehat. Kami berkomitmen untuk memberikan informasi terbaru dan terpercaya agar Anda dapat merawat diri dengan lebih baik.'
    };
    this.articles = [
      {
        id: 'article-1',
        title: 'Tips Merawat Kulit Wajah agar Tetap Sehat',
        desc: 'Perawatan kulit wajah yang tepat sangat penting untuk menjaga kesehatan dan kecantikan kulit. Pelajari langkah-langkah mudah yang dapat Anda lakukan setiap hari.',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105260/article1_j4e5av.png'
      },
      {
        id: 'article-2',
        title: 'Teknologi Scan Wajah dan Manfaatnya',
        desc: 'Teknologi scan wajah semakin populer dalam dunia perawatan kulit. Temukan bagaimana inovasi ini dapat membantu Anda mendapatkan diagnosis kulit yang akurat dan perawatan yang lebih personal.',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105260/article2_xv3jmd.png'
      },
      {
        id: 'article-3',
        title: 'Makanan Sehat untuk Kulit Bersih dan Cerah',
        desc: 'Apa yang kita konsumsi berpengaruh besar terhadap kondisi kulit. Pelajari makanan dan nutrisi yang dapat membantu menjaga kulit tetap cerah dan sehat dari dalam.',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105260/article3_ibho8n.png'
      }
    ];
  }

  getIntro() {
    return this.intro;
  }

  getArticles() {
    return this.articles;
  }
}