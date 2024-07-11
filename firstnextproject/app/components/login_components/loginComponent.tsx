"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'
import { login } from '@/app/api/api';
import { cookies } from 'next/headers'


export default function LoginComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  
  useEffect(() => {
    // Get the input elements
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    // Check if they have values and update state
    if (emailInput && emailInput.value) {
      setEmail(emailInput.value);
    }
    if (passwordInput && passwordInput.value) {
      setPassword(passwordInput.value);
    }
  }, []);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    

    try {
      const response = await login({ email, password });
      console.log(response)
      
      const token = response.data.accessToken; // Get the cookie
      console.log(token);
      
      
      if (token) {
        console.log("Token is real");
        const decodedToken = jwtDecode(token);
        console.log("Decoded token: ", decodedToken)
        
        localStorage.setItem('user', JSON.stringify(decodedToken));
        console.log("Stored user ", localStorage.getItem('user'));
        
        router.push('/mainpage');
      } else {
        setError('Login successful, but no token received');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };
    
  

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           onChange={e => setEmail(e.target.value)} 
           type="email" 
           placeholder="Enter email" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password" />
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           type="submit">Sign In</button>
        </div>
      </form>
      <p className="mt-4 text-gray-700">Don't have an account? 
        <Link href="/register" className="text-blue-500 hover:text-blue-700">
        Register here
        </Link>
      </p>
    </div>
  )
}