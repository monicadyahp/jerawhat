// frontend-hapi > src > views > ProfileView.jsx
import React from 'react';

export default function ProfileView({
  user,
  loading,
  selectedAvatarFile, // Ambil state file
  handleLogout,
  onAvatarChange,     // Ambil handler change
  handleAvatarUpload, // Ambil handler upload
}) {
  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Memuat Profil...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Anda belum login. Silakan login.</h2>
      </div>
    );
  }

  // URL dasar untuk avatar (sesuaikan dengan lokasi penyimpanan di backend Anda)
  // Misalnya, jika backend menyimpan di 'uploads/avatars/', dan server berjalan di localhost:3000
  const avatarBaseUrl = 'http://localhost:3000'; // Sesuaikan dengan URL server backend Anda
const currentAvatarUrl = user.avatar ? `${avatarBaseUrl}${user.avatar}` : 'https://res.cloudinary.com/dbofowabd/image/upload/v1748144946/image-removebg-preview_5_p2y9ox.png';
  return (
    <section className="home container" id="profile">
      <div className="home__content grid" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="home__data reveal-from-bottom" style={{ textAlign: 'center', margin: 'auto' }}>
          <h1 className="home__title" style={{ marginBottom: '1rem' }}>
            Profil Pengguna
          </h1>
          <div className="profile__details" style={{
            background: '#fbeaea',
            padding: '2rem',
            borderRadius: '.75rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            maxWidth: '500px',
            margin: '0 auto',
            color: 'hsl(323, 70%, 30%)'
          }}>
            {/* Avatar Section */}
            <div style={{ marginBottom: '1.5rem' }}>
              <img
                src={currentAvatarUrl}
                alt="Avatar"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem',
                  border: '3px solid hsl(330, 91%, 85%)' // --first-color
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                style={{ display: 'block', margin: '0.5rem auto' }}
              />
              <button
                onClick={handleAvatarUpload}
                className="button"
                disabled={!selectedAvatarFile} // Nonaktifkan jika tidak ada file dipilih
                style={{
                  padding: '.5rem 1rem',
                  fontSize: '.9rem',
                  background: 'hsl(330, 91%, 85%)', // --first-color
                  color: 'hsl(323, 70%, 30%)', // --title-color
                }}
              >
                {selectedAvatarFile ? 'Unggah Avatar' : 'Pilih & Unggah'}
              </button>
            </div>

            {/* User Details */}
            <p><strong>Nama:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.role && <p><strong>Peran:</strong> {user.role}</p>}
            
            <button
              onClick={handleLogout}
              className="button"
              style={{ marginTop: '1.5rem', background: 'crimson', color: 'white' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}