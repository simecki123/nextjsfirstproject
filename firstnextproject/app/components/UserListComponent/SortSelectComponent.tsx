'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export enum SortOption {
    CoffeeCount = "coffeeCount",
    Rating = "rating"
}

interface SortSelectorProps {
    sortOption: SortOption;
}

export default function SortSelectComponent({ sortOption }: SortSelectorProps) {
    const router = useRouter();

    const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortOption = event.target.value as SortOption;
        console.log('Changing sort to:', newSortOption); // Add this line for debugging
        router.push(`leaderboard?sort=${newSortOption}`);
    };

    return (
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
    );
}