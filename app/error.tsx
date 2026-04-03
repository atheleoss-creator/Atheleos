"use client";

import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [hasAutoReloaded, setHasAutoReloaded] = useState(false);

  useEffect(() => {
    const isChunkError =
      error.message?.includes("ChunkLoadError") ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch dynamically imported module") ||
      error.message?.includes("Importing a module script failed") ||
      error.name === "ChunkLoadError";

    if (isChunkError) {
      // Use sessionStorage to prevent infinite reload loops
      const reloadKey = "chunk_error_reload";
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();

      // Only auto-reload if we haven't reloaded in the last 10 seconds
      if (!lastReload || now - parseInt(lastReload) > 10000) {
        sessionStorage.setItem(reloadKey, now.toString());
        window.location.reload();
        return;
      }
      setHasAutoReloaded(true);
    }

    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          {hasAutoReloaded ? "Still having trouble" : "Something went wrong"}
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          {hasAutoReloaded
            ? "The app was recently updated. Please try refreshing the page."
            : "An unexpected error occurred. Try again or refresh the page."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-white/[0.06] border border-white/[0.1] text-text-secondary font-medium rounded-xl hover:bg-white/[0.1] transition-colors"
          >
            Refresh page
          </button>
        </div>
      </div>
    </div>
  );
}
