import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-custom font-bold text-neutral-900 dark:text-neutral-50">
        404
      </h1>
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 font-custom2">
        Page not found. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}