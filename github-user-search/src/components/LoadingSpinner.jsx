import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Searching GitHub...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
    </div>
  );
}

export default LoadingSpinner;