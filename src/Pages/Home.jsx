import React from 'react';
import NoteCard from './NoteCard';

function NotesList({ notes, togglePin, archiveNote, trashNote, setNoteToEdit, filterTag }) {
  const pinnedNotes = notes.filter((note) => note.isPinned && !note.isTrashed && !note.isArchived);
  const otherNotes = notes.filter((note) => !note.isPinned && !note.isTrashed && !note.isArchived);

  return (
    <div className="p-4 bg-light min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto box-border">
        {pinnedNotes.length > 0 && (
          <>
            <h2 className="font-heading mb-4 text-dark">Pinned Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  togglePin={togglePin}
                  archiveNote={archiveNote}
                  trashNote={trashNote}
                  setNoteToEdit={setNoteToEdit}
                />
              ))}
            </div>
          </>
        )}
        {otherNotes.length > 0 && (
          <>
            <h2 className="font-heading mb-4 mt-8 text-dark">Other Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {otherNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  togglePin={togglePin}
                  archiveNote={archiveNote}
                  trashNote={trashNote}
                  setNoteToEdit={setNoteToEdit}
                />
              ))}
            </div>
          </>
        )}
        {pinnedNotes.length === 0 && otherNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12">
            <img src="/Image/other notes.png" alt="No Notes Icon" className="w-20 h-20 sm:w-24 sm:h-24" />
            <p className="font-body text-dark mt-4">No notes available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesList;