'use client';
import logo from '../../public/Logo_Toyota.svg.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter();

    return (
      <div className="fixed w-full flex items-center justify-between px-6 bg-white z-50 border-b-2 border-black">
        <div className="flex items-center">
          <Image src={logo} alt="Toyota Logo" width={170} height={100} />
        </div>

        <div className='space-x-6'>
          <button
            className="bg-red-600 cursor-pointer text-white px-5 py-2 rounded shadow-lg hover:scale-110 transition-transform duration-200"
            onClick={() => router.push("/")}
          >
            Home
          </button>

          <button
            className="bg-red-600 cursor-pointer text-white px-5 py-2 rounded shadow-lg hover:scale-110 transition-transform duration-200"
            onClick={() => router.push("/compare")}
          >
            Compare
          </button>

          <button
            className="bg-red-600 cursor-pointer text-white px-5 py-2 rounded shadow-lg hover:scale-110 transition-transform duration-200"
            onClick={() => router.push("/bookmarks")}
          >
            Bookmarks
          </button>
        </div>
      </div>
    );   
}