import Link from "next/link";

export default function Header() {

  return (
    <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src='/coffeeprofile.png' width={40} height={33} className='mr-4 mb-2' alt="Coffee" />
        <Link href="/mainpage" className="text-2xl font-semibold">Brewify</Link>
        <Link href="/leaderboard?sort=coffeeCount" className="ml-8">Leaderboard</Link>
      </div>
      <div className="flex items-center">
        <Link href="/notification" className="mr-8">Notifications</Link>
        <Link href="/event" className="mr-8">My event</Link>
        <Link href="/my-orders" className="mr-8">My orders</Link>
        <Link href="/login" className="bg-white text-black rounded-2xl px-4 py-2">Logout</Link>
      </div>
    </div>
  );
}







