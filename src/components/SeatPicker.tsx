"use client"
import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import Image from "next/image";
import heroImg from "../../public/img/hero.png";
import TicketManagerABI from "./TicketManagerABI.json";
import SeatButton from "./SeatButton";

// Define EventData interface
interface EventData {
  name: string;
  date: string;
  location: string;
  ticketPrice: bigint; // Ensure this is bigint
}

const SeatPicker: React.FC<{ eventUuid: string }> = ({ eventUuid }) => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [seats, setSeats] = useState<string[]>([]);

  // Use wagmi to read contract
  const { data: fetchedEventData, refetch } = useReadContract({
    abi: TicketManagerABI,
    address: '0xACDe419756038dBd32E39dC362fccEd43aACadD5',
    functionName: 'getEvent',
    args: [eventUuid]
  });

  // Use effect to process fetched event data and generate seats
  useEffect(() => {
    if (fetchedEventData && Array.isArray(fetchedEventData)) {
      const [name, ticketPrice, soldCount] = fetchedEventData as [string, bigint, number]; // Adjusted types
      setEventData({
        name,
        date: "", // You can set this if your contract has a date field
        location: "", // You can set this if your contract has a location field
        ticketPrice: BigInt(ticketPrice.toString()), // Convert to bigint
      });

      // Generate seats A1 to H10
      const generatedSeats: string[] = [];
      for (let i = 1; i <= 10; i++) {
        for (let j = 65; j <= 72; j++) { // ASCII values for A to H
          generatedSeats.push(String.fromCharCode(j) + i);
        }
      }
      setSeats(generatedSeats);
    }
  }, [fetchedEventData]);

  useEffect(() => {
    // Fetch event data immediately on mount
    refetch();

    // Set an interval to fetch data every 20 seconds
    const intervalId = setInterval(() => {
      refetch();
    }, 20000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [eventUuid, refetch]);

  return (
    <div className="flex flex-col items-center mb-4"> {/* Center items */}
      {eventData && (
        <h2 className="text-xl font-bold mb-4 text-center">{eventData.name}</h2> // Center the event name
      )}
      <div className="flex"> {/* Flex container for image and seats */}
        <Image
          src={heroImg}
          height={0}
          width={0}
          style={{ width: "600px", height: "auto" }}
          className="object-cover mb-4"
          alt="Hero Illustration"
          loading="eager"
          placeholder="blur"
        />
        <div className="ml-4"> {/* Left margin for spacing */}
          {/* Render seats in rows */}
          {Array.from({ length: 8 }, (_, rowIndex) => ( // 8 rows for A to H
            <div key={rowIndex} className="flex mb-2"> {/* Flex container for each row */}
              {Array.from({ length: 5 }, (_, seatIndex) => { // 10 seats per row
                const seat = String.fromCharCode(65 + rowIndex) + (seatIndex + 1); // Generate seat names
                return (
                  <SeatButton
                    key={seat}
                    seatNumber={seat}
                    eventUuid={eventUuid}
                    ticketPrice={eventData?.ticketPrice || BigInt(0)} // Ensure it's a bigint
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatPicker;
