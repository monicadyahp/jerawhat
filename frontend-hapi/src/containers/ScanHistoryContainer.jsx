import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScanHistoryView from '../views/ScanHistoryView';
import { useAuth } from '../context/AuthContext';

export default function ScanHistoryContainer() {
  const { user } = useAuth();
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !user.token) {
        setScanHistory([]);
        setLoading(false);
        setError('Anda belum login.');
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id'}/history/me`;
        const res = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok && data.data) {
          setScanHistory(data.data);
        } else {
          setScanHistory([]);
          setError(data.message || 'Gagal mengambil riwayat scan.');
        }
      } catch (e) {
        setScanHistory([]);
        setError('Terjadi error koneksi: ' + e.message);
        console.error('Error fetching scan history:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  return (
    <>
      <Header />
      <ScanHistoryView scanHistory={scanHistory} loading={loading} error={error} />
      <Footer />
    </>
  );
} 