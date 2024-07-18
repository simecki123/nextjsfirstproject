"use client"
import { register } from '@/app/api/api';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function RegisterSubmitButton() {
    const router = useRouter();
    const [error, setError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const form = (e.target as HTMLButtonElement).closest('form') as HTMLFormElement;
        if (!form) {
            setError('Form not found');
            return;
        }
        
        const formData = new FormData(form);
        
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

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
        <>
            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <div className='flex items-center justify-center'>
                <button onClick={handleSubmit} type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
            </div>
        </>
    )
}