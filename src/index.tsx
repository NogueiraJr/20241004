import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './demo';

createRoot(document.getElementById('container')).render(<Demo />);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js') // Caminho absoluto para o arquivo na pasta /public
        .then((registration) => {
          console.log('ServiceWorker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Falha ao registrar o ServiceWorker:', error);
        });
    });
  }
    