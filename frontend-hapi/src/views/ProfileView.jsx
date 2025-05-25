// frontend-hapi > src > views > ProfileView.jsx
import React from 'react';

export default function ProfileView({
  user,
  loading,
  selectedAvatarFile,
  previewAvatarUrl,
  handleLogout,
  onAvatarChange,
  handleAvatarUpload,
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

  const avatarBaseUrl = 'http://localhost:3000';
  const currentAvatarUrl = user.avatar ? `${avatarBaseUrl}${user.avatar}` : 'https://res.cloudinary.com/dbofowabd/image/upload/v1748144946/image-removebg-preview_5_p2y9ox.png';
  const displayAvatarUrl = previewAvatarUrl || currentAvatarUrl;

  return (
    // Mengikuti struktur section dari ContactUsView
    <section className="section profile-section reveal-from-bottom" id="profile"> {/* Ganti kelas home container */}
      <div className="container"> {/* Gunakan kelas container */}
        {/* Konten utama profil, mirip contact__content */}
        <div className="profile__content reveal-from-bottom" style={{ textAlign: 'center', margin: 'auto' }}>
          {/* Judul: h2 dan kelas section__title */}
          <h2 className="section__title" style={{ marginBottom: '1rem' }}> {/* Ganti h1 dan tambahkan kelas */}
            Profil Pengguna
          </h2>
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
            <div style={{ marginBottom: '1.5rem', position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
              <img
                src={displayAvatarUrl}
                alt="Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid hsl(330, 91%, 85%)'
                }}
              />
              
              {/* Tombol Edit Avatar (Ikon Pensil) */}
              <label
                  htmlFor="avatar-upload-input"
                  style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      backgroundColor: 'hsl(330, 91%, 85%)',
                      color: 'hsl(323, 70%, 30%)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                      zIndex: 1,
                      fontSize: '1rem'
                  }}
              >
                  <i className='bx bx-pencil'></i>
              </label>
              <input
                  id="avatar-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={onAvatarChange}
                  style={{ display: 'none' }}
              />
            </div>

            {/* Tombol Unggah Avatar (hanya muncul jika ada file yang dipilih) */}
            {selectedAvatarFile && (
              <button
                onClick={handleAvatarUpload}
                className="button"
                style={{
                  marginTop: '1rem',
                  padding: '.5rem 1rem',
                  fontSize: '.9rem',
                  background: 'hsl(330, 91%, 85%)',
                  color: 'hsl(323, 70%, 30%)',
                }}
              >
                Unggah Avatar
              </button>
            )}

            {/* User Details */}
            <p style={{ marginTop: '1.5rem' }}><strong>Nama:</strong> {user.name}</p>
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