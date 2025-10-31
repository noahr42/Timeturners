import React from 'react';
import { TimeEntry } from '../types.ts';
import { formatTime } from '../utils/formatTime.ts';
import DeleteIcon from './icons/DeleteIcon.tsx';

interface TimeLogProps {
  entries: TimeEntry[];
  onDelete: (id: number) => void;
}

const TimeLog: React.FC<TimeLogProps> = ({ entries, onDelete }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 h-full border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Work Sessions</h2>
      <div className="overflow-y-auto max-h-[65vh] pr-2">
        {entries.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">No work sessions recorded yet.</p>
            <p className="text-gray-500 text-sm mt-2">Click "Start" to begin tracking your time.</p>
          </div>
        ) : (
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 bg-gray-800/80 backdrop-blur-sm">
              <tr>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Start Time</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">End Time</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Duration</th>
                <th className="p-3 text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="p-3 whitespace-nowrap">{formatDate(entry.startTime)}</td>
                  <td className="p-3 whitespace-nowrap">{formatDate(entry.endTime)}</td>
                  <td className="p-3 font-mono text-right whitespace-nowrap">{formatTime(entry.duration)}</td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => onDelete(entry.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      aria-label="Delete entry"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TimeLog;