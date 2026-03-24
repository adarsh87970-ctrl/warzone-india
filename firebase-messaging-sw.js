importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyALZ3MOReRY8357InyIPQ0I8tJK22DBVXM",
    authDomain: "warzone-india.firebaseapp.com",
    projectId: "warzone-india",
    storageBucket: "warzone-india.firebasestorage.app",
    messagingSenderId: "213114124800",
    appId: "1:213114124800:web:9c9333ee6e97a457b336e5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    const title = payload.notification?.title || 'WarZone India';
    const body = payload.notification?.body || '';
    self.registration.showNotification(title, {
        body: body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: payload.data || {}
    });
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
