import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import NoteCard from '../NoteCard/NoteCard';
import { useNoteContext } from '../../context/NoteContext';
import './NoteList.css';

const NoteList = () => {
  const { notes } = useNoteContext();

  if (notes.length === 0) {
    return (
      <motion.div
        className="no-notes-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaSearch className="no-notes-icon" />
        <h3 className="no-notes-title">No Notes Found</h3>
        <p className="no-notes-description">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <div className="note-list">
      <AnimatePresence>
        {notes.map(note => (
          <NoteCard key={note._id} note={note} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NoteList;