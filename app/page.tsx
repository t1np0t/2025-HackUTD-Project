'use client';
import { useEffect, useState } from "react";
import vehicleData from "../scripts/vehicleData.json";
import Navbar from "./components/navbar";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicles, setSelectedVehicle] = useState<typeof vehicleData[number][]>(() => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("selectedVehicles");
        return saved ? JSON.parse(saved) : [];
      }
      return [];
  });

  const [bookmarkedVehicles, setBookMarkedVehicles] = useState<typeof vehicleData[number][]>(() => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("bookmarkedVehicles");
        return saved ? JSON.parse(saved) : [];
      }
      return [];
  });

  const selectItem = (vehicle: typeof vehicleData[number]) => {
  setSelectedVehicle((prev) => {
    const exists = prev.some((v) => v.name === vehicle.name && v.year === vehicle.year);
    return exists
      ? prev.filter((v) => !(v.name === vehicle.name && v.year === vehicle.year))
      : [...prev, vehicle];
  });
};

const toggleBookmark = (vehicle: typeof vehicleData[number]) => {
  setBookMarkedVehicles((prev) => {
    const exists = prev.some((v) => v.name === vehicle.name && v.year === vehicle.year);
    return exists
      ? prev.filter((v) => !(v.name === vehicle.name && v.year === vehicle.year))
      : [...prev, vehicle];
  });
}

  const filterByString = vehicleData.filter((info) =>
    `${info.name}`.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("selectedVehicles", JSON.stringify(selectedVehicles));
  }, [selectedVehicles]);

  useEffect(() => {
    localStorage.setItem("bookmarkedVehicles", JSON.stringify(bookmarkedVehicles));
  }, [bookmarkedVehicles]);

  return (
    <div className="flex min-h-screen justify-end bg-zinc-50 font-sans dark:bg-white relative">
      <Navbar />

      <main className="flex flex-row min-h-screen w-full bg-white pt-18">
        <div className="flex flex-col items-center text-black p-4 w-1/4 self-start border-r-2 h-full">
          <input
            type="text"
            placeholder="Search for a vehicle"
            className="border rounded p-2 w-3/4 text-center mb-10"
            value={searchTerm}
            onChange={(string) => setSearchTerm(string.target.value)}
          />

          <b className="mb-10">Selected Vehicles:</b>
          <div className="grid gap-4 grid-cols-2 justify-center items-center text-sm">
            {selectedVehicles.map((info, index) => (
              <div
                key={index}
                onClick={() => selectItem(info)}
                className="cursor-pointer border-4 rounded-xl p-2 w-[90%] transition-all duration-200 border-gray-900"
              >
                <b>
                  {info.name} - {info.year}
                </b>
                <p>
                  {info.seatCount} seats - {info.combinedMpg} mpg - {info.price}
                </p>
                <img
                  src={info.vehicleImage}
                  alt={`${info.name} ${info.year}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 text-center text-black w-3/4 p-8">
          {filterByString.length > 0 ? (
            filterByString.map((info, index) => {
              const isBookMarked = bookmarkedVehicles.some(
                (v) => v.name === info.name && v.year === info.year
              );

              return (
                <div
                  key={index}
                  onClick={() => selectItem(info)}
                  className={`border-4 rounded-xl cursor-pointer p-2 relative transition-all duration-200 ${
                    selectedVehicles.some(
                      (v) => v.name === info.name && v.year === info.year
                    )
                      ? "border-green-500"
                      : "border-gray-900"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(info);
                    }}
                    className="absolute top-2 right-2 text-3xl"
                  >
                    {isBookMarked ? <IoBookmark/> : <CiBookmark/>}
                  </button>
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
