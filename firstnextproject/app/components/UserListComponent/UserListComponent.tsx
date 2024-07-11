"use client";

import React, { useState, useEffect } from 'react';
import coffeImage from '@/public/coffeImage.png';
import trophyImage from '@/public/trophyimage.png';
import { useRouter } from 'next/navigation';
import { fetchAllUsers } from '@/app/api/api';

interface User {
    firstName: string;
    lastName: string;
    coffeeNumber: number; // Adjusted property name to be consistent with your original code
    score: number;
}

export default function UserListComponent() {
    const [userList, setUserList] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [sortOption, setSortOption] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const storedUserString = localStorage.getItem('user');
            const storedUser = storedUserString ? JSON.parse(storedUserString) : {};
            const token = localStorage.getItem('token');

            if (!storedUserString || !token) {
                localStorage.clear();
                router.push('/login');
            }

            console.log('token: ', token);
            setUser(storedUser);
            console.log('We fetched user...');

            const res = await fetchAllUsers();
            console.log("Response: ", res.data);
            setUserList(res.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleOptionClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortOption(value);
        if (value === "cofyNum") {
            coffeeNumSort();
        } else if (value === "rating") {
            ratingSort();
        }
    };

    const coffeeNumSort = () => {
        const sortedList = [...userList].sort((a, b) => b.coffeeNumber - a.coffeeNumber);
        setUserList(sortedList);
    };

    const ratingSort = () => {
        const sortedList = [...userList].sort((a, b) => b.score - a.score);
        setUserList(sortedList);
    };

    const topCoffeeUser = userList.length > 0 ? userList.reduce((max, user) => max.coffeeNumber > user.coffeeNumber ? max : user) : null;
    const topRatingUser = userList.length > 0 ? userList.reduce((max, user) => max.score > user.score ? max : user) : null;

    return (
        <>
            <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-6 max-w-2xl w-full'>
                <div className='mb-4'>
                    <label htmlFor="coffe" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                    <select id="coffe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-64" onChange={handleOptionClick}>
                        <option value="">Choose an option</option>
                        <option value="cofyNum">Number of coffee</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                <div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Coffee</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {userList.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.firstName}
                                        {(topCoffeeUser === user || topRatingUser === user) && <img src={trophyImage.src} alt="trophy" className="inline-block h-8 w-8 ml-1" />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <span>{user.coffeeNumber}</span>
                                            <img src={coffeImage.src} alt="coffee" className="inline-block h-8 w-8 ml-1" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
