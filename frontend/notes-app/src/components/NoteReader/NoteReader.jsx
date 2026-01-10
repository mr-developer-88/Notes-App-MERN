import React from 'react';

const NoteReader = ({ note, onClose }) => {
  if (!note) return null;

  const safeTags = Array.isArray(note.tags) ? note.tags : [];

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 dark:bg-black/70 backdrop-blur-sm">
      <div className="relative w-[95%] sm:w-[90%] md:w-[85%] lg:w-[70%] max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-[0_24px_80px_rgba(15,23,42,0.9)] overflow-hidden flex flex-col border border-gray-100/70 dark:border-gray-700/80">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur">
          <div className="min-w-0">
            <h2 className="text-[15px] sm:text-[18px] font-semibold text-gray-900 dark:text-white truncate">
              {note.title}
            </h2>
            <p className="mt-0.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
              Reading mode · Focused view
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200/80 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close reader"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 lg:px-10 py-5 sm:py-7 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-700">
          <article className="mx-auto max-w-3xl lg:max-w-4xl">
            <p className="whitespace-pre-wrap text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed sm:leading-[1.8] tracking-[0.01em] text-gray-800 dark:text-gray-100">
              {note.content}
            </p>
          </article>
        </div>

        {/* Footer: tags at the bottom, subtle and consistent */}
        {safeTags.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 px-5 sm:px-8 lg:px-10 py-3">
            <div className="mx-auto max-w-3xl lg:max-w-4xl flex flex-wrap items-center gap-2">
              {safeTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-gray-100/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 border border-gray-200/70 dark:border-gray-700/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteReader;