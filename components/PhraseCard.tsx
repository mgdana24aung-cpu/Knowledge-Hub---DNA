
import React, { useState } from 'react';
import { Phrase } from '../types';
import { speakPhrase } from '../services/geminiService';

interface PhraseCardProps {
  phrase: Phrase;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ phrase }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    await speakPhrase(phrase.english);
    setIsSpeaking(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Emotions': return 'bg-rose-100 text-rose-700';
      case 'Warning': return 'bg-amber-100 text-amber-700';
      case 'Independence': return 'bg-emerald-100 text-emerald-700';
      case 'Gratitude': return 'bg-blue-100 text-blue-700';
      case 'Manners': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div 
      onClick={() => setIsRevealed(!isRevealed)}
      className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-3">
         <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${getCategoryColor(phrase.category)}`}>
           {phrase.category}
         </span>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="text-slate-400 font-mono text-sm">#{phrase.id}</span>
          <button 
            onClick={handleSpeak}
            disabled={isSpeaking}
            className={`p-3 rounded-full bg-slate-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200 ${isSpeaking ? 'animate-pulse bg-indigo-100' : ''}`}
          >
            {isSpeaking ? (
              <i className="fas fa-waveform"></i>
            ) : (
              <i className="fas fa-volume-up"></i>
            )}
          </button>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-indigo-700 transition-colors">
          {phrase.english}
        </h3>

        <div className={`mt-auto transition-all duration-500 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-20 blur-sm select-none'}`}>
          <div className="h-px w-12 bg-indigo-200 mb-4"></div>
          <p className="text-lg text-slate-600 font-padauk leading-relaxed">
            {phrase.myanmar}
          </p>
        </div>

        {!isRevealed && (
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest animate-pulse">
              Click to reveal meaning
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhraseCard;
