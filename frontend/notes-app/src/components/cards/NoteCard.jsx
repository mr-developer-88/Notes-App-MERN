import React from 'react';
import moment from 'moment';
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  id,
  title,
  date,
  content,
  tags = [],
  isPinned,
  seen = false,
  isPinning = false,
  isDeleting = false,
  onEdit,
  onDelete,
  onPinNote,
  onOpen, // optional: for full reader UX
}) => {
  const safeTags = Array.isArray(tags) ? tags : [];

  const handleOpen = () => {
    if (isDeleting) return; // avoid opening while deleting
    onOpen && onOpen();
  };

  return (
    <div
      data-note-id={id}
      className={`group relative flex flex-col bg-white/95 dark:bg-slate-900/90 border border-gray-100/80 dark:border-slate-700/80 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:shadow-[0_18px_45px_rgba(15,23,42,0.75)] hover:shadow-[0_20px_55px_rgba(15,23,42,0.14)] dark:hover:shadow-[0_26px_70px_rgba(15,23,42,0.9)] hover:-translate-y-1.5 transition-transform duration-300 ease-out min-h-[240px] sm:min-h-[260px] overflow-hidden ${
        seen ? "opacity-80 hover:opacity-100" : ""
      }`}
    >
      {/* Clickable content area for opening full reader */}
      <button
        type="button"
        onClick={handleOpen}
        className="text-left flex-1 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] sm:text-[17px] lg:text-[18px] font-semibold text-gray-900 dark:text-white leading-snug sm:leading-snug line-clamp-2 flex items-center gap-2">
              <span className="truncate">{title}</span>
              {!seen && (
                <span
                  className="inline-flex h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"
                  aria-label="Unseen note indicator"
                />
              )}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <time className="block text-[11px] sm:text-[12px] text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                {moment(date).format('MMM DD, YYYY')}
              </time>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-tight ${
                  seen
                    ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                }`}
              >
                {seen ? "Seen" : "New"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isPinning && onPinNote) onPinNote();
            }}
            disabled={isPinning}
            className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-wait ${
              isPinned
                ? 'text-primary bg-primary/10 dark:bg-primary/20 shadow-sm'
                : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            } ${isPinning ? 'opacity-70' : ''}`}
            aria-label={isPinned ? 'Unpin note' : 'Pin note'}
          >
            {isPinning ? (
              <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdOutlinePushPin className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Content preview */}
        <div className="mt-1 flex-1">
          <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-relaxed line-clamp-4">
            {content}
          </p>
        </div>
      </button>

      {/* Footer: Tags + Actions */}
      <div className="mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-col gap-3">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 max-h-16 overflow-hidden">
          {safeTags.slice(0, 5).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-200/70 dark:border-gray-700/70"
            >
              #{tag}
            </span>
          ))}
          {safeTags.length > 5 && (
            <span className="inline-flex items-center px-2 py-1 text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
              +{safeTags.length - 5}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit();
            }}
            className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Edit note"
            disabled={isDeleting}
          >
            <MdCreate className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isDeleting && onDelete) onDelete();
            }}
            className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-60 disabled:cursor-wait"
            aria-label="Delete note"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdDelete className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoteCard);
