import React from 'react';
import { GameState } from '../types';

interface GameScreenProps {
  storyLog: string[];
  imageSrc?: string;
  children?: React.ReactNode;
  gameState?: GameState;
}

const GameScreen: React.FC<GameScreenProps> = ({ storyLog, imageSrc, children, gameState }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [storyLog]);

  return (
    <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] max-h-[700px]">
      <div className="w-full md:w-1/2 h-48 md:h-full overflow-hidden">
        <img src={imageSrc || 'https://picsum.photos/seed/restaurant/800/600'} alt="Game scene" className={`w-full h-full object-cover transition-all duration-500 ${gameState === 'statue_tour' ? 'animate-statue-glow' : ''}`} />
      </div>
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        <div ref={scrollRef} className="story-log flex-grow overflow-y-auto mb-4 pr-2 text-gray-800" style={{ scrollbarWidth: 'thin' }}>
          {storyLog.map((text, index) => (
            <p key={index} className="mb-4 text-lg leading-relaxed font-serif animate-fade-in">{text}</p>
          ))}
        </div>
        <div className="choices-container space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
