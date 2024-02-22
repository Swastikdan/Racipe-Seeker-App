"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

async function getRecepies() {
    const res = await fetch(
      "https://therecipedbapi.vercel.app/api/recipes?n=9",
      {
        cache: "no-store",
      }
    );
    return res.json();
}




export default function RecepiesPreview() {
  const [recepies, setRecepies] = useState([]);

  useEffect(() => {
    const fetchRecepies = async () => {
      const data = await getRecepies();
      if (data.success == true) {
        setRecepies(data.recipes);
      } else {
        console.error("Failed to fetch recipes");
      }
    };

    fetchRecepies();
  }, []);
  if (!recepies.length) {
    return (
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="group flex flex-col justify-center rounded-xl p-4 md:p-7 animate-pulse bg-gray-50 dark:bg-gray-900"
            >
              <div className="">
                <div className="h-7 bg-gray-200 rounded-lg w-3/4 dark:bg-gray-700"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded-lg w-1/2 dark:bg-gray-700 pb-1"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded-lg w-1/4 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div class="max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
        {recepies.map((recipe) => (
          <Link
            key={recipe._id}
            class="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-slate-800 dark:focus:outline-none ring-1 ring-gray-100 dark:ring-gray-900"
            href={`/recipes/${recipe._id}/${encodeURIComponent(
              recipe.name
            ).replace(/%20/g, "-")}`}
          >
            <div class="">
              <h3 class=" group-hover:text-gray-700 text-lg font-semibold  dark:group-hover:text-gray-300 capitalize">
                {recipe.name.length > 28
                  ? `${recipe.name.substring(0, 28)}...`
                  : recipe.name}
              </h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-black dark:text-white font-medium ">
                  {recipe.minutes}
                </span>{" "}
                minutes •{" "}
                <span className="text-black dark:text-white font-medium ">
                  {" "}
                  {recipe.n_ingredients}
                </span>{" "}
                ingredients
              </p>
              <span class="mt-2 inline-flex items-center gap-x-1.5 text-sm text-primary decoration-1 group-hover:underline group-hover:underline-offset-4">
                Read more
              </span>
            </div>
          </Link>
        ))}
        {/* <a
            class="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-slate-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="#"
          >
            <div class="mt-5">
              <h3 class="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400 capitalize">
                chewy coconut granola
              </h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 capitalize py-1">
                chewy, sweet, and high in fiber. a delicious way to get your
                oats and fiber.
              </p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                30 minutes • 6 ingredients
              </p>
              <span class="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
                Learn more
              </span>
            </div>
          </a>
          <a
            class="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-slate-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="#"
          >
            <div class="mt-5">
              <h3 class="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400 capitalize">
                chewy coconut granola
              </h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 capitalize py-1">
                chewy, sweet, and high in fiber. a delicious way to get your
                oats and fiber.
              </p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                30 minutes • 6 ingredients
              </p>
              <span class="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
                Learn more
              </span>
            </div>
          </a>
          <a
            class="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-slate-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="#"
          >
            <div class="mt-5">
              <h3 class="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400 capitalize">
                chewy coconut granola
              </h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 capitalize py-1">
                chewy, sweet, and high in fiber. a delicious way to get your
                oats and fiber.
              </p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                30 minutes • 6 ingredients
              </p>
              <span class="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
                Learn more
              </span>
            </div>
          </a> */}
        {/* <div className="group flex flex-col justify-center rounded-xl p-4 md:p-7 animate-pulse bg-gray-300 dark:bg-gray-800">
            <div className="mt-5">
              <div className="h-7 bg-gray-100 rounded-lg w-3/4 dark:bg-gray-700"></div>

              <div className="mt-2 h-5 bg-gray-100 rounded-lg w-full dark:bg-gray-700 pt-1"></div>
              <div className="mt-2 h-5 bg-gray-100 rounded-lg w-1/2 dark:bg-gray-700"></div>
              <div className="mt-2 h-5 bg-gray-100 rounded-lg w-1/2 dark:bg-gray-700 pb-1"></div>
              <div className="mt-2 h-4 bg-gray-100 rounded-lg w-1/4 dark:bg-gray-700"></div>
            </div>
          </div> */}
      </div>
    </div>
  );
}
