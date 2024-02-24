import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import HeropageSearch from "./heropagesearch";
export default function Hero() {
  return (
    <>
      <div className="text-center pt-5 md:pt-10 pb-5 max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h1 className="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-gray-200">
          Welcome to the
          <span className="text-blue-500"> RecipeDB</span>
        </h1>
        <p className="text-xs text-gray-500 tracking-wide  mb-3 dark:text-gray-200">
          An open, database of Recipes from around the world
        </p>
        <section className="w-full max-w-5xl flex flex-col justify-center mx-auto">
          <div className="flex justify-center px-5 pt-5 md:pt-10">
            {/* <form action="/search" className="w-full flex ">
              <div class="relative w-full">
                <label for="search" class="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent  dark:focus:ring-gray-600 placeholder-gray-600 dark:placeholder-gray-400"
                  placeholder="Search for a recipe"
                  required
                />
                <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <Search />
                </div>
              </div>
              <button className="hidden sm:block px-4 py-2 rounded-lg ml-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
                Search
              </button>
            </form> */}
            <HeropageSearch />
          </div>
          <span className="flex justify-end text-end">
            <Link
              href="/search"
              className="text-xs sm:text-sm font-light  px-5 pt-3 capitalize hover:underline hover:underline-offset-4"
            >
              advanced search
            </Link>
          </span>
        </section>
      </div>
    </>
  );
}
