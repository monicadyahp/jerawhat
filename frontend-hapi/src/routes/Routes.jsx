// src/routes/Routes.jsx
import { Routes, Route } from 'react-router-dom';

// halaman utama
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

// halaman baru: Kuis
import Quiz from '../containers/QuizContainer';

// halaman baru: Rekomendasi
import Recommendation from '../containers/RecommendationContainer'; // <-- Import RecommendationContainer

// halaman profil
import Profile from '../containers/ProfileContainer';

// halaman footer/top-level
import AboutTeam from '../containers/AboutTeamContainer';
import OurMission from '../containers/OurMissionContainer';
import ContactUs from '../containers/ContactUsContainer';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
      {/* Anda bisa passing kondisi via query params: /rekomendasi?conditions=jerawat_parah,kulit_berminyak */}
      <Route path="/rekomendasi" element={<Recommendation />} />

      {/* Rute untuk Profil */}
      <Route path="/profile" element={<Profile />} />

      {/* footer links */}
      <Route path="/about-team" element={<AboutTeam />} />
      <Route path="/our-mission" element={<OurMission />} />
      <Route path="/contact-us" element={<ContactUs />} />

      <Route path="/ai-chat" element={<AIChat />} />
    </Routes>
  );
}

export default AppRoutes;