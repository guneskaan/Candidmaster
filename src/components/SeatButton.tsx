import React, { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import TicketManagerABI from './TicketManagerABI.json';
import Modal from './Modal';

interface SeatButtonProps {
  seatNumber: string;
  eventUuid: string;
  ticketPrice: bigint; // Ensure ticketPrice is bigint
}

const SeatButton: React.FC<SeatButtonProps> = ({ seatNumber, eventUuid, ticketPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seatNft, setSeatNft] = useState<string | null>(null);
  
  const { data: seatNftData, refetch, isError: isErrorReadingNft } = useReadContract({
    abi: TicketManagerABI,
    address: '0xACDe419756038dBd32E39dC362fccEd43aACadD5',
    functionName: 'getSeatNFT',
    args: [eventUuid, seatNumber],
  });

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    // Only set seatNft if seatNftData is defined
    if (seatNftData) {
      setSeatNft(seatNftData.toString());
    } else {
      setSeatNft(null);
    }
  }, [seatNftData]);

  useEffect(() => {
    if (isErrorReadingNft) {
      console.error("Error reading NFT data:", isErrorReadingNft);
    }
  }, [isErrorReadingNft]);

  const handlePurchaseSeat = async () => {
    console.log("Purchase seat clicked");
    try {
      await writeContract({
        address: '0xACDe419756038dBd32E39dC362fccEd43aACadD5',
        abi: TicketManagerABI,
        functionName: 'purchaseSeat',
        args: [eventUuid, seatNumber],
        value: ticketPrice,
      });
      console.log("Transaction submitted successfully.");

      // Start polling to fetch the new seat NFT after a successful transaction
      pollForSeatNFT();
    } catch (error) {
      console.error("Error purchasing seat:", error);
    }
  };

  // Polling function to retry fetching seat NFT
  const pollForSeatNFT = async (retries = 5, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
      await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
      try {
        await refetch(); // Attempt to fetch the seat NFT again
        // If the fetch is successful and returns data, break out of the loop
        if (seatNftData) {
          setSeatNft(seatNftData.toString());
          break;
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a
        href="#"
        onClick={handleClick}
        className={`w-12 h-8 flex items-center justify-center ml-2 text-lg font-medium ${seatNft ? 'bg-gray-800' : 'bg-green-600'} text-white rounded-md`}
      >
        {seatNumber}
      </a>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        seatNumber={seatNumber} 
        nftLink={seatNft} 
        isAvailable={!seatNft} 
        ticketPrice={ticketPrice}
        onPurchase={handlePurchaseSeat}
        isConfirming={isConfirming}
      />
    </>
  );
};

export default SeatButton;
