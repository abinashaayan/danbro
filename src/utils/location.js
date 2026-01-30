// Utility functions for location handling

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        // User denied (1), unavailable (2), or timeout (3) — use default location silently
        if (error?.code !== 1) {
          console.warn('Location unavailable:', error?.message || error);
        }
        resolve({
          lat: 26.86957,
          long: 81.00935,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

export const getStoredLocation = () => {
  try {
    const stored = localStorage.getItem('userLocation');
    if (stored) {
      const location = JSON.parse(stored);
      return {
        lat: location.lat || 26.86957,
        long: location.long || 81.00935,
        // Optional human‑readable label if stored
        label: location.label || null,
      };
    }
  } catch (error) {
    console.error('Error reading stored location:', error);
  }
  // Default location
  return {
    lat: 26.86957,
    long: 81.00935,
    label: null,
  };
};

export const storeLocation = (lat, long, label) => {
  try {
    const payload = {
      lat,
      long,
    };

    if (label) {
      payload.label = label;
    }

    localStorage.setItem('userLocation', JSON.stringify(payload));
  } catch (error) {
    console.error('Error storing location:', error);
  }
};

