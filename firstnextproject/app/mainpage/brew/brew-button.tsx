'use client'
import { useRouter } from "next/navigation"

export default function BrewButton() {
  const router = useRouter();
  return (
    <button className="px-4 py-2 bg-gray-600 text-white rounded
      hover:bg-black grow hover:scale-105 transition"
      onClick={() => router.push('/mainpage')}>BREW</button>
  )
}
