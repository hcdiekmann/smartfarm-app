import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-[100vh] bg-gradient-custom items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white sm:text-5xl">Lost in the Clouds</h1>
      </div>
      <img
        alt="Illustration"
        className="mx-auto max-w-full max-h-[35vh] object-contain"
        height="600"
        src="/assets/404Page.webp"
        width="800"
      />
      <p className="p-2 max-w-[600px] mx-auto text-white md:text-xl/relaxed dark:text-gray-400">
          It looks like you've stumbled upon a page that doesn't exist.
        </p>
      <Link
        className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        to="/"
      >
        Go Home
      </Link>
    </div>
  )
}