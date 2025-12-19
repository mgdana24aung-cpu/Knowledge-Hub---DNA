
import React, { useState, useMemo } from 'react';
import { PHRASES } from './constants';
import PhraseCard from './components/PhraseCard';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(PHRASES.map(p => p.category)));
  }, []);

  const filteredPhrases = useMemo(() => {
    return PHRASES.filter(phrase => {
      const matchesSearch = phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           phrase.myanmar.includes(searchTerm);
      const matchesCategory = selectedCategory ? phrase.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-200">
                <i className="fas fa-language"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-none mb-1">Burmese English Master</h1>
                <p className="text-slate-500 text-sm font-medium">Daily phrases with AI Pronunciation</p>
              </div>
            </div>

            <div className="relative flex-1 max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-search"></i>
              </span>
              <input 
                type="text"
                placeholder="Search phrases in English or Myanmar..."
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${!selectedCategory ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Topics
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-10">
        {/* Intro Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-black text-slate-800 mb-3">
            Ready to <span className="text-indigo-600">Speak?</span>
          </h2>
          <p className="text-slate-500 max-w-2xl text-lg">
            Master these 12 practical phrases. Tap the cards to reveal the Myanmar translation, and use the speaker icon to hear high-quality AI pronunciation.
          </p>
        </div>

        {/* Grid of Phrases */}
        {filteredPhrases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhrases.map(phrase => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <i className="fas fa-search text-6xl mb-4 opacity-20"></i>
            <p className="text-xl font-medium">No phrases match your search.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Interactive Footer / Progress */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-600">
              Your Learning Goal: <span className="text-indigo-600">12 Essential Phrases</span>
            </p>
          </div>
          <div className="flex-1 md:flex-none flex items-center gap-4">
             <div className="flex-1 md:w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-1000" 
                  style={{ width: `${(filteredPhrases.length / PHRASES.length) * 100}%` }}
                ></div>
             </div>
             <span className="text-xs font-bold text-slate-500 uppercase">{filteredPhrases.length} Found</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
