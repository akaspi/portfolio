// /app/components/AddShareButton.tsx
'use client';

import React, { useState } from 'react';
import EditShareModal from './EditShareModal';

const AddShareButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal in add mode
  const handleAddClick = () => {
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleAddClick}
        className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2 mb-4"
      >
        <span className="mr-2">+</span>
        Add
      </button>
      <EditShareModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={null}
        mode={'add'}
      />
    </div>
  );
};

export default AddShareButton;
