// frontend-hapi > src > mvp > models > QuizModel.js
export default class QuizModel {
  constructor() {
    this.quizzes = [
      {
        id: 'jerawat',
        title: 'Kuis Seputar Jerawat',
        description: 'Uji pengetahuanmu tentang jerawat dan cara menanganinya!',
        questions: [
          {
            question: 'Apa penyebab utama timbulnya jerawat?',
            options: [
              { text: 'A. Konsumsi air putih yang banyak', isCorrect: false },
              { text: 'B. Produksi minyak berlebih (sebum) dan penyumbatan pori', isCorrect: true },
              { text: 'C. Sering mencuci muka', isCorrect: false },
              { text: 'D. Tidur cukup 8 jam sehari', isCorrect: false },
            ],
          },
          {
            question: 'Jerawat jenis apa yang umumnya berupa benjolan kecil berwarna putih?',
            options: [
              { text: 'A. Blackhead', isCorrect: false },
              { text: 'B. Papule', isCorrect: false },
              { text: 'C. Whitehead', isCorrect: true },
              { text: 'D. Cystic acne', isCorrect: false },
            ],
          },
          {
            question: 'Berapa kali sebaiknya mencuci muka dalam sehari untuk kulit berjerawat?',
            options: [
              { text: 'A. Sekali', isCorrect: false },
              { text: 'B. Dua kali', isCorrect: true },
              { text: 'C. Empat kali', isCorrect: false },
              { text: 'D. Setiap jam', isCorrect: false },
            ],
          },
          {
            question: 'Produk perawatan kulit berjerawat yang tidak dianjurkan adalah...',
            options: [
              { text: 'A. Salicylic Acid', isCorrect: false },
              { text: 'B. Benzoyl Peroxide', isCorrect: false },
              { text: 'C. Alkohol dan pewangi keras', isCorrect: true },
              { text: 'D. Retinoid', isCorrect: false },
            ],
          },
          {
            question: 'Makanan apa yang sering dikaitkan dengan pemicu jerawat pada beberapa orang?',
            options: [
              { text: 'A. Buah-buahan', isCorrect: false },
              { text: 'B. Sayuran hijau', isCorrect: false },
              { text: 'C. Makanan tinggi gula dan produk susu', isCorrect: true },
              { text: 'D. Ikan dan kacang-kacangan', isCorrect: false },
            ],
          },
          {
            question: 'Apa yang harus dihindari saat memiliki jerawat meradang?',
            options: [
              { text: 'A. Membersihkan wajah', isCorrect: false },
              { text: 'B. Menggunakan pelembap', isCorrect: false },
              { text: 'C. Memencet jerawat', isCorrect: true },
              { text: 'D. Menggunakan tabir surya', isCorrect: false },
            ],
          },
          {
            question: 'Jenis kulit yang paling rentan terhadap jerawat adalah...',
            options: [
              { text: 'A. Kulit kering', isCorrect: false },
              { text: 'B. Kulit normal', isCorrect: false },
              { text: 'C. Kulit berminyak', isCorrect: true },
              { text: 'D. Kulit sensitif', isCorrect: false },
            ],
          },
          {
            question: 'Apa fungsi utama pelembap bagi kulit berjerawat?',
            options: [
              { text: 'A. Membuat kulit semakin berminyak', isCorrect: false },
              { text: 'B. Menjaga hidrasi kulit dan mencegah iritasi', isCorrect: true },
              { text: 'C. Menutup pori-pori', isCorrect: false },
              { text: 'D. Sebagai pengganti tabir surya', isCorrect: false },
            ],
          },
          {
            question: 'Bagaimana peran stres terhadap jerawat?',
            options: [
              { text: 'A. Stres selalu menyebabkan jerawat', isCorrect: false },
              { text: 'B. Stres dapat memperburuk kondisi jerawat yang sudah ada', isCorrect: true },
              { text: 'C. Stres tidak berpengaruh sama sekali', isCorrect: false },
              { text: 'D. Stres justru menghilangkan jerawat', isCorrect: false },
            ],
          },
          {
            question: 'Apa istilah medis untuk jerawat?',
            options: [
              { text: 'A. Dermatitis', isCorrect: false },
              { text: 'B. Psoriasis', isCorrect: false },
              { text: 'C. Acne vulgaris', isCorrect: true },
              { text: 'D. Rosacea', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'komedo',
        title: 'Kuis Membasmi Komedo',
        description: 'Apakah kamu tahu cara efektif membasmi komedo?',
        questions: [
          {
            question: 'Apa itu komedo hitam (blackhead)?',
            options: [
              { text: 'A. Benjolan putih tertutup', isCorrect: false },
              { text: 'B. Pori yang terbuka dan tersumbat, menjadi hitam karena oksidasi', isCorrect: true },
              { text: 'C. Jerawat meradang', isCorrect: false },
              { text: 'D. Infeksi bakteri di kulit', isCorrect: false },
            ],
          },
          {
            question: 'Apa itu komedo putih (whitehead)?',
            options: [
              { text: 'A. Pori yang terbuka dan tersumbat', isCorrect: false },
              { text: 'B. Jerawat dengan nanah', isCorrect: false },
              { text: 'C. Pori yang tersumbat dan tertutup lapisan kulit tipis', isCorrect: true },
              { text: 'D. Rambut yang tumbuh ke dalam', isCorrect: false },
            ],
          },
          {
            question: 'Bahan aktif skincare apa yang efektif untuk mengatasi komedo?',
            options: [
              { text: 'A. Hyaluronic Acid', isCorrect: false },
              { text: 'B. Salicylic Acid (BHA)', isCorrect: true },
              { text: 'C. Vitamin C', isCorrect: false },
              { text: 'D. Ceramide', isCorrect: false },
            ],
          },
          {
            question: 'Mengapa memencet komedo sendiri tidak disarankan?',
            options: [
              { text: 'A. Membuat kulit lebih bersih', isCorrect: false },
              { text: 'B. Dapat menyebabkan peradangan, infeksi, dan bekas luka', isCorrect: true },
              { text: 'C. Mempercepat penyembuhan', isCorrect: false },
              { text: 'D. Tidak ada efek samping', isCorrect: false },
            ],
          },
          {
            question: 'Selain skincare, kebiasaan apa yang dapat membantu mengurangi komedo?',
            options: [
              { text: 'A. Tidur dengan makeup', isCorrect: false },
              { text: 'B. Membersihkan wajah setelah beraktivitas dan rutin eksfoliasi', isCorrect: true },
              { text: 'C. Menggunakan handuk yang sama berulang kali', isCorrect: false },
              { text: 'D. Menggosok wajah terlalu keras', isCorrect: false },
            ],
          },
          {
            question: 'Apa fungsi utama eksfoliasi dalam mengatasi komedo?',
            options: [
              { text: 'A. Melembapkan kulit', isCorrect: false },
              { text: 'B. Mengangkat sel kulit mati yang menyumbat pori', isCorrect: true },
              { text: 'C. Memberikan kilau instan pada kulit', isCorrect: false },
              { text: 'D. Melindungi dari sinar UV', isCorrect: false },
            ],
          },
          {
            question: 'Bagaimana cara terbaik membersihkan sisa makeup untuk mencegah komedo?',
            options: [
              { text: 'A. Cukup bilas dengan air', isCorrect: false },
              { text: 'B. Menggunakan cleansing oil/balm diikuti facial wash', isCorrect: true },
              { text: 'C. Hanya menggunakan tisu basah', isCorrect: false },
              { text: 'D. Biarkan semalaman agar menyerap', isCorrect: false },
            ],
          },
          {
            question: 'Tipe kulit apa yang paling sering mengalami komedo?',
            options: [
              { text: 'A. Kulit kering', isCorrect: false },
              { text: 'B. Kulit normal', isCorrect: false },
              { text: 'C. Kulit berminyak dan kombinasi', isCorrect: true },
              { text: 'D. Kulit sensitif', isCorrect: false },
            ],
          },
          {
            question: 'Masker wajah jenis apa yang dapat membantu membersihkan komedo?',
            options: [
              { text: 'A. Hydrating mask', isCorrect: false },
              { text: 'B. Clay mask atau charcoal mask', isCorrect: true },
              { text: 'C. Sheet mask', isCorrect: false },
              { text: 'D. Sleeping mask', isCorrect: false },
            ],
          },
          {
            question: 'Apa yang dimaksud dengan produk non-komedogenik?',
            options: [
              { text: 'A. Produk yang mengandung pewangi', isCorrect: false },
              { text: 'B. Produk yang tidak akan menyumbat pori-pori', isCorrect: true },
              { text: 'C. Produk yang membuat kulit kering', isCorrect: false },
              { text: 'D. Produk yang hanya untuk kulit berjerawat', isCorrect: false },
            ],
          },
        ],
      },
      // --- KUIS BARU DIMULAI DI SINI ---
      {
        id: 'kulit_kering',
        title: 'Kuis Kulit Kering',
        description: 'Pahami ciri-ciri dan perawatan terbaik untuk kulit keringmu.',
        questions: [
          {
            question: 'Bagaimana ciri utama kulit kering?',
            options: [
              { text: 'A. Kilap di T-zone', isCorrect: false },
              { text: 'B. Terasa kencang, kasar, atau bersisik', isCorrect: true },
              { text: 'C. Pori-pori besar', isCorrect: false },
              { text: 'D. Sering berjerawat', isCorrect: false },
            ],
          },
          {
            question: 'Bahan aktif skincare apa yang paling cocok untuk melembapkan kulit kering?',
            options: [
              { text: 'A. Salicylic Acid', isCorrect: false },
              { text: 'B. Benzoyl Peroxide', isCorrect: false },
              { text: 'C. Hyaluronic Acid dan Ceramide', isCorrect: true },
              { text: 'D. Retinol dosis tinggi', isCorrect: false },
            ],
          },
          {
            question: 'Frekuensi mencuci muka yang direkomendasikan untuk kulit kering adalah...',
            options: [
              { text: 'A. 3-4 kali sehari', isCorrect: false },
              { text: 'B. 1-2 kali sehari, dengan pembersih lembut', isCorrect: true },
              { text: 'C. Cukup bilas dengan air saja', isCorrect: false },
              { text: 'D. Menggunakan scrub setiap hari', isCorrect: false },
            ],
          },
          {
            question: 'Mengapa air panas tidak disarankan untuk mencuci muka kering?',
            options: [
              { text: 'A. Membuat kulit lebih bersih', isCorrect: false },
              { text: 'B. Dapat menghilangkan minyak alami kulit dan memperburuk kekeringan', isCorrect: true },
              { text: 'C. Memicu jerawat', isCorrect: false },
              { text: 'D. Tidak ada efek samping', isCorrect: false },
            ],
          },
          {
            question: 'Pelembap untuk kulit kering sebaiknya digunakan saat...',
            options: [
              { text: 'A. Hanya di malam hari', isCorrect: false },
              { text: 'B. Setelah mencuci muka, saat kulit masih sedikit lembap', isCorrect: true },
              { text: 'C. Kapan saja saat kulit terasa sangat kering', isCorrect: false },
              { text: 'D. Hanya saat menggunakan makeup', isCorrect: false },
            ],
          },
          {
            question: 'Kebiasaan makan apa yang dapat membantu kesehatan kulit kering?',
            options: [
              { text: 'A. Konsumsi makanan pedas', isCorrect: false },
              { text: 'B. Konsumsi makanan tinggi gula', isCorrect: false },
              { text: 'C. Konsumsi lemak sehat (alpukat, ikan berlemak) dan banyak air', isCorrect: true },
              { text: 'D. Minuman bersoda', isCorrect: false },
            ],
          },
          {
            question: 'Apa fungsi utama tabir surya bagi kulit kering?',
            options: [
              { text: 'A. Melembapkan kulit secara instan', isCorrect: false },
              { text: 'B. Mencegah kulit terbakar dan kerusakan kolagen', isCorrect: true },
              { text: 'C. Mengurangi produksi minyak', isCorrect: false },
              { text: 'D. Menyembuhkan jerawat', isCorrect: false },
            ],
          },
          {
            question: 'Apa yang harus diperhatikan saat memilih sabun mandi untuk kulit kering?',
            options: [
              { text: 'A. Sabun dengan busa melimpah', isCorrect: false },
              { text: 'B. Sabun yang berlabel "moisturizing" atau "pH seimbang"', isCorrect: true },
              { text: 'C. Sabun dengan wangi kuat', isCorrect: false },
              { text: 'D. Sabun antibakteri yang kuat', isCorrect: false },
            ],
          },
          {
            question: 'Bagaimana iklim dapat memengaruhi kulit kering?',
            options: [
              { text: 'A. Iklim lembap selalu memperburuk', isCorrect: false },
              { text: 'B. Iklim dingin dan kering dapat memperburuk kekeringan kulit', isCorrect: true },
              { text: 'C. Iklim panas selalu memperburuk', isCorrect: false },
              { text: 'D. Iklim tidak berpengaruh', isCorrect: false },
            ],
          },
          {
            question: 'Apa yang dimaksud dengan "skin barrier"?',
            options: [
              { text: 'A. Lapisan makeup di wajah', isCorrect: false },
              { text: 'B. Lapisan pelindung kulit yang menjaga kelembapan dan melindungi dari iritan', isCorrect: true },
              { text: 'C. Masker wajah', isCorrect: false },
              { text: 'D. Jaringan otot di bawah kulit', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'kulit_berminyak',
        title: 'Kuis Kulit Berminyak',
        description: 'Kenali kulit berminyak dan cara mengatasinya dengan tepat.',
        questions: [
          {
            question: 'Ciri utama kulit berminyak adalah...',
            options: [
              { text: 'A. Kulit terasa kencang dan bersisik', isCorrect: false },
              { text: 'B. Kulit terlihat berkilau, pori-pori besar, dan rentan komedo/jerawat', isCorrect: true },
              { text: 'C. Kulit mudah merah dan gatal', isCorrect: false },
              { text: 'D. Kulit jarang ada masalah', isCorrect: false },
            ],
          },
          {
            question: 'Bahan aktif skincare apa yang cocok untuk mengontrol minyak?',
            options: [
              { text: 'A. Hyaluronic Acid', isCorrect: false },
              { text: 'B. Niacinamide dan Clay/Charcoal', isCorrect: true },
              { text: 'C. Petroleum Jelly', isCorrect: false },
              { text: 'D. Minyak kelapa', isCorrect: false },
            ],
          },
          {
            question: 'Frekuensi mencuci muka untuk kulit berminyak adalah...',
            options: [
              { text: 'A. Lebih dari 3 kali sehari', isCorrect: false },
              { text: 'B. 2 kali sehari dengan pembersih gel/busa yang gentle', isCorrect: true },
              { text: 'C. Cukup sekali sehari', isCorrect: false },
              { text: 'D. Tidak perlu dicuci, cukup dibilas air', isCorrect: false },
            ],
          },
          {
            question: 'Mengapa kulit berminyak tetap butuh pelembap?',
            options: [
              { text: 'A. Agar lebih berminyak', isCorrect: false },
              { text: 'B. Untuk menjaga hidrasi, mencegah dehidrasi yang memicu produksi minyak lebih lanjut', isCorrect: true },
              { text: 'C. Hanya untuk kulit kering', isCorrect: false },
              { text: 'D. Tidak ada fungsinya untuk kulit berminyak', isCorrect: false },
            ],
          },
          {
            question: 'Tekstur pelembap seperti apa yang cocok untuk kulit berminyak?',
            options: [
              { text: 'A. Krim tebal', isCorrect: false },
              { text: 'B. Gel atau lotion ringan, non-komedogenik', isCorrect: true },
              { text: 'C. Salep', isCorrect: false },
              { text: 'D. Minyak wajah', isCorrect: false },
            ],
          },
          {
            question: 'Apakah blotting paper baik untuk kulit berminyak?',
            options: [
              { text: 'A. Tidak, karena menyumbat pori', isCorrect: false },
              { text: 'B. Ya, untuk menyerap minyak berlebih tanpa menggeser makeup', isCorrect: true },
              { text: 'C. Hanya di malam hari', isCorrect: false },
              { text: 'D. Tidak perlu, karena akan memicu jerawat', isCorrect: false },
            ],
          },
          {
            question: 'Apa fungsi primer makeup untuk kulit berminyak?',
            options: [
              { text: 'A. Menambah kilau', isCorrect: false },
              { text: 'B. Mengontrol minyak dan membuat makeup lebih tahan lama', isCorrect: true },
              { text: 'C. Menambah coverage', isCorrect: false },
              { text: 'D. Tidak ada fungsi spesifik', isCorrect: false },
            ],
          },
          {
            question: 'Mengapa diet tinggi gula seringkali memicu masalah kulit berminyak?',
            options: [
              { text: 'A. Memperbaiki tekstur kulit', isCorrect: false },
              { text: 'B. Meningkatkan produksi hormon yang merangsang kelenjar minyak', isCorrect: true },
              { text: 'C. Menurunkan kadar gula darah', isCorrect: false },
              { text: 'D. Tidak ada hubungannya', isCorrect: false },
            ],
          },
          {
            question: 'Jenis masker wajah apa yang bagus untuk kulit berminyak?',
            options: [
              { text: 'A. Hydrating sheet mask', isCorrect: false },
              { text: 'B. Clay mask atau mud mask', isCorrect: true },
              { text: 'C. Peel-off mask dengan alkohol', isCorrect: false },
              { text: 'D. Sleeping mask yang kaya minyak', isCorrect: false },
            ],
          },
          {
            question: 'Apa manfaat eksfoliasi rutin (1-2x seminggu) bagi kulit berminyak?',
            options: [
              { text: 'A. Membuat kulit lebih kering', isCorrect: false },
              { text: 'B. Mengangkat sel kulit mati dan mencegah penyumbatan pori', isCorrect: true },
              { text: 'C. Meningkatkan produksi minyak', isCorrect: false },
              { text: 'D. Tidak ada manfaatnya', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'kulit_sensitif',
        title: 'Kuis Kulit Sensitif',
        description: 'Pelajari cara merawat kulit sensitif agar tidak mudah iritasi.',
        questions: [
          {
            question: 'Ciri utama kulit sensitif adalah...',
            options: [
              { text: 'A. Mudah berkilau dan berjerawat', isCorrect: false },
              { text: 'B. Mudah memerah, gatal, terasa terbakar, atau alergi', isCorrect: true },
              { text: 'C. Terasa kencang dan bersisik', isCorrect: false },
              { text: 'D. Pori-pori besar', isCorrect: false },
            ],
          },
          {
            question: 'Bahan apa yang sebaiknya dihindari dalam produk skincare untuk kulit sensitif?',
            options: [
              { text: 'A. Hyaluronic Acid', isCorrect: false },
              { text: 'B. Fragrance (pewangi), alkohol, dan paraben', isCorrect: true },
              { text: 'C. Glycerin', isCorrect: false },
              { text: 'D. Ceramide', isCorrect: false },
            ],
          },
          {
            question: 'Bagaimana cara terbaik membersihkan wajah sensitif?',
            options: [
              { text: 'A. Menggunakan scrub setiap hari', isCorrect: false },
              { text: 'B. Menggunakan pembersih yang lembut, bebas sabun, dan air suam-suam kuku', isCorrect: true },
              { text: 'C. Mencuci muka 5 kali sehari', isCorrect: false },
              { text: 'D. Menggunakan sabun antibakteri kuat', isCorrect: false },
            ],
          },
          {
            question: 'Pentingnya uji patch (patch test) sebelum memakai produk baru pada kulit sensitif adalah...',
            options: [
              { text: 'A. Untuk mengetahui harganya', isCorrect: false },
              { text: 'B. Untuk memastikan tidak ada reaksi alergi atau iritasi', isCorrect: true },
              { text: 'C. Untuk melihat tekstur produk', isCorrect: false },
              { text: 'D. Untuk memastikan warna produk cocok', isCorrect: false },
            ],
          },
          {
            question: 'Apa fungsi utama pelembap untuk kulit sensitif?',
            options: [
              { text: 'A. Memicu jerawat', isCorrect: false },
              { text: 'B. Memperkuat skin barrier dan mengurangi iritasi', isCorrect: true },
              { text: 'C. Mencerahkan kulit secara instan', isCorrect: false },
              { text: 'D. Sebagai pengganti SPF', isCorrect: false },
            ],
          },
          {
            question: 'Makanan apa yang sebaiknya dihindari jika memiliki kulit sensitif?',
            options: [
              { text: 'A. Buah-buahan segar', isCorrect: false },
              { text: 'B. Makanan pedas dan alergen umum (jika sensitif terhadapnya)', isCorrect: true },
              { text: 'C. Sayuran hijau', isCorrect: false },
              { text: 'D. Ikan berlemak', isCorrect: false },
            ],
          },
          {
            question: 'Bagaimana cara memilih tabir surya yang tepat untuk kulit sensitif?',
            options: [
              { text: 'A. Pilih SPF tinggi saja', isCorrect: false },
              { text: 'B. Pilih tabir surya fisik (mineral) dengan zinc oxide/titanium dioxide', isCorrect: true },
              { text: 'C. Pilih yang beraroma kuat', isCorrect: false },
              { text: 'D. Pilih yang mengandung alkohol', isCorrect: false },
            ],
          },
          {
            question: 'Apa efek buruk menggosok wajah terlalu keras pada kulit sensitif?',
            options: [
              { text: 'A. Membuat kulit lebih bersih', isCorrect: false },
              { text: 'B. Menyebabkan kemerahan, iritasi, dan kerusakan skin barrier', isCorrect: true },
              { text: 'C. Mencerahkan kulit', isCorrect: false },
              { text: 'D. Mengecilkan pori-pori', isCorrect: false },
            ],
          },
          {
            question: 'Jenis air apa yang lebih baik digunakan untuk mencuci wajah sensitif?',
            options: [
              { text: 'A. Air panas', isCorrect: false },
              { text: 'B. Air dingin', isCorrect: false },
              { text: 'C. Air suam-suam kuku', isCorrect: true },
              { text: 'D. Air es', isCorrect: false },
            ],
          },
          {
            question: 'Apa tanda kulit sensitif sedang mengalami reaksi?',
            options: [
              { text: 'A. Kulit terasa lebih lembap', isCorrect: false },
              { text: 'B. Muncul kemerahan, gatal, sensasi perih atau terbakar', isCorrect: true },
              { text: 'C. Kulit menjadi lebih kencang', isCorrect: false },
              { text: 'D. Pori-pori mengecil', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'pembersih_wajah',
        title: 'Kuis Pembersih Wajah',
        description: 'Seberapa jauh kamu memahami pentingnya pembersih wajah?',
        questions: [
          {
            question: 'Berapa kali idealnya wajah dibersihkan dalam sehari?',
            options: [
              { text: 'A. Sekali', isCorrect: false },
              { text: 'B. Dua kali (pagi dan malam)', isCorrect: true },
              { text: 'C. Setiap kali merasa kotor', isCorrect: false },
              { text: 'D. Tidak perlu dicuci setiap hari', isCorrect: false },
            ],
          },
          {
            question: 'Apa fungsi utama pembersih wajah?',
            options: [
              { text: 'A. Melembapkan kulit', isCorrect: false },
              { text: 'B. Mengangkat kotoran, minyak, makeup, dan sel kulit mati', isCorrect: true },
              { text: 'C. Mengencangkan kulit', isCorrect: false },
              { text: 'D. Melindungi dari sinar UV', isCorrect: false },
            ],
          },
          {
            question: 'Apakah mencuci muka hanya dengan air sudah cukup?',
            options: [
              { text: 'A. Ya, selalu cukup', isCorrect: false },
              { text: 'B. Tidak, air saja tidak cukup mengangkat minyak dan kotoran secara maksimal', isCorrect: true },
              { text: 'C. Cukup untuk kulit berminyak', isCorrect: false },
              { text: 'D. Cukup jika tidak pakai makeup', isCorrect: false },
            ],
          },
          {
            question: 'Apa yang dimaksud dengan "double cleansing"?',
            options: [
              { text: 'A. Mencuci muka dua kali dengan sabun yang sama', isCorrect: false },
              { text: 'B. Menggunakan pembersih berbasis minyak, lalu pembersih berbasis air', isCorrect: true },
              { text: 'C. Mencuci muka dengan dua jenis air berbeda', isCorrect: false },
              { text: 'D. Mencuci muka dan rambut sekaligus', isCorrect: false },
            ],
          },
          {
            question: 'Jenis pembersih wajah apa yang cocok untuk kulit berminyak?',
            options: [
              { text: 'A. Cleansing balm', isCorrect: false },
              { text: 'B. Gel atau foam cleanser yang ringan', isCorrect: true },
              { text: 'C. Cleansing oil', isCorrect: false },
              { text: 'D. Cleansing milk yang kaya pelembap', isCorrect: false },
            ],
          },
          {
            question: 'Mengapa pembersih wajah berbusa melimpah belum tentu yang terbaik?',
            options: [
              { text: 'A. Busa banyak berarti bersih total', isCorrect: false },
              { text: 'B. Busa berlebihan bisa menandakan kandungan deterjen keras yang mengeringkan kulit', isCorrect: true },
              { text: 'C. Busa membuat kulit terasa lebih segar', isCorrect: false },
              { text: 'D. Busa tidak berpengaruh pada kulit', isCorrect: false },
            ],
          },
          {
            question: 'Apakah pembersih wajah bisa mengatasi jerawat secara langsung?',
            options: [
              { text: 'A. Ya, itu satu-satunya cara', isCorrect: false },
              { text: 'B. Tidak, pembersih wajah membantu menjaga kebersihan dan mencegah, bukan mengobati', isCorrect: true },
              { text: 'C. Hanya pembersih mahal', isCorrect: false },
              { text: 'D. Tergantung mereknya', isCorrect: false },
            ],
          },
          {
            question: 'Suhu air terbaik untuk mencuci wajah adalah...',
            options: [
              { text: 'A. Air panas', isCorrect: false },
              { text: 'B. Air dingin', isCorrect: false },
              { text: 'C. Air suam-suam kuku', isCorrect: true },
              { text: 'D. Air es', isCorrect: false },
            ],
          },
          {
            question: 'Setelah mencuci wajah, apa yang sebaiknya dilakukan?',
            options: [
              { text: 'A. Biarkan kering sendiri', isCorrect: false },
              { text: 'B. Keringkan dengan menepuk-nepuk lembut menggunakan handuk bersih', isCorrect: true },
              { text: 'C. Gosok keras dengan handuk', isCorrect: false },
              { text: 'D. Langsung pakai makeup', isCorrect: false },
            ],
          },
          {
            question: 'Apa bahaya tidur tanpa membersihkan wajah?',
            options: [
              { text: 'A. Tidak ada bahaya', isCorrect: false },
              { text: 'B. Menyumbat pori, memicu jerawat, dan penuaan dini', isCorrect: true },
              { text: 'C. Membuat kulit lebih sehat', isCorrect: false },
              { text: 'D. Membuat kulit lebih cerah', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'sunscreen',
        title: 'Kuis Pentingnya Sunscreen',
        description: 'Seberapa tahu kamu tentang perlindungan kulit dari matahari?',
        questions: [
          {
            question: 'Apa fungsi utama sunscreen (tabir surya)?',
            options: [
              { text: 'A. Mencerahkan kulit', isCorrect: false },
              { text: 'B. Melindungi kulit dari radiasi UV matahari', isCorrect: true },
              { text: 'C. Melembapkan kulit', isCorrect: false },
              { text: 'D. Mengobati jerawat', isCorrect: false },
            ],
          },
          {
            question: 'Apa perbedaan SPF dan PA pada sunscreen?',
            options: [
              { text: 'A. SPF untuk UVA, PA untuk UVB', isCorrect: false },
              { text: 'B. SPF untuk UVB, PA untuk UVA', isCorrect: true },
              { text: 'C. SPF untuk jerawat, PA untuk flek hitam', isCorrect: false },
              { text: 'D. Keduanya sama saja', isCorrect: false },
            ],
          },
          {
            question: 'Berapa SPF minimal yang direkomendasikan untuk penggunaan sehari-hari?',
            options: [
              { text: 'A. SPF 15', isCorrect: false },
              { text: 'B. SPF 30', isCorrect: true },
              { text: 'C. SPF 5', isCorrect: false },
              { text: 'D. SPF 100', isCorrect: false },
            ],
          },
          {
            question: 'Kapan sebaiknya sunscreen diaplikasikan?',
            options: [
              { text: 'A. Hanya saat di pantai', isCorrect: false },
              { text: 'B. Setiap hari, bahkan saat mendung atau di dalam ruangan dekat jendela', isCorrect: true },
              { text: 'C. Hanya saat kulit terasa panas', isCorrect: false },
              { text: 'D. Hanya saat berolahraga', isCorrect: false },
            ],
          },
          {
            question: 'Apakah anak-anak perlu menggunakan sunscreen?',
            options: [
              { text: 'A. Tidak, kulit anak-anak kuat', isCorrect: false },
              { text: 'B. Ya, kulit anak-anak lebih sensitif terhadap kerusakan UV', isCorrect: true },
              { text: 'C. Hanya jika mereka bermain di luar sangat lama', isCorrect: false },
              { text: 'D. Tidak perlu, karena kulit mereka akan melindungi diri sendiri', isCorrect: false },
            ],
          },
          {
            question: 'Bagaimana cara re-apply sunscreen yang benar?',
            options: [
              { text: 'A. Hanya sekali sehari sudah cukup', isCorrect: false },
              { text: 'B. Setiap 2-3 jam, atau lebih sering jika berkeringat/berenang', isCorrect: true },
              { text: 'C. Hanya jika wajah terasa kering', isCorrect: false },
              { text: 'D. Setiap 5 jam sekali', isCorrect: false },
            ],
          },
          {
            question: 'Apa efek jangka panjang paparan UV tanpa perlindungan?',
            options: [
              { text: 'A. Kulit lebih cerah', isCorrect: false },
              { text: 'B. Penuaan dini, flek hitam, dan risiko kanker kulit', isCorrect: true },
              { text: 'C. Kulit jadi lebih kuat', isCorrect: false },
              { text: 'D. Tidak ada efek buruk', isCorrect: false },
            ],
          },
          {
            question: 'Apakah sunscreen yang waterproof perlu re-apply?',
            options: [
              { text: 'A. Tidak, cukup sekali', isCorrect: false },
              { text: 'B. Ya, waterproof hanya berarti tahan air lebih lama, tetap perlu re-apply', isCorrect: true },
              { text: 'C. Hanya jika berenang', isCorrect: false },
              { text: 'D. Hanya jika kulit terasa kering', isCorrect: false },
            ],
          },
          {
            question: 'Apa itu chemical sunscreen?',
            options: [
              { text: 'A. Sunscreen yang meninggalkan whitecast', isCorrect: false },
              { text: 'B. Sunscreen yang menyerap sinar UV dan mengubahnya jadi panas', isCorrect: true },
              { text: 'C. Sunscreen yang membentuk lapisan fisik di kulit', isCorrect: false },
              { text: 'D. Sunscreen yang hanya cocok untuk kulit sensitif', isCorrect: false },
            ],
          },
          {
            question: 'Apa itu physical/mineral sunscreen?',
            options: [
              { text: 'A. Sunscreen yang menyerap sinar UV', isCorrect: false },
              { text: 'B. Sunscreen yang memantulkan sinar UV dengan zinc oxide/titanium dioxide', isCorrect: true },
              { text: 'C. Sunscreen yang tidak cocok untuk kulit sensitif', isCorrect: false },
              { text: 'D. Sunscreen yang membuat kulit berminyak', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'fleksibilitas_kulit',
        title: 'Kuis Fleksibilitas Kulit',
        description: 'Seberapa elastis kulitmu dan bagaimana cara mempertahankannya?',
        questions: [
          {
            question: 'Apa yang dimaksud dengan elastisitas kulit?',
            options: [
              { text: 'A. Kemampuan kulit untuk menyerap air', isCorrect: false },
              { text: 'B. Kemampuan kulit untuk meregang dan kembali ke bentuk semula', isCorrect: true },
              { text: 'C. Tingkat kelembapan kulit', isCorrect: false },
              { text: 'D. Kekuatan kulit menahan jerawat', isCorrect: false },
            ],
          },
          {
            question: 'Protein apa yang berperan penting dalam elastisitas kulit?',
            options: [
              { text: 'A. Keratin', isCorrect: false },
              { text: 'B. Kolagen dan Elastin', isCorrect: true },
              { text: 'C. Asam Hyaluronic', isCorrect: false },
              { text: 'D. Melanin', isCorrect: false },
            ],
          },
          {
            question: 'Faktor eksternal apa yang paling cepat mengurangi elastisitas kulit?',
            options: [
              { text: 'A. Tidur cukup', isCorrect: false },
              { text: 'B. Paparan sinar matahari (UV) dan polusi', isCorrect: true },
              { text: 'C. Menggunakan pelembap', isCorrect: false },
              { text: 'D. Diet seimbang', isCorrect: false },
            ],
          },
          {
            question: 'Selain usia, kebiasaan hidup apa yang dapat mempercepat hilangnya elastisitas kulit?',
            options: [
              { text: 'A. Minum air putih yang cukup', isCorrect: false },
              { text: 'B. Merokok dan konsumsi gula berlebihan', isCorrect: true },
              { text: 'C. Olahraga teratur', isCorrect: false },
              { text: 'D. Tidur 8 jam sehari', isCorrect: false },
            ],
          },
          {
            question: 'Bahan aktif skincare apa yang dikenal dapat membantu meningkatkan produksi kolagen?',
            options: [
              { text: 'A. Salicylic Acid', isCorrect: false },
              { text: 'B. Retinoid (Vitamin A) dan Vitamin C', isCorrect: true },
              { text: 'C. Benzoyl Peroxide', isCorrect: false },
              { text: 'D. Tea Tree Oil', isCorrect: false },
            ],
          },
          {
            question: 'Bagaimana hidrasi yang cukup mempengaruhi elastisitas kulit?',
            options: [
              { text: 'A. Tidak berpengaruh', isCorrect: false },
              { text: 'B. Menjaga kulit tetap kenyal dan mendukung fungsi kolagen/elastin', isCorrect: true },
              { text: 'C. Membuat kulit lebih berminyak', isCorrect: false },
              { text: 'D. Hanya berpengaruh pada warna kulit', isCorrect: false },
            ],
          },
          {
            question: 'Area wajah mana yang seringkali menjadi tanda pertama hilangnya elastisitas?',
            options: [
              { text: 'A. Dagu', isCorrect: false },
              { text: 'B. Sekitar mata dan mulut', isCorrect: true },
              { text: 'C. Dahi', isCorrect: false },
              { text: 'D. Hidung', isCorrect: false },
            ],
          },
          {
            question: 'Pentingnya pijat wajah secara teratur untuk elastisitas kulit adalah...',
            options: [
              { text: 'A. Tidak ada efeknya', isCorrect: false },
              { text: 'B. Melancarkan sirkulasi darah dan merangsang produksi kolagen', isCorrect: true },
              { text: 'C. Hanya untuk relaksasi otot', isCorrect: false },
              { text: 'D. Menyebabkan kerutan baru', isCorrect: false },
            ],
          },
          {
            question: 'Makanan kaya antioksidan seperti buah beri dan sayuran hijau berperan dalam menjaga elastisitas karena...',
            options: [
              { text: 'A. Mengandung banyak gula', isCorrect: false },
              { text: 'B. Melindungi kulit dari kerusakan radikal bebas', isCorrect: true },
              { text: 'C. Mempercepat penyerapan vitamin', isCorrect: false },
              { text: 'D. Hanya berfungsi untuk pencernaan', isCorrect: false },
            ],
          },
          {
            question: 'Apa yang dimaksud dengan "sagging skin"?',
            options: [
              { text: 'A. Kulit yang terlalu kencang', isCorrect: false },
              { text: 'B. Kulit yang kehilangan kekenyalan dan tampak kendur', isCorrect: true },
              { text: 'C. Kulit yang sangat lembap', isCorrect: false },
              { text: 'D. Kulit yang mudah berjerawat', isCorrect: false },
            ],
          },
        ],
      },
      {
        id: 'makanan_kulit_sehat',
        title: 'Kuis Makanan & Kulit Sehat',
        description: 'Pelajari bagaimana makanan mempengaruhi kesehatan dan kecantikan kulitmu.',
        questions: [
          {
            question: 'Nutrisi apa yang paling penting untuk menjaga kelembapan kulit dari dalam?',
            options: [
              { text: 'A. Protein', isCorrect: false },
              { text: 'B. Asam Lemak Omega-3 dan air yang cukup', isCorrect: true },
              { text: 'C. Karbohidrat', isCorrect: false },
              { text: 'D. Gula', isCorrect: false },
            ],
          },
          {
            question: 'Vitamin apa yang dikenal sebagai "vitamin kulit" karena perannya dalam regenerasi sel dan perlindungan antioksidan?',
            options: [
              { text: 'A. Vitamin B', isCorrect: false },
              { text: 'B. Vitamin C dan E', isCorrect: true },
              { text: 'C. Vitamin K', isCorrect: false },
              { text: 'D. Vitamin D', isCorrect: false },
            ],
          },
          {
            question: 'Makanan tinggi gula dan olahan seringkali dikaitkan dengan masalah kulit seperti jerawat karena...',
            options: [
              { text: 'A. Menyediakan energi instan', isCorrect: false },
              { text: 'B. Memicu peradangan dan meningkatkan produksi sebum', isCorrect: true },
              { text: 'C. Membuat kulit lebih cerah', isCorrect: false },
              { text: 'D. Mengandung serat tinggi', isCorrect: false },
            ],
          },
          {
            question: 'Sumber protein tanpa lemak (lean protein) penting untuk kulit karena berfungsi dalam...',
            options: [
              { text: 'A. Memberikan energi untuk aktivitas', isCorrect: false },
              { text: 'B. Produksi kolagen dan perbaikan jaringan kulit', isCorrect: true },
              { text: 'C. Mengontrol kadar gula darah', isCorrect: false },
              { text: 'D. Meningkatkan nafsu makan', isCorrect: false },
            ],
          },
          {
            question: 'Buah-buahan berwarna cerah seperti jeruk dan stroberi baik untuk kulit karena kaya akan...',
            options: [
              { text: 'A. Lemak', isCorrect: false },
              { text: 'B. Antioksidan (terutama Vitamin C)', isCorrect: true },
              { text: 'C. Pati', isCorrect: false },
              { text: 'D. Garam', isCorrect: false },
            ],
          },
          {
            question: 'Sayuran hijau gelap seperti bayam dan kale mengandung vitamin dan mineral yang mendukung kesehatan kulit, salah satunya adalah...',
            options: [
              { text: 'A. Vitamin D', isCorrect: false },
              { text: 'B. Vitamin K dan A', isCorrect: true },
              { text: 'C. Vitamin B12', isCorrect: false },
              { text: 'D. Kalsium', isCorrect: false },
            ],
          },
          {
            question: 'Apakah produk susu selalu menyebabkan masalah kulit pada semua orang?',
            options: [
              { text: 'A. Ya, selalu', isCorrect: false },
              { text: 'B. Tidak, hanya pada individu tertentu yang sensitif', isCorrect: true },
              { text: 'C. Hanya pada remaja', isCorrect: false },
              { text: 'D. Tidak pernah', isCorrect: false },
            ],
          },
          {
            question: 'Zat gizi mikro (trace mineral) seperti Zinc penting untuk kulit karena...',
            options: [
              { text: 'A. Memberi warna pada kulit', isCorrect: false },
              { text: 'B. Mendukung penyembuhan luka dan mengurangi peradangan jerawat', isCorrect: true },
              { text: 'C. Membuat kulit lebih berkilau', isCorrect: false },
              { text: 'D. Hanya berfungsi untuk rambut', isCorrect: false },
            ],
          },
          {
            question: 'Teh hijau dikenal memiliki manfaat anti-inflamasi dan antioksidan untuk kulit. Senyawa aktif di dalamnya adalah...',
            options: [
              { text: 'A. Kafein', isCorrect: false },
              { text: 'B. Katekin (EGCG)', isCorrect: true },
              { text: 'C. Tannin', isCorrect: false },
              { text: 'D. L-Theanine', isCorrect: false },
            ],
          },
          {
            question: 'Pentingnya air putih bagi kesehatan kulit adalah...',
            options: [
              { text: 'A. Hanya untuk membasuh wajah', isCorrect: false },
              { text: 'B. Menjaga hidrasi kulit, elastisitas, dan membantu detoksifikasi', isCorrect: true },
              { text: 'C. Membuat kulit kering', isCorrect: false },
              { text: 'D. Tidak ada pengaruhnya pada kulit', isCorrect: false },
            ],
          },
        ],
      },
    ];
  }

  getAllQuizzes() {
    return this.quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questionCount: quiz.questions.length,
    }));
  }

  getQuizById(id) {
    return this.quizzes.find(quiz => quiz.id === id);
  }
}