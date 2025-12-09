import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 border border-gray-200 dark:border-slate-700">
        <div className="shrink-0">
          <div
            role="img"
            aria-label="Sad map pin illustration"
            className="w-48 h-48 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-28 h-28 text-gray-400 dark:text-gray-300"
              stroke="currentColor"
              fill="none"
            >
              <circle
                cx="32"
                cy="22"
                r="10"
                fill="currentColor"
                stroke="none"
              />
              <path
                d="M32 34c-9 0-16.5 4.5-16.5 10.5C15.5 52 23 60 32 60s16.5-8 16.5-15.5C48.5 38.5 41 34 32 34z"
                fill="currentColor"
                stroke="none"
                opacity="0.8"
              />
              <path
                d="M24 22c1.2 1.6 3 2.7 5 2.7s3.8-1.1 5-2.7"
                strokeWidth="1"
                stroke="#ffffff"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            404
          </h1>

          <p className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">
            Page not found
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-prose">
            The page you’re looking for doesn’t exist or has been moved. Try
            returning to the Login Page or check the URL for mistakes.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:justify-start justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              Go to Login Page
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            If you think this is a mistake, please report it.
          </p>
        </div>
      </div>
    </main>
  );
}
