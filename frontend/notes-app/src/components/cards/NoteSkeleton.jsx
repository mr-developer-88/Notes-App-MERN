import React from 'react';

const NoteSkeleton = () => {
  return (
    <div className="group relative flex flex-col bg-white/80 dark:bg-gray-900/80 border border-gray-100/80 dark:border-gray-800/80 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 shadow-sm animate-pulse min-h-[220px]">
      {/* Header skeleton */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
        </div>
        <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Content lines */}
      <div className="space-y-2 mt-1">
        <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-11/12" />
        <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-10/12" />
        <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-6/12" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-14 bg-gray-100 dark:bg-gray-800 rounded-full" />
          <div className="h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
          <div className="h-6 w-10 bg-gray-100 dark:bg-gray-800 rounded-full" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-lg" />
          <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoteSkeleton);
