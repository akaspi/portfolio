// /app/components/EditShareModal.tsx
'use client';

import React, { useEffect, useState } from 'react';

export interface EditShareModalData {
  ticker: string;
  name: string;
  value: number;
  units: number;
  targetAllocation: string;
}

interface EditShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EditShareModalData | null;
  mode: 'edit' | 'add'; // New prop to determine the mode
  handleSubmit: (data: EditShareModalData) => void; // New prop for submit handler
}

const EditShareModal: React.FC<EditShareModalProps> = ({
  isOpen,
  onClose,
  data,
  mode,
  handleSubmit,
}) => {
  const [formData, setFormData] = useState<EditShareModalData | null>(data);

  // Update formData whenever the data prop changes
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Log message based on mode
  useEffect(() => {
    if (mode === 'add') {
      console.log('Opening modal in Add mode');
      // Initialize empty state for adding
      setFormData({
        ticker: '',
        name: '',
        value: 0,
        units: 0,
        targetAllocation: '',
      });
    } else {
      console.log('Opening modal in Edit mode');
    }
  }, [mode]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === "value" || name === "units" ? parseFloat(value) : value,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      handleSubmit(formData); // Call the submit handler with formData
    }
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <h2 className="text-lg font-bold mb-4 border-b rounded-t dark:border-gray-600">
          {mode === 'add' ? 'Add New Share' : 'Edit Share'}
        </h2>
        {formData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block">Ticker:</label>
              <input
                type="text"
                name="ticker"
                value={formData.ticker}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block">Value:</label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block">Units:</label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block">Target Allocation:</label>
              <input
                type="text"
                name="targetAllocation"
                value={formData.targetAllocation}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <div className="mt-4 flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
            Save
          </button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditShareModal;
