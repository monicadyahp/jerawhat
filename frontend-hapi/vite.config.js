import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: isProduction ? 'injectManifest' : 'generateSW',
        srcDir: 'src',
        filename: isProduction ? 'sw.js' : 'dev-sw.js',
        outDir: 'dist',
        injectManifest: isProduction
          ? {
              maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            }
          : undefined,
        manifest: {
          id: "/",
          name: "JeraWHAT?!",
          short_name: "JeraWHAT?!",
          description: "Aplikasi deteksi jerawat dan rekomendasi perawatan kulit",
          start_url: "/",
          display: "standalone",
          background_color: "#FBEAEA",
          theme_color: "#B85294",
          icons: [
            {
              src: "/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            }
          ],
          shortcuts: [
            {
              name: "Mulai Scan",
              short_name: "Scan",
              description: "Lakukan scan wajah untuk deteksi jerawat",
              url: "/scan",
              icons: [{ "src": "/shortcut-scan.png", "sizes": "192x192" }]
            },
            {
              name: "Riwayat Scan",
              short_name: "Riwayat",
              description: "Lihat riwayat scan jerawat Anda",
              url: "/scan/history",
              icons: [{ "src": "/shortcut-history.png", "sizes": "192x192" }]
            }
          ],
          screenshots: [
            {
              src: "/screenshot-desktop-1.png",
              sizes: "1920x1080",
              type: "image/png",
              form_factor: "wide"
            },
            {
              src: "/screenshot-mobile-1.png",
              sizes: "360x720",
              type: "image/png",
              form_factor: "narrow"
            }
          ]
        },
        workbox: {
          globPatterns: [
            '**/*.{js,css,html,png,jpg,jpeg,gif,svg,json,woff,woff2,ttf,eot,otf,bin}',
            'model/**',
            'model_wajah/**',
          ],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'cdn-assets-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: ({ url }) => url.origin === 'https://api.afridika.my.id' && url.pathname !== '/login' && url.pathname !== '/register',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-data-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 1,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: ({ url }) => url.origin === 'https://api.afridika.my.id' && (url.pathname.startsWith('/uploads/') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg')),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'api-images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: ({ url }) => url.origin === 'https://res.cloudinary.com',
              handler: 'CacheFirst',
              options: {
                cacheName: 'cloudinary-images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: true,
    },
  };
});