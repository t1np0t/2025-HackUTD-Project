'use client';
import { useState } from "react";
import { vehicleData } from "../page";
import Navbar from "../components/navbar";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";

type Vehicle = typeof vehicleData[number];

export default function Bookmarks() {
  const [bookmarkedVehicles] = useState<Vehicle[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookmarkedVehicles");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  return (
    <div className="flex min-h-screen text-black bg-zinc-50 font-sans dark:bg-white relative">
      <Navbar />

      <main className="flex flex-col w-full min-h-screen text-center items-center bg-white pt-18">
        <b className="mb-12 mt-12 text-xl">Bookmarked Vehicles:</b>
        <div className="grid gap-4 grid-cols-3 justify-center items-center text-sm w-1/2">
          {bookmarkedVehicles.length > 0 ? (
            bookmarkedVehicles.map((info, index) => {
              return (
                <div
                  key={index}
                  className="border-4 rounded-xl p-2 relative transition-all duration-200 border-gray-900"
                >
                  <b>
                    {info.name} - {info.year}
                  </b>
                  <p>
                    {info.seatCount} seats - {info.combinedMpg} mpg -{" "}
                    {info.price}
                  </p>
                  <img
                    src={info.vehicleImage}
                    alt={`${info.name} ${info.year}`}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-gray-700 col-span-3 text-2xl">
              No vehicles found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
