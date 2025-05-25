// src/views/MapsView.jsx
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Recenter({ latlng, zoom = 15 }) {
  const map = useMap();
  React.useEffect(() => {
    if (latlng) map.flyTo(latlng, zoom, { animate: true });
  }, [latlng, map, zoom]);
  return null;
}

export default function MapsView({
  mapRef,
  markers,
  locationMarker,
  isLocating,
  statusText,
  loadingGif,
  handleLocate,
  scrollToTop,
  pageTitle,
  pageDesc,
  defaultMapCenter,
  defaultZoom
}) {
  return (
    <div style={{ paddingTop: '60px' }}>
      <section
        className="section"
        style={{
          padding: `calc(var(--header-height,60px) + 1rem) 20px 2rem`,
          maxWidth: 1200,
          margin: '0 auto'
        }}
      >
        <h2 className="section__title" style={{ textAlign: 'center' }}>
          {pageTitle}
        </h2>
        <p style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 1rem' }}>
          {pageDesc}
        </p>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleLocate}
            disabled={isLocating}
            style={{
              padding: '8px 16px',
              backgroundColor: 'hsl(323,70%,30%)',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {isLocating ? 'Menemukan lokasi...' : 'Cari Lokasi Saya'}
            {loadingGif && (
              <img
                src="https://i.imgur.com/llF5iyg.gif"
                alt="loading"
                style={{ width: 18, marginLeft: 8 }}
              />
            )}
          </button>
          {statusText && <p style={{ marginTop: 8 }}>{statusText}</p>}
        </div>
      </section>

      <div
        style={{
          height: '80vh',
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1rem'
        }}
      >
        <MapContainer
          center={defaultMapCenter}
          zoom={defaultZoom}
          style={{ height: '100%', borderRadius: 8 }}
          whenCreated={map => {
            if (mapRef && mapRef.current) mapRef.current = map;
          }}
          onClick={e =>
            alert(
              `Koordinat klik: ${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`
            )
          }
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map(m => (
            <Marker key={m.key} position={m.position} icon={m.icon}>
              <Popup>
                <span dangerouslySetInnerHTML={{ __html: m.popup }} />
              </Popup>
            </Marker>
          ))}

          {locationMarker && (
            <>
              <Marker
                position={locationMarker.position}
                icon={locationMarker.icon}
              >
                <Popup>{locationMarker.popup}</Popup>
              </Marker>
              <Recenter latlng={locationMarker.position} zoom={15} />
            </>
          )}
        </MapContainer>
      </div>

      {/* Scroll Up Button */}
      <a
        href="#"
        id="scroll-up"
        className="scrollup"
        onClick={scrollToTop}
      >
        <i className="bx bx-up-arrow-alt scrollup__icon"></i>
      </a>
    </div>
  );
}