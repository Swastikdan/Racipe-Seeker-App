"use client";
import React, { useEffect, useState } from "react";
import Recipe from "@/components/recipe";
const apiurl = process.env.NEXT_PUBLIC_apiurl;

const RecipePage = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const recipeId = params.id;
  const apiQuery = `${apiurl}/search/${recipeId}`;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(apiQuery, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data.success && data.recipes.message) {
          throw new Error(data.recipes.message);
        }

        setRecipes(data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto  w-full max-w-screen-xl items-center justify-center p-6    ">
        <section className="h-screen animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800/40"></section>
      </main>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 text-center  font-light sm:text-lg">
        <h3>Something went wrong </h3>
      </div>
    );
  }

  return (
    <>
      <main className=" mx-auto  w-full max-w-screen-xl items-center justify-center p-6  text-base">
        <Recipe recipes={recipes} />
      </main>
    </>
  );
};

export default RecipePage;
