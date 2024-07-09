"use client";

import React, { useState } from 'react';
import ToolbarComponent from '../headerComponent';
import coffeImage from '@/public/coffeImage.png';
import trophyImage from '@/public/trophyimage.png';

export default function UserListComponent() {
    const [userList, setUserList] = useState([
        {
            firstName: "Teo",
            lastName: "Jakšić",
            coffeNumber: 10,
            score: 4.5,
        },
        {
            firstName: "Karlo",
            lastName: "Kovačević",
            coffeNumber: 15,
            score: 3.8,
        },
        {
            firstName: "Andrija",
            lastName: "Škontra",
            coffeNumber: 18,
            score: 4.2,
        },
        {
            firstName: "Šime",
            lastName: "Rončević",
            coffeNumber: 5,
            score: 3.6,
        }
    ]);

    const [sortOption, setSortOption] = useState("");

    const handleOptionClick = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setSortOption(value);
        if (value === "cofyNum") {
            coffyNumSort();
        } else if (value === "rating") {
            ratingSort();
        }
    };

    const coffyNumSort = () => {
        const sortedList = [...userList].sort((a, b) => b.coffeNumber - a.coffeNumber);
        setUserList(sortedList);
    };

    const ratingSort = () => {
        const sortedList = [...userList].sort((a, b) => b.score - a.score);
        setUserList(sortedList);
    };

    const topCoffeUser = userList[0]?.coffeNumber === Math.max(...userList.map(user => user.coffeNumber)) ? userList[0] : null;
    const topRatingUser = userList[0]?.score === Math.max(...userList.map(user => user.score)) ? userList[0] : null;

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
                                            {(topCoffeUser === user || topRatingUser === user) && <img src={trophyImage.src} alt="trophy" className="inline-block h-8 w-8 ml-1" />}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <span>{user.coffeNumber}</span>
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
