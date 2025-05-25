// frontend-hapi > src > views > RecommendationView.jsx
import React from 'react';

export default function RecommendationView({
  recommendedProducts,
  loading,
  currentConditions,
}) {
  const formatConditionName = (condition) => {
    // Fungsi sederhana untuk membuat nama kondisi lebih mudah dibaca
    return condition.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <section className="section product-recommendations-page" id="recommendations-page">
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <h2 className="section__title reveal-from-bottom">Rekomendasi Produk untukmu!</h2>
        <p className="section__description" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Dapatkan rekomendasi produk sesuai kondisi kulit Anda.
        </p>

        {currentConditions.length > 0 && currentConditions[0] !== 'semua_jenis_kulit' && (
          <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem', color: 'hsl(323, 70%, 30%)' }}>
            Berdasarkan: <strong>{currentConditions.map(formatConditionName).join(', ')}</strong>
          </p>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: '3rem', color: 'hsl(323, 70%, 30%)' }}>Memuat rekomendasi...</div>
        ) : recommendedProducts.length > 0 ? (
          <div className="product-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            justifyContent: 'center'
          }}>
            {recommendedProducts.map(product => (
              <div key={product.id} className="product-card" style={{
                background: '#fbeaea',
                padding: '1.5rem',
                borderRadius: '.75rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                textAlign: 'center',
                color: 'hsl(323, 70%, 30%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {product.image && (
                  <img src={product.image} alt={product.name} style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }} />
                )}
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{product.name}</h3>
                {/* Tambahkan baris ini untuk menampilkan brand */}
                {product.brand && (
                  <p style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'hsl(323, 70%, 40%)', marginBottom: '0.5rem' }}>
                    {product.brand}
                  </p>
                )}
                <p style={{ fontSize: '.9rem', color: 'hsl(330, 4%, 55%)', flexGrow: 1, marginBottom: '1rem' }}>
                  {product.description}
                </p>
                <div style={{ fontSize: '.85rem', color: 'hsl(323, 70%, 30%)', marginBottom: '1rem' }}>
                    {product.benefits && product.benefits.length > 0 && (
                        <p><strong>Manfaat:</strong> {product.benefits.join(', ')}</p>
                    )}
                    {product.usage && (
                        <p><strong>Cara Pakai:</strong> {product.usage}</p>
                    )}
                </div>
                {product.link && (
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="button" style={{
                    marginTop: 'auto', // Pindah ke bawah card
                    background: 'hsl(330, 91%, 85%)',
                    color: 'hsl(323, 70%, 30%)',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}>
                    Lihat Produk
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: '3rem', color: 'hsl(330, 4%, 55%)' }}>
            Tidak ada rekomendasi produk yang cocok saat ini.
          </div>
        )}
      </div>
    </section>
  );
}