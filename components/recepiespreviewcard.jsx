"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const apiurl = process.env.NEXT_PUBLIC_apiurl;
export async function getRandomRecepies() {
  const apiquary = apiurl + "?n=9";
  const res = await fetch(apiquary, {
    cache: "no-store",
  });
  return res.json();
}

export default async function RecepiesPreviewCard() {
   const data = await getRandomRecepies();
  const [recepies, setRecepies] = useState([]);

  useEffect(() => {

      if (data.success == true) {
        setRecepies(data.recipes);
      } else {
        console.error("Failed to fetch recipes");
      }

  }, []);
  if (!recepies.length) {
    return (
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="group flex animate-pulse flex-col justify-center rounded-xl bg-gray-50 p-4 dark:bg-gray-900 md:p-7"
            >
              <div className="">
                <div className="h-7 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-2 h-4 w-1/2 rounded-lg bg-gray-200 pb-1 dark:bg-gray-700"></div>
                <div className="mt-2 h-4 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
        {recepies.map((recipe) => (
          <Link
            key={recipe._id}
            className="group flex flex-col justify-center rounded-xl p-4 ring-1 ring-gray-100 hover:bg-gray-50 dark:ring-gray-900 dark:hover:bg-slate-800 dark:focus:outline-none md:p-7"
            href={`/recipes/${recipe._id}`}
          >
            <div className="">
              <h3 className=" text-lg font-semibold capitalize  group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {recipe.name.length > 28
                  ? `${recipe.name.substring(0, 28)}...`
                  : recipe.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-black dark:text-white ">
                  {recipe.minutes}
                </span>{" "}
                minutes •{" "}
                <span className="font-medium text-black dark:text-white ">
                  {" "}
                  {recipe.n_ingredients}
                </span>{" "}
                ingredients
              </p>
              <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-primary decoration-1 group-hover:underline group-hover:underline-offset-4">
                Read more
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
