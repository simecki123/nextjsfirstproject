'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { patchEventToDone } from "@/app/api/api";

interface EndEventButtonProps {
  userId: string;
}

export default function EndEventButton({ userId }: EndEventButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCoffeeDoneFunction = async () => {
    try {
      await patchEventToDone(userId);
      console.log("Event updated successfully");
      router.push('/mainpage');
    } catch (err) {
      setError("Failed to update event");
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="bg-black text-white cursor-pointer hover:scale-105 transition rounded-xl py-6 px-6"
        onClick={handleCoffeeDoneFunction}
      >
        <p className="text-2xl">Coffee Done</p>
      </div>
      {error && (
        <p className="text-red-600 mt-2">{error}</p>
      )}
    </>
  )
}
