import React from 'react';
import './Progress.css';

function Progress({ learned, favorites, totalWords }) {
  const learnedCount = learned.length;
  const learnedPercentage = Math.round((learnedCount / totalWords) * 100);
  const remainingCount = totalWords - learnedCount;

  return (
    <div className="progress-container">
      <div className="progress-card">
        <h2>📚 İlerleme Özeti</h2>
        
        <div className="progress-stats">
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#27ae60' }}>{learnedCount}</div>
            <div className="stat-label">Öğrenildi</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#e74c3c' }}>{remainingCount}</div>
            <div className="stat-label">Kalan</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#3498db' }}>{totalWords}</div>
            <div className="stat-label">Toplam</div>
          </div>

          <div className="stat-item">
            <div className="stat-number" style={{ color: '#f39c12' }}>⭐ {favorites.length}</div>
            <div className="stat-label">Favori</div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${learnedPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {learnedPercentage}% Tamamlandı
          </div>
        </div>

        <div className="motivational-message">
          {learnedPercentage === 100 && (
            <p>🎉 Harika! Tüm kelimeleri öğrendiniz!</p>
          )}
          {learnedPercentage >= 75 && learnedPercentage < 100 && (
            <p>🌟 Süper! Çok yaklaştınız, devam edin!</p>
          )}
          {learnedPercentage >= 50 && learnedPercentage < 75 && (
            <p>💪 Güzel ilerleme yapıyorsunuz!</p>
          )}
          {learnedPercentage >= 25 && learnedPercentage < 50 && (
            <p>👏 İyi başladınız, devam edin!</p>
          )}
          {learnedPercentage < 25 && learnedPercentage > 0 && (
            <p>🚀 Başarılı bir başlangıç yaptınız!</p>
          )}
          {learnedPercentage === 0 && (
            <p>📖 Öğrenmeye başlamak için ilk kartı tıklayın!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;
