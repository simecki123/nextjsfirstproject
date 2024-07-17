"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import coffeImage from '@/public/coffeImage.png';
import trophyImage from '@/public/trophyimage.png';
import { fetchAllUsers } from '@/app/api/api';

interface User {
    firstName: string;
    lastName: string;
    coffeeCounter: number;
    coffeeRating: number;
}

enum SortOption {
    CoffeeCount = "coffeeCount",
    Rating = "rating"
}

export default function UserListComponent() {
    const [userList, setUserList] = useState<User[]>([]);
    const [sortOption, setSortOption] = useState<SortOption>(SortOption.CoffeeCount);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetchAllUsers();
            const users = res.data || [];
            setUserList(sortUsersByCoffeeCount(users));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOption = event.target.value as SortOption;
        setSortOption(newSortOption);
        setUserList(sortUsers(userList, newSortOption));
    };

    const sortUsersByCoffeeCount = (users: User[]): User[] => {
        return [...users].sort((a, b) => b.coffeeCounter - a.coffeeCounter);
    };

    const sortUsersByRating = (users: User[]): User[] => {
        return [...users].sort((a, b) => b.coffeeRating - a.coffeeRating);
    };

    const sortUsers = (users: User[], option: SortOption): User[] => {
        return option === SortOption.CoffeeCount
            ? sortUsersByCoffeeCount(users)
            : sortUsersByRating(users);
    };

    const topUser = userList.length > 0 ? userList[0] : null;

    return (
        <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-6 max-w-2xl w-full'>
            <div className='mb-4'>
                <label htmlFor="sortOption" className="block mb-2 text-sm font-medium text-gray-900">Sort by</label>
                <select
                    id="sortOption"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-64"
                    onChange={handleSortOptionChange}
                    value={sortOption}
                >
                    <option value={SortOption.CoffeeCount}>Number of coffees</option>
                    <option value={SortOption.Rating}>Rating</option>
                </select>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Coffees</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {userList.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.firstName}
                                {user === topUser && (
                                    <Image
                                        src={trophyImage}
                                        alt="trophy"
                                        className="inline-block ml-1"
                                        width={32}
                                        height={32}
                                    />
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                    <span>{user.coffeeCounter}</span>
                                    <Image
                                        src={coffeImage}
                                        alt="coffee"
                                        className="inline-block ml-1"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.coffeeRating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}