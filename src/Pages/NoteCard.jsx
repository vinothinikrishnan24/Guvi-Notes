import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function NoteCard({ note, togglePin, archiveNote, trashNote, setNoteToEdit, restoreNote, deleteNote, isTrash, isArchive }) {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipeStyle, setSwipeStyle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setSwipeStyle({ transition: 'none' });
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    const distance = e.targetTouches[0].clientX - touchStart;
    setSwipeStyle({ transform: `translateX(${distance}px)` });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;

    if (isLeftSwipe && !isTrash && !isArchive) {
      trashNote(note.id);
      setSwipeStyle({
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease-out',
      });
    } else if (isRightSwipe && !isTrash && !isArchive) {
      archiveNote(note.id);
      setSwipeStyle({
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
      });
    } else {
      setSwipeStyle({
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease-out',
      });
    }
  };

  const handleEdit = () => {
    setNoteToEdit(note);
    navigate(`/edit/${note.id}`);
  };

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      ref={cardRef}
      className={`bg-light p-4 rounded-xl shadow-md ${isTrash ? 'bg-gray-300' : ''} ${isArchive ? 'border-2 border-primary' : ''} min-w-0 w-full`}
      style={{ ...swipeStyle, boxSizing: 'border-box' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <h3 className={`font-note-title ${isTrash ? 'line-through text-red-600' : 'text-dark'}`}>
        {note.title}
      </h3>
      <p className="font-body text-dark truncate">{note.description}</p>
      <p className="font-body text-dark mt-1 text-sm">Created: {formattedDate}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="font-tag bg-primary text-light px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
          title="View Details"
        >
          <img src="/Image/view.png" alt="View Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          View
        </button>
        {!isTrash && !isArchive ? (
          <>
            <button
              onClick={() => togglePin(note.id)}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title={note.isPinned ? 'Unpin' : 'Pin'}
            >
              <img src="/Image/pin.png" alt={note.isPinned ? 'Unpin Icon' : 'Pin Icon'} className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {note.isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button
              onClick={handleEdit}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Edit"
            >
              <img src="/Image/editing.png" alt="Edit Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Edit
            </button>
            <button
              onClick={() => archiveNote(note.id)}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Archive"
            >
              <img src="/Image/archive.png" alt="Archive Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Archive
            </button>
            <button
              onClick={() => trashNote(note.id)}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Trash"
            >
              <img src="/Image/tash.png" alt="Trash Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Trash
            </button>
          </>
        ) : isTrash ? (
          <>
            <button
              onClick={() => restoreNote(note.id)}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Restore"
            >
              <img src="/Image/restore.png" alt="Restore Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Restore
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Delete"
            >
              <img src="/Image/delete.png" alt="Delete Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => archiveNote(note.id)}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Unarchive"
            >
              <img src="/Image/archive.png" alt="Unarchive Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Unarchive
            </button>
            <button
              onClick={() => trashNote(note.id)}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Trash"
            >
              <img src="/Image/tash.png" alt="Trash Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Trash
            </button>
            <button
              onClick={handleEdit}
              className="font-button flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-primary text-light hover:bg-primary-hover transition-all duration-300"
              title="Edit"
            >
              <img src="/Image/editing.png" alt="Edit Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Edit
            </button>
          </>
        )}
      </div>

      {/* Modal for Viewing Note Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-light p-4 sm:p-6 rounded-xl w-[90vw] max-w-md shadow-xl">
            <h2 className="font-note-title text-dark text-lg sm:text-xl mb-2">{note.title}</h2>
            <p className="font-body text-dark mb-4 text-sm sm:text-base">{note.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag, index) => (
                <span key={index} className="font-tag bg-primary text-light px-2 py-1 rounded text-xs sm:text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="font-body text-dark text-xs sm:text-sm mb-4">Created: {formattedDate}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-button px-4 py-2 rounded-xl bg-secondary text-light hover:bg-secondary-hover transition-all duration-300 text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteCard;