'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          {error.message || 'Something went wrong!'}
        </h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
