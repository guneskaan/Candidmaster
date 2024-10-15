"use client";
import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import TicketManagerABI from "./TicketManagerABI.json"; // Adjust the path as necessary
import { Interface, keccak256, toUtf8Bytes } from 'ethers'; // Import toUtf8Bytes

const EventCreator = () => {
  const [eventName, setEventName] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [eventUuid, setEventUuid] = useState(""); // State to store the event UUID
  const [isEventCreator, setIsEventCreator] = useState<boolean | null>(null); // Track role selection
  const { data: hash, writeContract } = useWriteContract();
  const ticketManagerInterface = new Interface(TicketManagerABI);

  const handleRoleSelection = (isCreator: boolean) => {
    setIsEventCreator(isCreator);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await writeContract({
      address: '0xACDe419756038dBd32E39dC362fccEd43aACadD5',
      abi: TicketManagerABI,
      functionName: 'createEvent',
      args: [eventName, ticketPrice],
    });
  }

  async function handleWithdraw(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await writeContract({
      address: '0xACDe419756038dBd32E39dC362fccEd43aACadD5',
      abi: TicketManagerABI,
      functionName: 'withdraw',
      args: [eventUuid],
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
      <h2 className="text-lg font-bold text-center mb-4">Select Option</h2> {/* Changed to "Select Option" and centered */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => {
            handleRoleSelection(true);
            setEventName(""); // Clear form on selection
            setTicketPrice("");
            setEventUuid("");
          }}
          className={`p-2 ${isEventCreator === true ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:bg-gray-300 focus:text-gray-900"} rounded-md shadow-md`}
        >
          Create Event
        </button>
        <button
          onClick={() => {
            handleRoleSelection(false);
            setEventName(""); // Clear form on selection
            setTicketPrice("");
            setEventUuid("");
          }}
          className={`p-2 ${isEventCreator === false ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:bg-gray-300 focus:text-gray-900"} rounded-md shadow-md`}
        >
          Withdraw Ticket Sales
        </button>
      </div>

      {isEventCreator === true && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-4">
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
      )}

      {isEventCreator === false && (
        <form onSubmit={handleWithdraw} className="flex flex-col space-y-4 mb-4">
          <input
            type="text"
            placeholder="Event UUID"
            value={eventUuid}
            onChange={(e) => setEventUuid(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Withdraw Ticket Sales
          </button>
        </form>
      )}
    </div>
  );
};

export default EventCreator;
