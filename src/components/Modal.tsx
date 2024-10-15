"use client";
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  seatNumber: string;
  nftLink: string | null;  // Add link to the NFT or indicate if available for purchase
  isAvailable: boolean;    // Whether the seat is available for purchase
  ticketPrice: bigint;     // Add ticketPrice to display in the modal
  onPurchase?: () => void; // Optional purchase function if seat is available
  isConfirming: boolean;   // Loading state for purchase
}

const EthereumLogo: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={20}
    height={20}
    className="inline"
  >
    <path
      fill="#3C3C3D"
      d="M32 0l32 48-32 16L0 48l32-48z"
    />
    <path
      fill="#8C8C8D"
      d="M32 43.5L0 48l32-16 32 16-32-4.5z"
    />
    <path
      fill="#3C3C3D"
      d="M32 64L0 48l32-4.5L32 64z"
    />
  </svg>
);

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, seatNumber, nftLink, isAvailable, ticketPrice, onPurchase, isConfirming }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Seat {seatNumber}</h2>
        <p className={`mb-2 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
          {isAvailable ? (
            <span>
              This seat is available for purchase at {ticketPrice.toString()} Wei{' '}
              <EthereumLogo />
            </span>
          ) : (
            'This seat is sold out.'
          )}
        </p>

        {isAvailable ? (
          <div>
            <button
              onClick={onPurchase}
              disabled={isConfirming} // Disable button while confirming
              className={`mt-4 px-4 py-2 ${isConfirming ? 'bg-gray-400' : 'bg-green-600'} text-white rounded-md hover:bg-green-500 transition`}
            >
              {isConfirming ? 'Purchasing...' : 'Purchase Seat'}
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <a
              href={nftLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-500 hover:underline"
            >
              View NFT on BaseScan
            </a>
          </div>
        )}

        {/* Always show the close button */}
        <button
          onClick={onClose}
          className="mt-2 block px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
