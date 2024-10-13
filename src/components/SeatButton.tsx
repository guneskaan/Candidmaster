import { useReadContract } from 'wagmi';
import { abi } from './TicketManagerABI';
import React, { useState } from 'react';
import Modal from './Modal'; // Import the modal component

interface SeatButtonProps {
  seatNumber: string;
}

const SeatButton: React.FC<SeatButtonProps> = ({ seatNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [owners, setOwners] = useState<string[]>([]); // State for seat owners

  // Read contract for seat availability
  const { data: isAvailable } = useReadContract({
    abi,
    address: '0xAa1398f415596CB1C11A3e24230d040BA776e9f4',
    functionName: 'isSeatAvailable',
    args: [seatNumber],
  });

  // Read contract for seat owners
  const { data: ownersData } = useReadContract({
    abi,
    address: '0xAa1398f415596CB1C11A3e24230d040BA776e9f4',
    functionName: 'getSeatOwners',
    args: [seatNumber],
    enabled: isModalOpen, // Only call when modal is open
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  // Update owners state when the modal is opened
  React.useEffect(() => {
    if (ownersData) {
      setOwners(ownersData as string[]); // Update state with owners
    }
  }, [ownersData]);

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <a
        href="#"
        onClick={handleClick}
        className={`w-12 h-8 flex items-center justify-center ml-2 text-lg font-medium ${isAvailable ? 'bg-indigo-600' : 'bg-gray-800'} text-white rounded-md`} // Set button size
      >
        {seatNumber}
      </a>

      {/* Render the modal with seat owners */}
      <Modal isOpen={isModalOpen} onClose={closeModal} seatNumber={seatNumber} owners={owners} />
    </>
  );
};

export default SeatButton;
