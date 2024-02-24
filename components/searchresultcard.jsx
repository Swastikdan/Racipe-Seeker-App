import React from 'react'
import Link from 'next/link'
export default function SearchResultCard({recipe}) {
  return (
    <>
      <Link
        key={recipe._id}
        href={`/recipes/${recipe._id}`}
        className="group relative my-5 block rounded-xl"
      >
        <span className="absolute inset-0 rounded-xl border-2 border-dashed border-black dark:border-white"></span>

        <div className="relative flex h-full transform items-end rounded-xl border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-white dark:bg-gray-800">
          <div className=" space-y-2 px-6 py-4 ">
            <span className="text-xl font-medium capitalize sm:text-2xl ">
              {recipe.name}
            </span>

            <p className="md:hidden pb-2 text-sm font-extralight">
                {recipe.description.length > 100
                    ? recipe.description.charAt(0).toUpperCase() +
                        recipe.description.slice(1, 100) +
                        "..."
                    : recipe.description.charAt(0).toUpperCase() +
                        recipe.description.slice(1)}
            </p>
            <p className="hidden md:flex pb-2 text-sm font-extralight">
                {recipe.description.length > 250
                    ? recipe.description.charAt(0).toUpperCase() +
                        recipe.description.slice(1, 250) +
                        "..."
                    : recipe.description.charAt(0).toUpperCase() +
                        recipe.description.slice(1)}
            </p>
            <span className="text-sm font-light">
              <span className="font-medium">{recipe.minutes}</span> minutes •{" "}
              <span className="font-medium">{recipe.n_ingredients} </span>
              ingredients •{" "}
              <span className="font-medium">{recipe.n_steps} </span>
              steps
            </span>
            <div className="md:hidden flex flex-wrap gap-2 ">
              {Array.isArray(recipe.tags) &&
                recipe.tags
                  .slice(0, 5)
                  .map((tag) => (
                    <span  className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-light text-gray-800 dark:bg-white/10 dark:text-white">
                      {tag}
                    </span>
                  ))}
            </div>
            <div className="hidden md:flex flex-wrap gap-2 ">
              {Array.isArray(recipe.tags) &&
                recipe.tags
                  .slice(0, 20)
                  .map((tag) => (
                    <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-light text-gray-800 dark:bg-white/10 dark:text-white">
                      {tag}
                    </span>
                  ))}
            </div>
            
          </div>
        </div>
      </Link>
    </>
  );
}
