import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-[3px]',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-primary/80 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default React.memo(Loader);
