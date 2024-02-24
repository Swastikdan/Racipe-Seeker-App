"use client";
import React, { useState } from 'react';
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";


export default function HeropageSearch() {
    const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/search?name=${searchTerm}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form action="/search" className="flex w-full " onSubmit={handleSubmit}>
      <div className="relative w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          className="peer block w-full rounded-xl border-transparent bg-gray-100 px-4 py-3 ps-11 text-sm placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent  dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:ring-gray-600"
          placeholder="Search for a recipe"
          required
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
          <Search />
        </div>
      </div>
      <button className="ml-2 hidden rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:block">
        Search
      </button>
    </form>
  );
}
