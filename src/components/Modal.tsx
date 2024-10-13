import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  seatNumber: string;
  owners: string[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, seatNumber, owners }) => {
  if (!isOpen) return null;

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Owners of Seat {seatNumber}</h2>
        <ul className="space-y-2">
          {owners.length > 0 ? (
            owners.map((owner, index) => (
              <li key={index} className="flex items-center">
                <a
                  href={`https://etherscan.io/address/${owner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <img
                    src="/img/etherscan.png" // Replace with the correct path to Etherscan logo
                    alt="Etherscan"
                    className="h-4 w-4 mr-1"
                  />
                  {shortenAddress(owner)}
                </a>
              </li>
            ))
          ) : (
            <li>No owners found for this seat.</li>
          )}
        </ul>
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
