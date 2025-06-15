import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteForm from './Pages/NoteForm.jsx';
import Home from './Pages/Home.jsx';
import ArchiveList from './Pages/ArchiveList.jsx';
import TrashList from './Pages/TrashList.jsx';
import Navbar from './Pages/Navbar.jsx';
import Layout from './Pages/SearchBar.jsx';
import './index.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const editNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setNoteToEdit(null);
  };

  const togglePin = (noteId) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, isPinned: !note.isPinned } : note)));
  };

  const archiveNote = (noteId) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, isArchived: !note.isArchived, isTrashed: false } : note)));
  };

  const trashNote = (noteId) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, isTrashed: !note.isTrashed, isArchived: false } : note)));
  };

  const restoreNote = (noteId) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, isTrashed: false } : note)));
  };

  const permanentlyDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleCreateNew = () => {
    setNoteToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-300">
      <Navbar onCreateNew={handleCreateNew} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout showSearch={true}>
              <Home
                notes={notes}
                togglePin={togglePin}
                archiveNote={archiveNote}
                trashNote={trashNote}
                setNoteToEdit={setNoteToEdit}
                filterTag={''}
              />
            </Layout>
          }
        />
        <Route
          path="/archive"
          element={
            <Layout showSearch={true}>
              <ArchiveList
                notes={notes}
                archiveNote={archiveNote}
                trashNote={trashNote}
                setNoteToEdit={setNoteToEdit}
              />
            </Layout>
          }
        />
        <Route
          path="/trash"
          element={
            <Layout showSearch={true}>
              <TrashList
                notes={notes}
                restoreNote={restoreNote}
                deleteNote={permanentlyDeleteNote}
              />
            </Layout>
          }
        />
        <Route
          path="/create"
          element={
            <Layout showSearch={false}>
              <NoteForm addNote={addNote} editNote={editNote} noteToEdit={noteToEdit} />
            </Layout>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Layout showSearch={false}>
              <NoteForm addNote={addNote} editNote={editNote} noteToEdit={noteToEdit} />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}