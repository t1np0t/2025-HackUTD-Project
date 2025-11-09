"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import vehicleData from "../scripts/vehicleData.json"

export default function Home() {
  const [selectedVehicles, setSelectedVehicle] = useState<number[]>([]);
  const selectItem = (index:number) => {
    setSelectedVehicle(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
  }
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-white">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white">
        <div className="w-full min-h-screen flex items-center justify-center">
          <button
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-5 py-2 rounded shadow-lg"
            onClick={() => router.push("/compare.tsx")}
          >
            Compare
          </button>
          <div className="grid grid-cols-5 gap-5 text-center text-black sm:items-start sm:text-left w-full min-w-7xl">
            {vehicleData.map((info, index) => (
              <div
                className={`border-4 rounded-xl cursor-pointer p-2 ${
                  selectedVehicles.includes(index)
                    ? "border-green-500"
                    : "border-gray-900"
                }`}
                key={index}
                onClick={() => selectItem(index)}
              >
                <b>{info.name}</b>
                <p>{info.year}</p>
                <p>{info.seatCount} seats</p>
                <div className="grid grid-cols-2">
                  <p>{info.combinedMpg} mpg </p>
                </div>
                <img src={info.vehicleImage} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
