// app/leaderboard/page.tsx
import React from 'react'
import UserListComponent from '@/app/components/UserListComponent/UserListComponent';
import SortSelectComponent from '@/app/components/UserListComponent/SortSelectComponent';

export default function Leaderboard({ searchParams }: { searchParams: { sort?: string } }) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white bg-opacity-60 shadow-lg rounded-lg p-6 max-w-2xl w-full'>
        <SortSelectComponent sortOption={searchParams.sort as any || 'coffeeCount'} />
        <UserListComponent searchParams={searchParams} />
      </div>
    </div>
  )
}