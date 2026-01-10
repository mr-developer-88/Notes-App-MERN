import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
        {/* subtle glow behind illustration for both themes */}
        <div className="pointer-events-none absolute -inset-4 rounded-full bg-primary/5 blur-2xl dark:bg-blue-500/15" />
        <div className="pointer-events-none absolute -inset-10 rounded-full bg-blue-500/0 dark:bg-blue-500/12 blur-3xl" />

        <img
          src={imgSrc}
          alt="Empty state"
          className="relative w-full h-full object-contain filter dark:invert dark:hue-rotate-180 dark:saturate-150"
        />
      </div>

      <p className="max-w-md text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed">
        {message}
      </p>
    </div>
  )
}

export default EmptyCard