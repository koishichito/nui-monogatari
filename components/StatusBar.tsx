
import React from 'react';
import { Companion } from '../types';

interface StatusBarProps {
  points: number;
  companion: Companion;
}

const StatusBar: React.FC<StatusBarProps> = ({ points, companion }) => {
  return (
    <div className="absolute top-4 right-4 bg-white bg-opacity-80 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-700 font-semibold">
      <div className="flex items-center space-x-4">
        <div>
            <span className="text-lg">ポイント: {points}P</span>
        </div>
        {companion === 'aria' && (
          <div className="flex items-center space-x-2 border-l pl-4">
            <span role="img" aria-label="companion">👥</span>
            <span>同行者: ありあ</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
