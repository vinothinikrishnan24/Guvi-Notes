import React, { useState } from 'react';

function Layout({ children, showSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const allTags = [...new Set(children.props.notes?.flatMap((note) => note.tags) || [])];
  const filteredNotes = children.props.notes?.filter(
    (note) =>
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       note.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!filterTag || note.tags.includes(filterTag))
  ) || [];

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearTag = () => {
    setFilterTag('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 px-4 sm:px-6 overflow-x-hidden">
      {showSearch && (
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-form w-full p-3 pr-10 text-sm sm:text-base border-2 border-primary rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-shadow duration-200 bg-light text-dark placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 font-button text-light bg-primary hover:bg-primary-hover rounded-full w-6 h-6 flex items-center justify-center"
                title="Clear search"
              >
                <img src="/Image/close.png" alt="Clear Search Icon" className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative w-full sm:w-40 md:w-48">
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="font-form w-full p-3 text-sm sm:text-base border-2 border-primary rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-shadow duration-200 bg-light text-dark"
            >
              <option value="">All Tags</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {React.cloneElement(children, { notes: filteredNotes, filterTag })}
    </div>
  );
}

export default Layout;