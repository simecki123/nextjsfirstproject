"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login } from '@/app/api/api';
import { setCookie } from '@/utils/cookieUtils';

export default function LoginSubmitButton() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
    const passwordInput = document.querySelector<HTMLInputElement>('input[name="password"]');
   
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = (e.target as HTMLButtonElement).closest('form') as HTMLFormElement;
    if (!form) {
      setError('Form not found');
      return;
    }

    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await login({ email, password });
      const token = response.data.accessToken;
      if (token) {
        setCookie('token', token); // Set the token as a cookie
        const decodedToken = jwtDecode(token);
        setCookie('user', JSON.stringify(decodedToken)); // Set user info as a cookie
        router.push('/mainpage');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
      <div className="flex items-center justify-center">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="button"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </>
  );
}