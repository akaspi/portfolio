// /app/components/Portfolio.tsx
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import EditShareModal, { EditShareModalData } from './EditShareModal';
import { PortfolioData } from './types'; // Import PortfolioData

const Portfolio: React.FC = () => {
  const [selectedData, setSelectedData] = useState<PortfolioData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('edit');

  const fetchPortfolioData = async (): Promise<PortfolioData[]> => {
    const response = await fetch('/api/portfolio');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery<PortfolioData[], Error>({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  const openEditModal = (data: PortfolioData) => {
    setSelectedData(data);
    setModalMode('edit');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedData(null);
  };

  const handleSubmitModal = (data: EditShareModalData) => {
    console.log('Editing share:', data);
    closeModal();
  }

  return (
    <>
      <EditShareModal isOpen={isModalOpen} onClose={closeModal} handleSubmit={handleSubmitModal} data={selectedData} mode={modalMode} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Ticker</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Value</th>
              <th className="px-6 py-3">Units</th>
              <th className="px-6 py-3">Current Allocation</th>
              <th className="px-6 py-3">Target Allocation</th>
              <th className="px-6 py-3">Diff (USD)</th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{row.ticker}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.value}</td>
                <td className="px-6 py-4">{row.units}</td>
                <td className="px-6 py-4">{row.currentAllocation}</td>
                <td className="px-6 py-4">{row.targetAllocation}</td>
                <td className={`px-6 py-4 ${row.diff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {row.diff}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => openEditModal(row)} className="text-blue-500">
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button className="text-red-500">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Portfolio;
