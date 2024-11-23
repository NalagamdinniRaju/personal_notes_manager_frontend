import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  

  // Predefined categories
  const categories = [
    'Work', 'Personal', 'Study', 'Shopping', 'Health', 
    'Finance', 'Travel', 'Ideas', 'Goals', 'Recipes',
    'Books', 'Movies', 'Music', 'Projects', 'Meetings',
    'Events', 'Family', 'Hobbies', 'Technology', 'Others'
  ];

  useEffect(() => {
    fetchNotes();
  }, [filters]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`https://personal-notes-manager-backend-zjh7.onrender.com/api/notes`, {
        params: filters
      });
      setNotes(response.data);
    } catch (error) {
      toast.error('Error fetching notes');
    }
  };

  const addNote = async (newNote) => {
    try {
      await axios.post('https://personal-notes-manager-backend-zjh7.onrender.com/api/notes', newNote);
      fetchNotes();
      toast.success('Note added successfully');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error adding note');
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      await axios.put(`https://personal-notes-manager-backend-zjh7.onrender.com/api/notes/${id}`, updatedNote);
      fetchNotes();
      toast.success('Note updated successfully');
      setIsModalOpen(false);
      setEditingNote(null);
    } catch (error) {
      toast.error('Error updating note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://personal-notes-manager-backend-zjh7.onrender.com/api/notes/${id}`);
      fetchNotes();
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error('Error deleting note');
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        filters,
        setFilters,
        addNote,
        updateNote,
        deleteNote,
        isModalOpen,
        setIsModalOpen,
        editingNote,
        setEditingNote,
        categories
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => useContext(NoteContext);