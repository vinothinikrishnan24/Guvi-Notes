import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NoteForm({ addNote, editNote, noteToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const maxDescriptionLength = 500;

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
      setTags(noteToEdit.tags.join(', '));
    } else {
      setTitle('');
      setDescription('');
      setTags('');
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const note = {
      id: noteToEdit ? noteToEdit.id : crypto.randomUUID(),
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
      isPinned: noteToEdit ? noteToEdit.isPinned : false,
      isArchived: noteToEdit ? noteToEdit.isArchived : false,
      isTrashed: noteToEdit ? noteToEdit.isTrashed : false,
      createdAt: noteToEdit ? noteToEdit.createdAt : new Date().toISOString(),
    };

    if (noteToEdit) {
      editNote(note);
    } else {
      addNote(note);
    }

    setTitle('');
    setDescription('');
    setTags('');
    navigate('/');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="w-[90vw] max-w-md mx-auto mt-8 p-4 sm:p-6 rounded-lg bg-light border-2 border-primary shadow-xl">
      <h2 className="font-heading mb-4 text-dark text-lg sm:text-xl"> {noteToEdit ? 'Edit Note' : 'Create Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-dark font-form mb-2 text-sm sm:text-base">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-form w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 bg-light text-dark text-sm sm:text-base"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-dark font-form mb-2 text-sm sm:text-base">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, maxDescriptionLength))}
            className="font-form w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 bg-light text-dark text-sm sm:text-base"
            placeholder="Enter description"
            rows="4"
          ></textarea>
          <p className="font-body text-dark mt-1 text-xs sm:text-sm">
            {description.length}/{maxDescriptionLength}
          </p>
        </div>
        <div className="mb-6">
          <label htmlFor="tags" className="block text-dark font-form mb-2 text-sm sm:text-base">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="font-form w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 bg-light text-dark text-sm sm:text-base"
            placeholder="Enter tags"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="font-button px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300 text-sm sm:text-base"
          >
            {noteToEdit ? 'Update Note' : 'Add Note'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="font-button px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-secondary text-light hover:bg-secondary-hover transition-all duration-300 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;