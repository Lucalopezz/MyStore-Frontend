'use client';
import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: 'green',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: 'green',
          },
        },
        error: {
          style: {
            background: '#ff4b4b',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ff4b4b',
          },
        },
      }}
    />
  );
}