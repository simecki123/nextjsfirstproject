"use client"
import { register } from '@/app/api/api';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function RegisterComponent() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('Please fill all fields');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await register({firstName, lastName, email, password});
            console.log(response);
            router.push('/login');
        } catch(err:any) {
            setError(err.message || 'An error occurred during registration');
        }
    }

    return (
        <div className='mb-4 flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
                <div className='text-lg mb-4 flex items-center justify-center'>
                    <h1 className='block text-gray-700 text-sm font-bold'>Register</h1>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>First name:</label>
                    <input 
                        type='text' 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your first name'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Last name:</label>
                    <input 
                        type='text' 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your last name'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                    <input 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your email'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Enter your password'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Confirm your password</label>
                    <input 
                        type='password' 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        placeholder='Confirm your password'
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <div className='flex items-center justify-center'>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
                </div>
            </form>
        </div>
    )
}