// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyALZ3MOReRY8357InyIPQ0I8tJK22DBVXM",
    authDomain: "warzone-india.firebaseapp.com",
    projectId: "warzone-india",
    storageBucket: "warzone-india.firebasestorage.app",
    messagingSenderId: "213114124800",
    appId: "1:213114124800:web:9c9333ee6e97a457b336e5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[SW] Background message received:', payload);

    const notificationTitle = payload.notification?.title || "WarZone India";
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || "",
        icon: "/icon-192.png",     // agar icon hai toh daal do, warna default
        badge: "/icon-72.png",
        tag: "warzone-notification",
        requireInteraction: false, // false = auto dismiss ho sakta hai
        data: { url: payload.data?.url || "/" }   // notification pe click karke kahan jaaye
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function(clientList) {
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});
