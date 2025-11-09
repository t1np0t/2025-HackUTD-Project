'use client';
import { useState } from "react";
import { Bar } from "react-chartjs-2";

import Navbar from "../components/navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Vehicle = {
  year: string;
  name: string;
  price: string | number;
  seatCount: string | number;
  combinedMpg: string | number;
  vehicleImage: string;
  vehicleType: string;
};

export default function ComparePage() {
  const [selectedVehicles] = useState<Vehicle[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedVehicles");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const priceData = {
  labels: selectedVehicles.map((v) => `${v.name} (${v.year})`),
  datasets: [
    {
      label: "Vehicle Price ($)",
      data: selectedVehicles.map((v) =>
        typeof v.price === "string"
          ? Number(v.price.toString().replace(/[^0-9.-]+/g, ""))
          : Number(v.price)
      ),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const mpgData = {
  labels: selectedVehicles.map((v) => `${v.name} (${v.year})`),
  datasets: [
    {
      label: "Combined MPG",
      data: selectedVehicles.map((v) => Number(v.combinedMpg)),
      backgroundColor: "rgba(255, 159, 64, 0.6)",
      borderColor: "rgba(255, 159, 64, 1)",
      borderWidth: 1,
    },
  ],
};


  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="flex min-h-screen text-black bg-zinc-50 font-sans dark:bg-white relative">
      <Navbar />

      <main className="flex flex-col w-full min-h-screen text-center items-center bg-white pt-18">
        <b className="mb-16 mt-12 text-xl">Compare Vehicles:</b>
        <div className="flex flex-col w-1/2 h-3/4 gap-6">
          <Bar data={priceData} options={chartOptions} />
          <Bar data={mpgData} options={chartOptions} />
        </div>
      </main>
    </div>
  );
}
