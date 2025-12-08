import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-6 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900/60 backdrop-blur-sm shadow-2xl rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0">
          <div
            role="img"
            aria-label="Sad map pin illustration"
            className="w-56 h-56 flex items-center justify-center rounded-xl bg-linear-to-br from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 shadow-inner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-36 h-36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle
                cx="32"
                cy="22"
                r="10"
                className="text-pink-600 dark:text-pink-400"
                stroke="none"
                fill="currentColor"
              />
              <path
                d="M32 34c-9 0-16.5 4.5-16.5 10.5C15.5 52 23 60 32 60s16.5-8 16.5-15.5C48.5 38.5 41 34 32 34z"
                className="text-purple-500 dark:text-purple-300"
                stroke="none"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M24 22c1.2 1.6 3 2.7 5 2.7s3.8-1.1 5-2.7"
                strokeWidth="0.8"
                className="text-white/80"
                stroke="#ffffff"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            404
          </h1>
          <p className="mt-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
            Page not found
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-prose">
            The page you"re looking for doesn"t exist or has been moved. Try
            returning to the homepage or check the URL for mistakes.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:justify-start justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full shadow hover:shadow-lg transition-all duration-150 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Go home
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            If you think this is a mistake, report it so we can fix it.
          </p>
        </div>
      </div>
    </main>
  );
}
