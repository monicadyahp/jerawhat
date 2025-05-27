// src/components/BackgroundMusic.jsx
import React, { useRef, useEffect, useState } from 'react';

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Efek untuk mencoba autoplay saat komponen dimuat
  useEffect(() => {
    const tryAutoplay = () => {
      if (audioRef.current && !userInteracted) {
        // Coba putar tanpa suara dulu (untuk memenuhi kebijakan browser)
        audioRef.current.muted = true;
        audioRef.current.play()
          .then(() => {
            console.log('Autoplay started (muted)');
            setIsPlaying(true);
            // Setelah berhasil autoplay muted, bisa tawarkan unmute jika pengguna mau
          })
          .catch(error => {
            // Autoplay diblokir (misal, tidak ada interaksi pengguna sama sekali)
            console.log('Autoplay blocked (muted), waiting for user interaction:', error);
            setIsPlaying(false);
          });
      }
    };

    // Panggil fungsi cobaAutoplay segera
    tryAutoplay();

    // Tambahkan event listener untuk interaksi pengguna pertama kali
    const handleUserInteraction = () => {
      if (!userInteracted && audioRef.current && !isPlaying) {
        audioRef.current.muted = false; // Coba unmute
        audioRef.current.play()
          .then(() => {
            console.log('User interacted, music resumed/started (unmuted)');
            setIsPlaying(true);
            setUserInteracted(true);
          })
          .catch(error => {
            console.log('Failed to play after interaction:', error);
          });
      }
      // Hapus listener setelah interaksi pertama untuk menghindari duplikasi
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction); // Juga untuk keyboard

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [userInteracted, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.muted = false; // Pastikan tidak muted saat di-play manual
        audioRef.current.play()
          .then(() => {
            console.log('Manual play/resume');
            setIsPlaying(true);
            setUserInteracted(true); // Tandai pengguna sudah berinteraksi
          })
          .catch(error => {
            console.error('Error playing audio:', error);
            alert('Browser blocked audio play. Please interact with the page.');
          });
      }
    }
  };

  // Tampilkan tombol play/pause dan volume
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <audio ref={audioRef} src="/audio/background_music.mp3" loop preload="auto"></audio>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
      {!userInteracted && !isPlaying && (
        <p style={{ color: 'gray', fontSize: '12px' }}>
          Click anywhere or press a key to unmute music.
        </p>
      )}
    </div>
  );
}

export default BackgroundMusic;