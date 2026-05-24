import React, { useState, useEffect } from 'react';
import './App.css';
import words from './data/words.json';
import FlashCard from './components/FlashCard';
import Progress from './components/Progress';
import CategoryFilter from './components/CategoryFilter';
import Navigation from './components/Navigation';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learned, setLearned] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState('all');
  const [view, setView] = useState('learn'); // 'learn', 'favorites', 'progress'
  const [flipped, setFlipped] = useState(false);

  // LocalStorage'dan verileri yükle
  useEffect(() => {
    const savedLearned = localStorage.getItem('learned');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedLearned) setLearned(JSON.parse(savedLearned));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Verileri LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('learned', JSON.stringify(learned));
  }, [learned]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Kategori ve view'a göre kelime listesini filtrele
  const getFilteredWords = () => {
    if (view === 'favorites') {
      return favorites;
    }
    if (category === 'all') {
      return words;
    }
    return words.filter(word => word.category === category);
  };

  const filteredWords = getFilteredWords();
  const currentWord = filteredWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const handleLearned = () => {
    if (currentWord && !learned.includes(currentWord.id)) {
      setLearned([...learned, currentWord.id]);
    }
  };

  const handleToggleFavorite = () => {
    if (!currentWord) return;
    if (favorites.some(fav => fav.id === currentWord.id)) {
      setFavorites(favorites.filter(fav => fav.id !== currentWord.id));
    } else {
      setFavorites([...favorites, currentWord]);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const isFavorited = currentWord && favorites.some(fav => fav.id === currentWord.id);
  const isLearned = currentWord && learned.includes(currentWord.id);

  return (
    <div className="app">
      <Navigation />
      
      {view === 'learn' && (
        <>
          <CategoryFilter 
            category={category} 
            onCategoryChange={handleCategoryChange}
          />
          
          {currentWord ? (
            <>
              <FlashCard
                word={currentWord}
                flipped={flipped}
                onFlip={() => setFlipped(!flipped)}
                onToggleFavorite={handleToggleFavorite}
                isFavorited={isFavorited}
                isLearned={isLearned}
              />
              
              <div className="controls">
                <button 
                  onClick={handlePrevious} 
                  disabled={currentIndex === 0}
                  className="btn btn-secondary"
                >
                  ← Önceki
                </button>
                <button 
                  onClick={handleLearned}
                  className={`btn ${isLearned ? 'btn-success' : 'btn-primary'}`}
                >
                  {isLearned ? '✓ Öğrenildi' : 'Öğrendim'}
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentIndex === filteredWords.length - 1}
                  className="btn btn-secondary"
                >
                  Sonraki →
                </button>
              </div>

              <div className="card-counter">
                {currentIndex + 1} / {filteredWords.length}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>Bu kategoride kelime yok.</p>
            </div>
          )}
        </>
      )}

      {view === 'favorites' && (
        <>
          <div className="section-title">Favori Kelimeler ({favorites.length})</div>
          {favorites.length > 0 ? (
            <>
              <FlashCard
                word={currentWord}
                flipped={flipped}
                onFlip={() => setFlipped(!flipped)}
                onToggleFavorite={handleToggleFavorite}
                isFavorited={true}
                isLearned={isLearned}
              />
              
              <div className="controls">
                <button 
                  onClick={handlePrevious} 
                  disabled={currentIndex === 0}
                  className="btn btn-secondary"
                >
                  ← Önceki
                </button>
                <button 
                  onClick={handleLearned}
                  className={`btn ${isLearned ? 'btn-success' : 'btn-primary'}`}
                >
                  {isLearned ? '✓ Öğrenildi' : 'Öğrendim'}
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentIndex === favorites.length - 1}
                  className="btn btn-secondary"
                >
                  Sonraki →
                </button>
              </div>

              <div className="card-counter">
                {currentIndex + 1} / {favorites.length}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>Henüz favori kelime eklemediniz.</p>
            </div>
          )}
        </>
      )}

      {view === 'progress' && (
        <Progress 
          learned={learned}
          favorites={favorites}
          totalWords={words.length}
          categories={['Fiil', 'İsim', 'Sıfat']}
        />
      )}

      <div className="nav-buttons">
        <button 
          onClick={() => handleViewChange('learn')}
          className={`nav-btn ${view === 'learn' ? 'active' : ''}`}
        >
          📚 Öğren
        </button>
        <button 
          onClick={() => handleViewChange('favorites')}
          className={`nav-btn ${view === 'favorites' ? 'active' : ''}`}
        >
          ⭐ Favoriler ({favorites.length})
        </button>
        <button 
          onClick={() => handleViewChange('progress')}
          className={`nav-btn ${view === 'progress' ? 'active' : ''}`}
        >
          📊 İlerleme
        </button>
      </div>
    </div>
  );
}

export default App;
