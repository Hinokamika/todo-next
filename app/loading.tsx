export default function Loading() {
    return (
        <div className="min-h-screen px-20 py-5 bg-green-950 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-600"></div>
                <p className="text-gray-400 text-lg">Loading your todos...</p>
            </div>
        </div>
    );
}

