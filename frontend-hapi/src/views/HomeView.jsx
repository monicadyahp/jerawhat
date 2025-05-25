// src/views/HomeView.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext'; // Import useAuth dari AuthContext Anda

export default function HomeView({ slides }) { // Hapus prop isLoggedIn karena kita akan ambil dari context
  const navigate = useNavigate(); // Inisialisasi useNavigate hook
  const { user, loading } = useAuth(); // Dapatkan status user dan loading dari AuthContext

  const handleMulaiClick = () => {
    // Tunggu sampai status loading dari AuthContext selesai
    if (loading) {
      return; // Jangan lakukan apa-apa jika masih loading
    }

    if (user) { // Cek apakah 'user' ada (berarti sudah login)
      navigate('/scan'); // Arahkan langsung ke ScanView.jsx
    } else {
      navigate('/scanlanding'); // Arahkan ke halaman landing scan jika belum login
    }
  };

  return (
    <main className="main">
      {/* HOME */}
      <section className="home container" id="home">
        <div className="swiper home-swiper">
          <div className="swiper-wrapper">
            {slides.map((s, i) => (
              <section key={i} className="swiper-slide">
                <div className="home__content grid">
                  <div className="home__group">
                    <img src={s.groupImg} alt="" className="home__img" />
                    <div className="home__indicator"></div>
                    <div className="home__details-img">
                      <h4 className="home__details-title">{s.detailsTitle}</h4>
                      <span className="home__details-subtitle">
                        {s.detailsSubtitle}
                      </span>
                    </div>
                  </div>
                  <div className="home__data">
                    <h3 className="home__subtitle">{s.dataSubtitle}</h3>
                    <h1 className="home__title">
                      {s.dataTitle.split('\n').map((l,idx)=>(
                        <React.Fragment key={idx}>{l}<br/></React.Fragment>
                      ))}
                    </h1>
                    <p className="home__description">{s.dataDescription}</p>
                    <div className="home__buttons">
                      <Link to={s.btnLink} className="button">
                        {s.btnText}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about" id="about">
        <div className="about__container container grid">
          <div className="about__data">
            <h2 className="section__title about__title">
              Tentang Website JeraWHAT?!
            </h2>
            <p className="about__description">
              Website ini dirancang untuk membantu kamu memeriksa kondisi kulit
              wajah dengan teknologi scan wajah. Dengan menggunakan ponsel pintar,
              kamu dapat dengan mudah menganalisis kondisi kulit kamu, termasuk
              jerawat dan masalah kulit lainnya. Dapatkan rekomendasi perawatan yang
              tepat untuk menjaga kulit tetap sehat dan cerah.
            </p>
            <Link to="/about-scan" className="button">
              Pelajari Fitur Scan
            </Link>
          </div>
          <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/about-img_upj3tr.png" alt="" className="about__img" />
        </div>
      </section>

      {/* HABBIT */}
      <section className="section habbit" id="habbit">
        <h2 className="section__title">
          Kebiasaan yang Berpengaruh pada Kondisi Kulit Wajah
        </h2>
        <div className="habbit__container container grid">
          <div className="habbit__content">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105262/kebiasaan1_owma5w.png" alt="" className="habbit__img" />
            <h3 className="habbit__title">Menggunakan Makeup Secara Teratur</h3>
            <span className="habbit__subtitle">
              Kebiasaan yang dapat menyumbat pori
            </span>
          </div>
          <div className="habbit__content">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105262/kebiasaan2_ozffyp.png" alt="" className="habbit__img" />
            <h3 className="habbit__title">Kurang Tidur</h3>
            <span className="habbit__subtitle">
              Kurang tidur memperburuk kondisi kulit
            </span>
          </div>
          <div className="habbit__content">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105263/kebiasaan3_rjycfx.png" alt="" className="habbit__img" />
            <h3 className="habbit__title">Diet Tidak Seimbang</h3>
            <span className="habbit__subtitle">
              Makanan tidak sehat berisiko pada kulit berjerawat
            </span>
          </div>
          <div className="habbit__content">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105264/kebiasaan4_s10zfl.png" alt="" className="habbit__img" />
            <h3 className="habbit__title">Kurang Perawatan Kulit</h3>
            <span className="habbit__subtitle">
              Perawatan yang buruk memperburuk kulit berjerawat
            </span>
          </div>
          <div className="habbit__content">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105263/kebiasaan5_jl6gxg.png" alt="" className="habbit__img" />
            <h3 className="habbit__title">Paparan Matahari Berlebihan</h3>
            <span className="habbit__subtitle">
              Paparan sinar UV merusak kulit
            </span>
          </div>
          <div className="habbit__content">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/kebiasaan6_frkb10.png" alt="" className="habbit__img" />
            <h3 className="habbit__title">Stres Tinggi</h3>
            <span className="habbit__subtitle">
              Stres dapat menyebabkan flare-up jerawat
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section className="section category">
        <h2 className="section__title">Kategori Jerawat</h2>
        <div className="category__container container grid">
          <div className="category__data">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105254/category1-img_w5ybwq.png" alt="" className="category__img" />
            <h3 className="category__title">Whitehead</h3>
            <p className="category__description">
              Benjolan kecil berwarna putih yang terbentuk ketika pori tersumbat oleh minyak dan sel kulit mati.
            </p>
          </div>
          <div className="category__data">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105253/category2-img_eeekry.png" alt="" className="category__img" />
            <h3 className="category__title">Blackhead</h3>
            <p className="category__description">
              Pori terbuka yang berwarna gelap karena oksidasi minyak yang terperangkap di dalamnya.
            </p>
          </div>
          <div className="category__data">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105256/category3-img_llr9l6.png" alt="" className="category__img" />
            <h3 className="category__title">Papule</h3>
            <p className="category__description">
              Benjolan kecil merah yang terangkat yang muncul ketika dinding pori teriritasi.
            </p>
          </div>
          <div className="category__data">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105256/category4-img_dzyb8w.png" alt="" className="category__img" />
            <h3 className="category__title">Pustule</h3>
            <p className="category__description">
              Jerawat yang meradang dan berisi nanah yang seringkali terbentuk dari papule.
            </p>
          </div>
          <div className="category__data">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105255/category5-img_nwgzmz.png" alt="" className="category__img" />
            <h3 className="category__title">Cystic</h3>
            <p className="category__description">
              Benjolan besar dan menyakitkan di bawah kulit yang disebabkan oleh peradangan yang parah.
            </p>
          </div>
          <div className="category__data">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105256/category6-img_eet7au.png" alt="" className="category__img" />
            <h3 className="category__title">Nodule</h3>
            <p className="category__description">
              Benjolan keras dan besar yang terbentuk dalam kulit dan seringkali menyakitkan.
            </p>
          </div>
          <div className="category__data">
            <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105257/category7-img_tyzx8d.png" alt="" className="category__img" />
            <h3 className="category__title">Hormonal</h3>
            <p className="category__description">
              Jerawat yang dipicu oleh perubahan hormon, biasanya terjadi selama masa pubertas atau siklus menstruasi.
            </p>
          </div>
        </div>
      </section>

      {/* ULASAN PENGGUNA */}
      <section className="section new" id="new">
        <h2 className="section__title">Ulasan Pengguna</h2>
        <div className="new__container container">
          <div className="swiper new-swiper">
            <div className="swiper-wrapper">
              {/* Slide 1 */}
              <div className="new__content swiper-slide">
                <div className="new__tag">New</div>
                <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/about-img_upj3tr.png" alt="" className="new__img" />
                <h3 className="new__title">Clara Hardy</h3>
                <span className="new__subtitle">Keren!</span>
                <div className="new__rates">
                  <span className="new__rate">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              {/* Slide 2 */}
              <div className="new__content swiper-slide">
                <div className="new__tag">New</div>
                <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/about-img_upj3tr.png" alt="" className="new__img" />
                <h3 className="new__title">William Stan</h3>
                <span className="new__subtitle">Mantap!</span>
                <div className="new__rates">
                  <span className="new__rate">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              {/* Slide 3 */}
              <div className="new__content swiper-slide">
                <div className="new__tag">New</div>
                <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/about-img_upj3tr.png" alt="" className="new__img" />
                <h3 className="new__title">Nick Andrew</h3>
                <span className="new__subtitle">Hebat!</span>
                <div className="new__rates">
                  <span className="new__rate">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              {/* Slide 4 */}
              <div className="new__content swiper-slide">
                <div className="new__tag">New</div>
                <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/about-img_upj3tr.png" alt="" className="new__img" />
                <h3 className="new__title">Angela Merici</h3>
                <span className="new__subtitle">Cocok!</span>
                <div className="new__rates">
                  <span className="new__rate">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              {/* Slide 5 */}
              <div className="new__content swiper-slide">
                <div className="new__tag">New</div>
                <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/about-img_upj3tr.png" alt="" className="new__img" />
                <h3 className="new__title">Natasha Ruth</h3>
                <span className="new__subtitle">Kreatif!</span>
                <div className="new__rates">
                  <span className="new__rate">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              {/* Slide 6 */}
              <div className="new__content swiper-slide">
                <div className="new__tag">New</div>
                <img src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105252/about-img_upj3tr.png" alt="" className="new__img" />
                <h3 className="new__title">Valentine Rita</h3>
                <span className="new__subtitle">Wow!</span>
                <div className="new__rates">
                  <span className="new__rate">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Scan */}
      <section className="section scan">
        <div className="scan__container container grid">
          <div className="scan reveal-from-bottom">
            <h2 className="scan__title">Scan Kulit Wajahmu</h2>
            {/* Mengubah Link menjadi button dengan onClick handler */}
            <button type="button" className="button" onClick={handleMulaiClick}>
              Mulai
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/dbofowabd/image/upload/v1748105265/new1_el7cff.png"
            alt=""
            className="scan__img reveal-from-bottom"
          />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section newsletter">
        <div className="newsletter__container container">
          <h2 className="section__title">Mari Berlangganan</h2>
          <p className="newsletter__description">Dapatkan informasi menarik!</p>
          <form className="newsletter__form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter__input"
            />
            <button className="button">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}