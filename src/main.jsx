import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Root() {
  useEffect(() => {
    // Wait for app to signal it's ready before removing loader
    const handleAppReady = () => {
      const loader = document.getElementById('root-loader');
      if (loader) {
        // Add fade out animation
        loader.style.transition = 'opacity 0.3s ease-out';
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.remove();
        }, 300);
      }
      window.removeEventListener('appReady', handleAppReady);
    };

    window.addEventListener('appReady', handleAppReady);

    // Fallback: Remove loader after max 5 seconds even if event doesn't fire
    const fallbackTimeout = setTimeout(() => {
      const loader = document.getElementById('root-loader');
      if (loader) {
        loader.style.transition = 'opacity 0.3s ease-out';
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.remove();
        }, 300);
      }
      window.removeEventListener('appReady', handleAppReady);
    }, 5000);

    return () => {
      window.removeEventListener('appReady', handleAppReady);
      clearTimeout(fallbackTimeout);
    };
  }, []);
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />)
