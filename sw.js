// Service Worker do SIAN — usado apenas pra tornar a notificação de
// "descanso concluído" mais confiável (via registration.showNotification,
// que costuma funcionar melhor que new Notification() em apps instalados
// na tela de início). Não faz cache nem funciona offline por conta própria.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Ao tocar na notificação, traz o app de volta pro primeiro plano.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
