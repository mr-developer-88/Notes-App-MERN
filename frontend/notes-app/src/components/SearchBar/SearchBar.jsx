import React from 'react'
import { FaMagnifyingGlass} from "react-icons/fa6"
import { IoMdClose} from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, isSearching = false }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaMagnifyingGlass className="w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-primary transition-colors" />
        </div>
        
        <input 
            type="text"
            placeholder="Search notes..."
            className="w-full text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary dark:focus:border-primary transition-all duration-200 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-[0_0_0_1px_rgba(148,163,184,0.3)] focus:shadow-[0_10px_25px_rgba(15,23,42,0.12)] disabled:opacity-60 disabled:cursor-not-allowed"
            value={value}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            disabled={isSearching}
        />

        {value && !isSearching && (
          <button
            onClick={onClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:opacity-80 active:scale-95 transition-all"
            aria-label="Clear search"
          >
            <IoMdClose className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        )}
      </div>

      {/* Explicit search button for all screen sizes (tap-friendly on mobile) */}
      <button
        type="button"
        onClick={handleSearch}
        disabled={isSearching}
        className="inline-flex items-center justify-center h-10 sm:h-11 min-w-[44px] px-3 md:px-4 rounded-lg bg-primary text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-blue-600 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary/60 gap-1 md:gap-2 disabled:opacity-70 disabled:cursor-wait"
        aria-label="Search notes"
      >
        {isSearching ? (
          <span className="inline-block w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <FaMagnifyingGlass className="w-4 h-4" />
            <span className="hidden md:inline">Search</span>
          </>
        )}
      </button>
    </div>
  )
}

export default React.memo(SearchBar)
