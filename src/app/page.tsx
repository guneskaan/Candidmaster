"use client"

// src/app/page.tsx
import { useState } from "react"; // Import useState for managing component state
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import EventCreator from "@/components/EventCreator"; // Import EventCreator

export default function Home() {
  const [isEventCreator, setIsEventCreator] = useState(false); // State to track selected mode

  return (
    <Container>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Select Your Role</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsEventCreator(true)}
            className={`p-2 ${isEventCreator ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Event Creator
          </button>
          <button
            onClick={() => setIsEventCreator(false)}
            className={`p-2 ${!isEventCreator ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Event Enthusiast
          </button>
        </div>
      </div>

      {/* Conditionally render Hero or EventCreator based on the selected role */}
      {isEventCreator ? <EventCreator /> : <Hero />}
    </Container>
  );
}
