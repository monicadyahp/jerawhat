// src/mvp/models/AboutTeamModel.js

export default class AboutTeamModel {
  getTeamMembers() {
    return [
      {
        id: 'FC254D5X0436',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105268/febe1_xyiyes.png',
        name: 'Monica Dyah Pudyowati',
        role: 'Front End & Back End',
        univ: 'Universitas Mercu Buana',
        linkedin: 'https://www.linkedin.com/in/monica-dyah-pudyowati-5b3a4a2b2' // Ganti dengan URL LinkedIn Monica
      },
      {
        id: 'FC012D5X1271',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105266/febe2_kmkk3h.png',
        name: 'Gisa Kayla Syahla',
        role: 'Front End & Back End',
        univ: 'Universitas Telkom',
        linkedin: 'https://www.linkedin.com/in/gisa-kayla-syahla-539835234'
      },
      {
        id: 'FC427D5Y1773',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/febe3_ql8ufb.png',
        name: 'Muhammad Ikhsan Rizki Pratama',
        role: 'Front End & Back End',
        univ: 'Universitas Bina Insan',
        linkedin: 'https://www.linkedin.com/in/ikhsan-rizki-0b4642351/' 
      },
      {
        id: 'MC589D5X2488',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105262/ml1_lrowrq.png',
        name: 'Miranda Bintang Maharani Sigalingging',
        role: 'Machine Learning',
        univ: 'Universitas Pertahanan',
        linkedin: 'https://www.linkedin.com/in/mirandasigalingging?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      },
      {
        id: 'MC589D5X2472',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105266/ml2_o0wzaw.png',
        name: 'Sufi Naylil Karomah',
        role: 'Machine Learning',
        univ: 'Universitas Pertahanan',
        linkedin: 'https://www.linkedin.com/in/sufi-naylil-19b649351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      },
      {
        id: 'MC012D5Y2399',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/ml3_xqoncd.png',
        name: 'Athari Ashdaq',
        role: 'Machine Learning',
        univ: 'Universitas Telkom',
        linkedin: 'https://www.linkedin.com/in/atheash?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
      }
    ];
  }

  getTitle() {
    return "Team Profile";
  }

  getDescription() {
    return "Kami adalah tim mahasiswa yang tergabung dalam Capstone Team CC25-CF146 Coding Camp 2025.";
  }
}