// app/leaderboard/UserListComponent.tsx
import React from 'react';
import Image from 'next/image';
import coffeImage from '@/public/coffeImage.png';
import trophyImage from '@/public/trophyimage.png';
import { fetchAllUsers } from '@/app/api/api';
import { SortOption } from './SortSelectComponent';
import { cookies } from 'next/headers';

interface User {
    firstName: string;
    lastName: string;
    coffeeCounter: number;
    coffeeRating: number;
}

function sortUsersByCoffeeCount(users: User[]): User[] {
    return [...users].sort((a, b) => b.coffeeCounter - a.coffeeCounter);
}

function sortUsersByRating(users: User[]): User[] {
    return [...users].sort((a, b) => b.coffeeRating - a.coffeeRating);
}

function sortUsers(users: User[], option: SortOption): User[] {
    return option === SortOption.CoffeeCount
        ? sortUsersByCoffeeCount(users)
        : sortUsersByRating(users);
}

export default async function UserListComponent({ searchParams }: { searchParams: { sort?: string } }) {
    const sortOption = (searchParams.sort as SortOption) || SortOption.CoffeeCount;
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');

    const res = await fetchAllUsers(tokenCookie?.value);
    const users = res.data || [];
    const sortedUsers = sortUsers(users, sortOption);
    const topUser = sortedUsers.length > 0 ? sortedUsers[0] : null;

    return (
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
                {sortedUsers.map((user, index) => (
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
    );
}