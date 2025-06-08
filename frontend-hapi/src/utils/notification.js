// frontend-hapi/src/utils/notification.js

const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk'; // Ganti dengan VAPID Public Key Anda

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function registerPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push messaging is not supported');
    return null; // Mengembalikan null jika tidak didukung
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted.');
      return null;
    }

    const swRegistration = await navigator.serviceWorker.ready;
    let pushSubscription = await swRegistration.pushManager.getSubscription();

    if (!pushSubscription) {
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      pushSubscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });
      console.log('New push subscription:', pushSubscription);
      await sendSubscriptionToServer(pushSubscription);
    } else {
      console.log('Existing push subscription:', pushSubscription);
    }
    return pushSubscription;

  } catch (error) {
    console.error('Error during push registration:', error);
    throw error;
  }
}

async function unregisterPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push messaging is not supported');
    return false; // Mengembalikan false jika tidak didukung
  }

  try {
    const swRegistration = await navigator.serviceWorker.ready;
    const pushSubscription = await swRegistration.pushManager.getSubscription();

    if (pushSubscription) {
      await removeSubscriptionFromServer(pushSubscription);
      const result = await pushSubscription.unsubscribe();
      if (result) {
        console.log('Push subscription unsubscribed.');
        return true;
      } else {
        console.error('Failed to unsubscribe push.');
        return false;
      }
    } else {
      console.log('No active push subscription to unsubscribe.');
      return true;
    }
  } catch (error) {
    console.error('Error during push unregistration:', error);
    throw error;
  }
}

async function sendSubscriptionToServer(subscription) {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  if (!token) {
    console.error('No token found for sending subscription.');
    return;
  }
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id'}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(subscription),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send subscription to server:', errorData);
      throw new Error('Failed to send subscription to server.');
    }
    console.log('Push subscription sent to server successfully.');
  } catch (error) {
    console.error('Network error sending subscription:', error);
    throw error;
  }
}

async function removeSubscriptionFromServer(subscription) {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  if (!token) {
    console.error('No token found for removing subscription.');
    return;
  }
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://api.afridika.my.id'}/unsubscribe`, {
      method: 'POST', // Atau DELETE, sesuaikan dengan backend Anda
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to remove subscription from server:', errorData);
      throw new Error('Failed to remove subscription from server.');
    }
    console.log('Push subscription removed from server successfully.');
  } catch (error) {
    console.error('Network error removing subscription:', error);
    throw error;
  }
}

// Ubah menjadi default export
export default {
  registerPush,
  unregisterPush
};