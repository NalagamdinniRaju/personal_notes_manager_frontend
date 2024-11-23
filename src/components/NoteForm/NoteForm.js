import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFolder, FaEdit } from 'react-icons/fa';
import { useNoteContext } from '../../context/NoteContext';
import './NoteForm.css';

const NoteForm = () => {
  const { 
    addNote, 
    updateNote, 
    editingNote, 
    setEditingNote, 
    isModalOpen, 
    setIsModalOpen,
    categories 
  } = useNoteContext();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Others'
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        description: editingNote.description,
        category: editingNote.category
      });
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNote) {
      updateNote(editingNote._id, formData);
    } else {
      addNote(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setFormData({
      title: '',
      description: '',
      category: 'Others'
    });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="modal-header">
              <h2>{editingNote ? 'Edit Note' : 'Add New Note'}</h2>
              <button className="close-button" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <FaEdit className="form-icon" />
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FaEdit className="form-icon" />
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FaFolder className="form-icon" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingNote ? 'Update Note' : 'Add Note'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteForm;