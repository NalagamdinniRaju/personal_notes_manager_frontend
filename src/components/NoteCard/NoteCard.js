import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaClock, FaFolder } from 'react-icons/fa';
import { format } from 'date-fns';
import { useNoteContext } from '../../context/NoteContext';
import './NoteCard.css';

const NoteCard = ({ note }) => {
  const { deleteNote, setEditingNote, setIsModalOpen } = useNoteContext();

  const handleEdit = () => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      className="note-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            className="edit-btn"
          >
            <FaEdit />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => deleteNote(note._id)}
            className="delete-btn"
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>

      <p className="note-description">{note.description}</p>

      <div className="note-footer">
        <div className="note-category">
          <FaFolder className="category-icon" />
          {note.category}
        </div>
        <div className="note-date">
          <FaClock className="date-icon" />
          <span>{format(new Date(note.created_at), 'MMM dd, yyyy')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;