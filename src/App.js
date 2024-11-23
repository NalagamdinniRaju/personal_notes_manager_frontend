import React from 'react';
import { ToastContainer } from 'react-toastify';
import SearchBar from './components/SearchBar/SearchBar';
import NoteList from './components/NoteList/NoteList';
import NoteForm from './components/NoteForm/NoteForm';
import { NoteProvider } from './context/NoteContext';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <NoteProvider>
      <div className="app">
        <header className="app-header">
          <h1>Personal Notes Manager</h1>
        </header>
        <main className="app-main">
          <SearchBar />
          <NoteList />
          <NoteForm />
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </NoteProvider>
  );
}

export default App;