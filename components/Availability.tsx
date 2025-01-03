"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

// Define a type for availability slots
interface AvailabilitySlot {
  time: string;
  available: boolean;
}

export default function Availability() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]); // Change type here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckAvailability = async () => {
    if (!date || !time) {
      setError("Please select both date and time.");
      return;
    }

    setLoading(true);
    setError("");
    setAvailability([]);

    try {
      // Send a POST request to check availability
      const response = await axios.post("https://rtm-backend-o47d.onrender.com/api/checkBooking", {
        date,
        time,
      });

      // Handle the response
      if (response.status === 200 && response.data.booking) {
        // Assuming response.data.booking is an array of slots with `time` and `available` properties
        const bookingData: AvailabilitySlot[] = response.data.booking.map((slot: any) => ({
          time: slot.time,
          available: slot.available,
        }));
        setAvailability(bookingData);
      } else if (response.status === 404) {
        setError(response.data.message || "No booking found for the selected date and time.");
      } else {
        setError("No booking found for the selected date and time. Please Book the Table.");
      }
    } catch (err) {
      // Handle errors
      if (err instanceof AxiosError) {
        setError(err.response?.data.error || "An error occurred while fetching availability.");
      } else if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("Failed to fetch availability. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Check Availability</h2>

      {/* Date Input */}
      <label htmlFor="date" className="block mb-2 font-semibold">
        Date:
      </label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded border-blue-500 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Time Input */}
      <label htmlFor="time" className="block mb-2 font-semibold">
        Time:
      </label>
      <input
        type="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded border-green-500 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Check Availability Button */}
      <button
        onClick={handleCheckAvailability}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Availability"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Availability Results */}
      {availability.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Available Slots:</h3>
          <ul className="mt-4 space-y-2">
            {availability.map((slot, index) => (
              <li
                key={index}
                className={`px-4 py-2 rounded ${
                  slot.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {slot.time} - {slot.available ? "Available" : "Booked"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
