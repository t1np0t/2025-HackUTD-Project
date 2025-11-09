"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import vehicleData from "../scripts/vehicleData.json";

export default function Home() {
  const [selectedVehicles, setSelectedVehicle] = useState<number[]>([]);
  const selectItem = (index: number) => {
    setSelectedVehicle((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const router = useRouter();

  return (
    <div className="flex min-h-screen justify-end bg-zinc-50 font-sans dark:bg-white relative">
      <button
          className="fixed top-0 w-full left-1/2 -translate-x-1/2 text-2xl cursor-pointer z-50 bg-red-600 text-white px-5 py-3 rounded shadow-lg"
        onClick={() => router.push("/compare")}
      >
        <b className="inline-block hover:scale-115 transition-all duration-250">Compare</b>
      </button>

      <main className="flex flex-row min-h-screen w-full bg-white pt-16">
        <div className="flex-1 text-black p-4 bg-gray-400 w-1/4 self-start h-full">
          test
        </div>

        <div className="grid grid-cols-3 gap-5 text-center text-black w-3/4 p-4">
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
              <b> {info.name} - {info.year} </b>
              <p> {info.seatCount} seats, {info.combinedMpg} mpg </p>
              <img
                src={info.vehicleImage}
                alt={`${info.name} ${info.year}`}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
