import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Superior Tasker</h1>
        <Link href={'/login'} >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">Login here</button>
        </Link>
      </div>
    </main>
  );
}
