"use client"

// src/app/page.tsx
import { useState } from "react"; // Import useState for managing component state
import { Container } from "@/components/Container";
import EventVerifier from "@/components/EventVerifier"; // Import EventVerifier
import EventCreator from "@/components/EventCreator"; // Import EventCreator

export default function Home() {
  const [roleSelected, setRoleSelected] = useState(false); // State to track if a role has been selected
  const [isEventCreator, setIsEventCreator] = useState(false); // State to track selected mode

  const handleRoleSelection = (isCreator: boolean) => {
    setIsEventCreator(isCreator);
    setRoleSelected(true); // Set role as selected
  };

  return (
    <Container className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Select Your Role</h1>
        <div className="flex gap-4">
          <button
            onClick={() => handleRoleSelection(true)}
            className={`p-2 ${isEventCreator ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:bg-gray-300 focus:text-gray-900"} rounded-md shadow-md`}
          >
            Event Creator
          </button>
          <button
            onClick={() => handleRoleSelection(false)}
            className={`p-2 ${!isEventCreator ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:bg-gray-300 focus:text-gray-900"} rounded-md shadow-md`}
          >
            Event Enthusiast
          </button>
        </div>
      </div>

      {/* Render EventVerifier only if the Event Enthusiast role is selected */}
      {roleSelected && !isEventCreator && <EventVerifier />}
      
      {/* Conditionally render EventCreator only if the Event Creator role is selected */}
      {roleSelected && isEventCreator && <EventCreator />}
    </Container>
  );
}
