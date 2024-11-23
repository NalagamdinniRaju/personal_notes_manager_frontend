import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFolder, FaPlus } from 'react-icons/fa';
import { useNoteContext } from '../../context/NoteContext';
import './SearchBar.css';

const SearchBar = () => {
  const { filters, setFilters, setIsModalOpen, categories } = useNoteContext();

  return (
    <motion.div
      className="search-container"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="search-group">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search notes..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-item">
          <FaFolder className="filter-icon" />
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <button 
          className="add-note-button"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add Note
        </button>
      </div>
    </motion.div>
  );
};

export default SearchBar;