"use client";
import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import TicketManagerABI from "./TicketManagerABI.json"; // Adjust the path as necessary
import { Interface, keccak256, toUtf8Bytes } from 'ethers'; // Import toUtf8Bytes

const EventCreator = () => {
  const [eventName, setEventName] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [eventUuid, setEventUuid] = useState(""); // State to store the event UUID
  const { data: hash, writeContract } = useWriteContract();
  const ticketManagerInterface = new Interface(TicketManagerABI);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await writeContract({
      address: '0xACDe419756038dBd32E39dC362fccEd43aACadD5',
      abi: TicketManagerABI,
      functionName: 'createEvent',
      args: [eventName, ticketPrice],
    });
  }

  // Wait for the transaction receipt
  const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    });

  // Use useEffect to check when the receipt is confirmed
  useEffect(() => {
    if (isConfirmed && receipt) {
      // Get the event signature to calculate the topic
      const eventNameWithParams = 'EventCreated(string,string)'; // Event signature with parameters
      const eventCreatedTopic = keccak256(toUtf8Bytes(eventNameWithParams)); // Calculate the event topic

      // Find the log matching the event topic
      const eventCreatedLog = receipt.logs.find(log => {
        return log.topics[0] === eventCreatedTopic; // Adjust if your event has multiple indexed parameters
      });

      if (eventCreatedLog) {
        // Decode the log data using the interface
        const decoded = ticketManagerInterface.decodeEventLog(
          'EventCreated', // The name of the event
          eventCreatedLog.data, // The log data
          eventCreatedLog.topics // The log topics
        );

        setEventUuid(decoded[0]); // Assuming the event returns a UUID as the first parameter
      }
    }
  }, [isConfirmed, receipt, ticketManagerInterface]);

  return (
    <div className="p-4 mt-80">
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
        {isConfirmed && eventUuid && <div>Event confirmed! Event UUID: {eventUuid}</div>}
      </form>
    </div>
  );
};

export default EventCreator;
