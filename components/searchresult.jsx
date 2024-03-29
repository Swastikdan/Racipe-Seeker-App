"use client";
const apiurl = process.env.NEXT_PUBLIC_apiurl;
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchResultCard from "./searchresultcard";
import SearchPagePagination from "./searchpagepagination";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const ingredient = searchParams.get("ingredient") || "";
  const dietaryRestriction = searchParams.get("dietaryRestriction") || "";
  const sortOption = searchParams.get("sortOption");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null); // New state for error handling
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state on new query

    async function getSearchResults(page, pageSize) {
      if (!name && !ingredient) {
        setError("No query parameters provided");
        setLoading(false);
        return;
      }

      let apiquary =
        process.env.NEXT_PUBLIC_apiurl + `/search?n=${name}&i=${ingredient}`;

      try {
        const res = await fetch(apiquary, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        let result = data.recipes;

        // Filter based on dietary restrictions
        if (dietaryRestriction) {
          const restrictions = dietaryRestriction
            .split(",")
            .map((item) => item.trim());
          result = result.filter(
            (recipe) =>
              Array.isArray(recipe.ingredients) &&
              restrictions.every(
                (restriction) =>
                  !recipe.ingredients.includes(restriction.trim()),
              ),
          );
        }

        // Sort the recipes based on the selected option
        if (sortOption) {
          switch (sortOption) {
            case "minutesAsc":
              result.sort((a, b) => a.minutes - b.minutes);
              break;
            case "minutesDesc":
              result.sort((a, b) => b.minutes - a.minutes);
              break;
            case "stepsAsc":
              result.sort((a, b) => a.steps.length - b.steps.length);
              break;
            case "stepsDesc":
              result.sort((a, b) => b.steps.length - a.steps.length);
              break;
            case "ingredientsAsc":
              result.sort(
                (a, b) => a.ingredients.length - b.ingredients.length,
              );
              break;
            case "ingredientsDesc":
              result.sort(
                (a, b) => b.ingredients.length - a.ingredients.length,
              );
              break;
          }
        }

        const totalItems = result.length;
        setTotalPages(Math.ceil(totalItems / pageSize));
        result = result.slice((page - 1) * pageSize, page * pageSize);
        return result;
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
        console.error(error);
      }
    }

    getSearchResults(page, pageSize).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [name, ingredient, dietaryRestriction, sortOption, page]);

  return (
    <>
      <section className="mx-auto max-w-[85rem] px-4  sm:px-6 lg:px-8 ">
        {name || ingredient ? (
          <div>
            <h2 className="mb-8 text-3xl font-bold">Search Results</h2>
            {error ? (
              <div className="w-full py-10 text-center font-light sm:text-lg">
                <h3>Oops! Something went wrong 😞</h3>
                <p>{error}</p>
              </div>
            ) : loading ? (
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="my-5 h-56 w-full animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800"
                  ></div>
                ))}
              </div>
            ) : (
              <>
                {data && data.length === 0 && (
                  <div className="w-full py-10 text-center font-light sm:text-lg">
                    <h3>Oops! 🙇🏽‍♂️ Nothing found. Did you spell it right?</h3>
                    <p>Double check and try again! ☕️</p>
                  </div>
                )}
                {data &&
                  data.map((recipe) => <SearchResultCard recipe={recipe} />)}
              </>
            )}

            {totalPages !== 0 && (
              <SearchPagePagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            )}
          </div>
        ) : (
          <div className="w-full py-10 text-center  font-light sm:text-lg">
            <h3>Something went wrong </h3>
            {!name && !ingredient && (
              <p>
                For better results, consider searching by name or ingredients.
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
