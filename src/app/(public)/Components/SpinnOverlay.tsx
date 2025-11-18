"use client";

interface SpinnerOverlayProps {
  message?: string;
  visible: boolean;
}

export default function SpinnerOverlay({
  message = "Loading...",
  visible,
}: SpinnerOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4">
        <svg
          className="animate-spin h-10 w-10 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
        <p className="text-green-700 font-medium">{message}</p>
      </div>
    </div>
  );
}