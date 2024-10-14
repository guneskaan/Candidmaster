import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  seatNumber: string;
  nftLink: string | null;  // Add link to the NFT or indicate if available for purchase
  isAvailable: boolean;    // Whether the seat is available for purchase
  onPurchase?: () => void; // Optional purchase function if seat is available
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, seatNumber, nftLink, isAvailable, onPurchase }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Seat {seatNumber}</h2>
        {isAvailable ? (
          <div>
            <p>This seat is available for purchase.</p>
            {onPurchase && (
              <button
                onClick={onPurchase}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Purchase Seat
              </button>
            )}
          </div>
        ) : (
          <a
            href={nftLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View NFT on BaseScan
          </a>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
