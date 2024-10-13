"use client";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import TicketManagerABI from "./TicketManagerABI.json"; // Adjust the path as necessary

const EventCreator = () => {
  const [eventName, setEventName] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const { data: hash, isPending, writeContract } = useWriteContract();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault()
    writeContract({
      address: '0xACDe419756038dBd32E39dC362fccEd43aACadD5',
      abi: TicketManagerABI,
      functionName: 'createEvent',
      args: [eventName, ticketPrice],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  })

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Create Event</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          placeholder="Ticket Price (in wei)"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Event
        </button>
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Event confirmed! Event Uuid: </div>}
      </form>
    </div>
  );
};

export default EventCreator;
