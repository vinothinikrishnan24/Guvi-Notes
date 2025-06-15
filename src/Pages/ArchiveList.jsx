import React from 'react';
import NoteCard from './NoteCard';

function ArchiveList({ notes, archiveNote, trashNote, setNoteToEdit }) {
  const archivedNotes = notes.filter((note) => note.isArchived && !note.isTrashed);

  return (
    <div className="p-4 bg-light min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto box-border">
        <h2 className="font-heading mb-6 text-dark">Archived Notes</h2>
        {archivedNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {archivedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                archiveNote={archiveNote}
                trashNote={trashNote}
                setNoteToEdit={setNoteToEdit}
                isArchive={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-12">
            <img src="/Image/archive.png" alt="No Archived Notes" className="w-20 h-20 sm:w-24 sm:h-24" />
            <p className="font-body text-dark mt-4">No archived notes</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchiveList;