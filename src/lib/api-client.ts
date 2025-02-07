import { getSession } from 'next-auth/react';

interface FetchOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}

export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
  const session = await getSession();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (session?.jwt) {
    headers['Authorization'] = `Bearer ${session.jwt}`;
  }

  const response = await fetch(`http://localhost:3001/${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('Erro na requisição');
  }

  return response.json();
}