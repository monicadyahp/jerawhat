// src/mvp/models/AboutTeamModel.js

export default class AboutTeamModel {
  getTeamMembers() {
    return [
      {
        id: 'FC254D5X0436',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105268/febe1_xyiyes.png',
        name: 'Monica Dyah Pudyowati',
        role: 'Front End & Back End',
        univ: 'Universitas Mercu Buana'
      },
      {
        id: 'FC012D5X1271',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105266/febe2_kmkk3h.png',
        name: 'Gisa Kayla Syahla',
        role: 'Front End & Back End',
        univ: 'Universitas Telkom'
      },
      {
        id: 'FC427D5Y1773',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/febe3_ql8ufb.png',
        name: 'Muhammad Ikhsan Rizki Pratama',
        role: 'Front End & Back End',
        univ: 'Universitas Bina Insan'
      },
      {
        id: 'MC589D5X2488',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105262/ml1_lrowrq.png',
        name: 'Miranda Bintang Maharani Sigalingging',
        role: 'Machine Learning',
        univ: 'Universitas Pertahanan'
      },
      {
        id: 'MC589D5X2472',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105266/ml2_o0wzaw.png',
        name: 'Sufi Naylil Karomah',
        role: 'Machine Learning',
        univ: 'Universitas Pertahanan'
      },
      {
        id: 'MC012D5Y2399',
        img: 'https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/ml3_xqoncd.png',
        name: 'Athari Ashdaq',
        role: 'Machine Learning',
        univ: 'Universitas Telkom'
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