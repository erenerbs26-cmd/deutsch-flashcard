import React from 'react';
import './FlashCard.css';

function FlashCard({ word, flipped, onFlip, onToggleFavorite, isFavorited, isLearned }) {
  if (!word) return null;

  const getCategoryLabel = (category) => {
    const labels = {
      'Verb': '🔴 FİİL',
      'Noun': '🔵 İSİM',
      'Adjective': '🟢 SIFAT'
    };
    return labels[category] || category;
  };

  return (
    <div className="flashcard-container">
      <div className="category-badge">{getCategoryLabel(word.category)}</div>
      
      <div 
        className={`flashcard ${flipped ? 'flipped' : ''} ${isLearned ? 'learned' : ''}`}
        onClick={onFlip}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="word-german">{word.german}</div>
            <div className="pronunciation">[{word.pronunciation}]</div>
            <div className="click-hint">Tıkla</div>
          </div>
          <div className="flashcard-back">
            <div className="word-turkish">{word.turkish}</div>
            <div className="example">
              <strong>Örnek:</strong> {word.example}
            </div>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button 
          className={`favorite-btn ${isFavorited ? 'active' : ''}`}
          onClick={onToggleFavorite}
          title={isFavorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        >
          {isFavorited ? '⭐' : '☆'}
        </button>
        {isLearned && <div className="learned-badge">✓ Öğrenildi</div>}
      </div>
    </div>
  );
}

export default FlashCard;
