import { precacheAndRoute } from 'workbox-precaching';
// Import modul yang Anda butuhkan di Service Worker Anda sendiri, jika tidak dihandle oleh runtimeCaching VitePWA
// Contoh: Jika Anda punya logic push notification di sini, import semua Workbox strategies yang dibutuhkan.

// Ini adalah tempat Workbox akan menginject daftar file yang akan di-precache
// self.__WB_MANIFEST didefinisikan oleh VitePWA saat build dengan injectManifest
precacheAndRoute(self.__WB_MANIFEST || []);

// Pastikan logic push notification ada di sini jika Anda ingin push notification berfungsi di PWA
self.addEventListener('push', (event) => {
  console.log('Service worker pushing...');
  const data = event.data.json();
  const title = data.title || 'Pesan Baru';
  const options = {
    body: data.body || 'Anda memiliki pesan baru.',
    icon: data.icon || '/icon-192x192.png', // Pastikan path ini benar dari root public
    badge: data.badge || '/icon-192x192.png', // Pastikan path ini benar dari root public
    data: data.data || {}
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const clickData = event.notification.data;
  const urlToOpen = clickData.url || '/'; // Default ke homepage jika tidak ada URL spesifik

  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});

// Jika Anda memiliki logika runtime caching lainnya di sini, pastikan itu dikonfigurasi.
// Namun, karena sebagian besar sudah di vite.config.js, ini mungkin cukup.