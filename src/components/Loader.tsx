// "use client"; // Add this at the top
import React from 'react'

export const Loader = () => {
  return (
    <div
    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
    role="status"
    aria-label="loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
  )
};
