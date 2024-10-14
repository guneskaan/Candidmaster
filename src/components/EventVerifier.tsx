// src/components/EventVerifier.tsx
import { useState } from "react";
import { Container } from "@/components/Container";
import { SeatPicker } from "@/components/SeatPicker";

const EventVerifier = () => {
  const [eventUuid, setEventUuid] = useState("");
  const [isEventConfirmed, setIsEventConfirmed] = useState(false);

  const fetchEventData = async (uuid: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handleVerifyEvent = async () => {
    try {
      await fetchEventData(eventUuid);
      setIsEventConfirmed(true);
    } catch (error) {
      console.error("Error verifying event:", error);
    }
  };

  return (
    <Container className="flex flex-col items-center justify-start p-4 mt-80"> {/* Adjusted styles */}
      {!isEventConfirmed && (
        <>
          <h2 className="text-lg font-bold mb-4">Enter Event UUID</h2>
          <input
            type="text"
            value={eventUuid}
            onChange={(e) => setEventUuid(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4"
            placeholder="uuid"
          />
          <button
            onClick={handleVerifyEvent}
            className="bg-blue-500 text-white p-2 rounded"
          >
            View Event
          </button>
        </>
      )}
      {isEventConfirmed && <SeatPicker />}
    </Container>
  );
};

export default EventVerifier;
