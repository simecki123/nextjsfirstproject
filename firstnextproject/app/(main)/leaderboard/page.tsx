import SortSelectComponent, { SortOption } from '@/app/components/user-list/SortSelectComponent';
import UserListComponent from '@/app/components/user-list/UserListComponent';
import React from 'react'

export const dynamic = 'force-dynamic'; // Add this line

export default function Leaderboard({ searchParams }: { searchParams: { sort?: string } }) {
  console.log('Received sort parameter:', searchParams.sort);
  const sortOption = (searchParams.sort as SortOption) || SortOption.CoffeeCount;

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-6 max-w-2xl w-full'>
        <SortSelectComponent sortOption={sortOption} />
        <UserListComponent sortOption={sortOption} />
      </div>
    </div>
  )
}

export const revalidate = 1;
