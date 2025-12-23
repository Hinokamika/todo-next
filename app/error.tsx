"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Error loading todos:", error);
    }, [error]);

    return (
        <div className="min-h-screen px-20 py-5 bg-green-950 flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-400 mb-8 text-lg">{error.message || "Failed to load your todos"}</p>
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-lime-600 text-white font-bold rounded-lg hover:bg-lime-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
