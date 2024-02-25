"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Not Found";
  }, []);

  return (
    <>
      <div className="relative grid h-screen place-content-center  px-4 ">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-600 dark:text-gray-700">
            404
          </h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mb-10 mt-4 text-gray-500 dark:text-gray-400">
            We can't find that page.
          </p>

          <Link
            href="/"
            aria-label="About Me"
            className="gap-2.5 rounded-md px-5 py-2 text-lg font-medium tracking-normal transition-colors  duration-300  hover:bg-gray-200 active:scale-95 dark:hover:bg-gray-700 lg:text-xl "
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
