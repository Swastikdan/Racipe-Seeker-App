import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid grid-cols-1 items-center gap-5 text-center md:grid-cols-2">
        <div>
          <Link
            className="flex flex-none items-center gap-x-2 text-xl font-semibold dark:text-white sm:order-1 md:text-2xl"
            href="/"
          >
            <Image src="/icon.svg" alt="logo" width={40} height={30} />
            <span>RecipeDB</span>
          </Link>
        </div>

        <ul className="text-center capitalize md:text-end">
          <li className="relative inline-block pe-8 before:absolute before:end-3 before:top-1/2 before:-translate-y-1/2 before:text-gray-300 before:content-['/'] last:pe-0 last-of-type:before:hidden dark:before:text-gray-600">
            <Link
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="/"
            >
              home
            </Link>
          </li>
          <li className="relative inline-block pe-8 before:absolute before:end-3 before:top-1/2 before:-translate-y-1/2 before:text-gray-300 before:content-['/'] last:pe-0 last-of-type:before:hidden dark:before:text-gray-600">
            <Link
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="/api"
            >
              api
            </Link>
          </li>
          <li className="relative inline-block pe-8 before:absolute before:end-3 before:top-1/2 before:-translate-y-1/2 before:text-gray-300 before:content-['/'] last:pe-0 last-of-type:before:hidden dark:before:text-gray-600">
            <Link
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="https://github.com/Swastikdan/recipe-api"
              target="_blank"
            >
              github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
