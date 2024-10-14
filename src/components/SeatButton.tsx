import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import TicketManagerABI from './TicketManagerABI.json';
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface SeatButtonProps {
  seatNumber: string;
  eventUuid: string;
  ticketPrice: bigint; // Ensure ticketPrice is bigint
}

const SeatButton: React.FC<SeatButtonProps> = ({ seatNumber, eventUuid, ticketPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seatNft, setSeatNft] = useState<string | null>(null);
  const { data: hash, writeContract } = useWriteContract();
  const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });
    
  const { data: seatNftData } = useReadContract({
    abi: TicketManagerABI,
    address: '0xacde419756038dbd32e39dc362fcced43aacadd5',
    functionName: 'getSeatNFT',
    args: [eventUuid, seatNumber],
  });

  useEffect(() => {
    if (seatNftData) {
      setSeatNft(seatNftData as string);
    }
  }, [seatNftData]);

  const handlePurchaseSeat = async () => {
    try {
      await writeContract({
        abi: TicketManagerABI,
        address: '0xacde419756038dbd32e39dc362fcced43aacadd5',
        functionName: 'purchaseSeat',
        args: [eventUuid, seatNumber],
        value: ticketPrice, // Pass ticketPrice as value
      });
    } catch (error) {
      console.error("Error purchasing seat:", error);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
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

      <Modal isOpen={isModalOpen} onClose={closeModal} seatNumber={seatNumber} nftLink={seatNft} isAvailable={!seatNft} onPurchase={handlePurchaseSeat} />
    </>
  );
};

export default SeatButton;
