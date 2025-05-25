// src/mvp/presenters/useMapsPresenter.js
import { useEffect, useRef, useState } from 'react';
import MapsModel from '../models/MapsModel';
import L from 'leaflet';

// Setup ikon (harus dieksekusi sekali)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const klinikIcon = L.icon({
  iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});
const userIcon = L.icon({
  iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});

export function useMapsPresenter() {
  const model = new MapsModel();
  const mapRef = useRef(null);

  const [markers, setMarkers] = useState([]);
  const [locationMarker, setLocationMarker] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [loadingGif, setLoadingGif] = useState(false);

  useEffect(() => {
    // load klinik data
    const data = model.getKlinikData().map((k, i) => ({
      position: [k.lat, k.lng],
      popup: (
        `<strong>${k.name}</strong><br/>
        <a href="https://www.google.com/maps/search/?api=1&query=${k.lat},${k.lng}" target="_blank" rel="noopener noreferrer" style="margin-top:8px;padding:6px 12px;background-color:#4CAF50;color:#fff;text-decoration:none;border-radius:4px;display:inline-block;">
          Open in Google Maps
        </a>`
      ),
      icon: klinikIcon,
      key: i
    }));
    setMarkers(data);
  }, []);

  useEffect(() => {
    // scroll-up btn
    const onScroll = () => {
      const btn = document.getElementById('scroll-up');
      if (!btn) return;
      window.scrollY >= 460
        ? btn.classList.add('show-scroll')
        : btn.classList.remove('show-scroll');
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung.');
      return;
    }
    setIsLocating(true);
    setLoadingGif(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        setLocationMarker({
          position: latlng,
          popup: 'Lokasi Saya',
          icon: userIcon
        });
        setIsLocating(false);
        setLoadingGif(false);
        setStatusText('Lokasi ditemukan!');
      },
      err => {
        alert('Gagal mendapatkan lokasi: ' + err.message);
        setIsLocating(false);
        setLoadingGif(false);
        setStatusText('');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    mapRef,
    markers,
    locationMarker,
    isLocating,
    statusText,
    loadingGif,
    handleLocate,
    scrollToTop,
    pageTitle: model.getPageTitle(),
    pageDesc: model.getPageDesc(),
    defaultMapCenter: model.getDefaultMapCenter(),
    defaultZoom: model.getDefaultZoom()
  };
}