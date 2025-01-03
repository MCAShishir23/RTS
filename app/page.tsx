"use client";

import { useState } from "react";
export default function Home() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Log the form data to the console
    console.log("Form Data:", form);
  
    try {
      const response = await fetch("http://localhost:2410/api/addReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        setSuccessMessage("Booking created successfully!");
        setForm({ name: "", contact: "", date: "", time: "", guests: "" });
        
        // // Redirect to another route (e.g., "/bookings")
        // const navigate = useNavigate();
        // navigate("/bookings");  // Adjust the route as needed
      } else {
        console.error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Restaurant Table Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
  type="text"
  name="name"
  value={form.name}
  onChange={handleChange}
  placeholder="Your Name"
  className="w-full p-2 border rounded bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>

<input
  type="text"
  name="contact"
  value={form.contact}
  onChange={handleChange}
  placeholder="Contact Number"
  className="w-full p-2 border rounded bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>

<input
  type="date"
  name="date"
  value={form.date}
  onChange={handleChange}
  className="w-full p-2 border rounded bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>

<input
  type="time"
  name="time"
  value={form.time}
  onChange={handleChange}
  className="w-full p-2 border rounded bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>

<input
  type="number"
  name="guests"
  value={form.guests}
  onChange={handleChange}
  placeholder="Number of Guests"
  className="w-full p-2 border rounded bg-blue-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Book Now
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-500 font-semibold">{successMessage}</p>
      )}
    </div>
  );
}
