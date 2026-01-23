import React from 'react';
import Card from './Card';

const NumberProfileCard = ({ number, info, label }) => {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <span className="text-2xl font-light text-gray-300">{number}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{label} {number}</h2>
          <p className="text-sm text-gray-300">{info.title}</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 mb-3 leading-relaxed font-light">{info.personality}</p>
      <div className="space-y-2 text-sm text-gray-300 font-light">
        <p><span className="font-semibold text-white">Strengths:</span> {info.strengths}</p>
        <p><span className="font-semibold text-white">Challenges:</span> {info.challenges}</p>
        <p><span className="font-semibold text-white">Lucky Colors:</span> {info.colors}</p>
        <p><span className="font-semibold text-white">Best Days:</span> {info.bestDays}</p>
        <p className="text-xs text-gray-400 mt-2">Ruled by {info.ruling}</p>
      </div>
    </Card>
  );
};

export default NumberProfileCard;
