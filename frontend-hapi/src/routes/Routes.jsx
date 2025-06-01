// frontend-hapi > src > routes > Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Import semua komponen Container Anda
import Home from '../containers/HomeContainer';
import AboutScan from '../containers/AboutScanContainer';
import Article from '../containers/ArticleContainer';
import Article1 from '../containers/Article1Container';
import Article2 from '../containers/Article2Container';
import Article3 from '../containers/Article3Container';
import ScanLanding from '../containers/ScanLandingContainer';
import Scan from '../containers/ScanContainer';
import Login from '../containers/LoginContainer';
import Register from '../containers/RegisterContainer';
import Maps from '../containers/MapsContainer';
import AIChat from '../containers/AIChatContainer';
import ScanHistoryContainer from '../containers/ScanHistoryContainer';

// halaman baru: Kuis
import Quiz from '../containers/QuizContainer';

// halaman baru: Rekomendasi
import Recommendation from '../containers/RecommendationContainer';

// halaman profil
import Profile from '../containers/ProfileContainer'; // Pastikan ini ada!

// halaman footer/top-level
import AboutTeam from '../containers/AboutTeamContainer';
import OurMission from '../containers/OurMissionContainer';
import ContactUs from '../containers/ContactUsContainer';

// Komponen pembantu untuk membungkus Routes dengan AuthProvider
function AppContentWithAuth() {
  const { loading } = useAuth(); // Ambil status loading dari context

  // Data slides yang akan diteruskan ke HomeContainer
  const slides = [
    {
      groupImg: "https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/home-img_l6e0a8.png",
      detailsTitle: "Ghost",
      detailsSubtitle: "Jerawat",
      dataSubtitle: "Ghost",
      dataTitle: "Temukan\nJerawat\nAsli",
      dataDescription:
        "Jelajahi berbagai fitur yang menarik untuk menemukan jerawat yang kamu alami saat ini.",
      btnLink: "#about",
      btnText: "Jelajahi",
    },
    // Tambahkan slide lainnya sesuai kebutuhan aplikasi Anda
  ];

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#333'
      }}>
        Memuat autentikasi...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home slides={slides} />} />
      <Route path="/about-scan" element={<AboutScan />} />
      <Route path="/article" element={<Article />} />
      <Route path="/article-1" element={<Article1 />} />
      <Route path="/article-2" element={<Article2 />} />
      <Route path="/article-3" element={<Article3 />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/scanlanding" element={<ScanLanding />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rute untuk Kuis */}
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/quiz/:quizId" element={<Quiz />} />

      {/* Rute untuk Rekomendasi Produk */}
      <Route path="/rekomendasi" element={<Recommendation />} />

      {/* Rute untuk Profil - PASTIKAN BARIS INI ADA! */}
      <Route path="/profile" element={<Profile />} />

      {/* footer links */}
      <Route path="/about-team" element={<AboutTeam />} />
      <Route path="/our-mission" element={<OurMission />} />
      <Route path="/contact-us" element={<ContactUs />} />

      <Route path="/ai-chat" element={<AIChat />} />

      <Route path="/scan/history" element={<ScanHistoryContainer />} />
    </Routes>
  );
}

// Komponen utama yang akan di-export
export default function AppRoutes() {
  return (
    <AuthProvider>
      <AppContentWithAuth />
    </AuthProvider>
  );
}