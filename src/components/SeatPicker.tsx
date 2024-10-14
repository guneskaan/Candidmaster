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
  const { data: fetchedEventData } = useReadContract({
    abi: TicketManagerABI,
    address: '0xacde419756038dbd32e39dc362fcced43aacadd5',
    functionName: 'getEvent',
    args: [eventUuid],
  });

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

  return (
    <div className="flex flex-col items-center">
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
      <div className="flex flex-wrap justify-start">
        {seats.map((seat, index) => (
          <SeatButton
            key={index}
            seatNumber={seat}
            eventUuid={eventUuid}
            ticketPrice={eventData?.ticketPrice || BigInt(0)} // Ensure it's a bigint
          />
        ))}
      </div>
    </div>
  );
};

export default SeatPicker;
