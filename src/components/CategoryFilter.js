import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ category, onCategoryChange }) {
  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'Verb', label: '🔴 Fiil' },
    { id: 'Noun', label: '🔵 İsim' },
    { id: 'Adjective', label: '🟢 Sıfat' }
  ];

  return (
    <div className="category-filter">
      <div className="filter-label">Kategori Seç:</div>
      <div className="filter-buttons">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${category === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
