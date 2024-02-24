"use client";
const apiurl = process.env.NEXT_PUBLIC_apiurl;
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchResultCard() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const ingredient = searchParams.get("ingredient") || "";
  const dietaryRestriction = searchParams.get("dietaryRestriction") || "";
  const sortOption = searchParams.get("sortOption");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  useEffect(() => {
    setLoading(true); // Set loading to true when a new query is sent
    async function getSearchResults(page, pageSize) {
      if (!name && !ingredient) {
        console.error("No query parameters provided");
        return;
      }

      let apiquary = apiurl + `/search?n=${name}&i=${ingredient}`;
      let data;
      try {
        const res = await fetch(apiquary, {
          cache: "no-store",
        });
        data = await res.json();
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
        return;
      }

      let result = data.recipes;

      // Filter out recipes that contain the restricted ingredients
      if (dietaryRestriction) {
        const restrictions = dietaryRestriction.split(",");
        result = result.filter((recipe) =>
          restrictions.every(
            (restriction) => !recipe.ingredients.includes(restriction),
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
            result.sort((a, b) => a.ingredients.length - b.ingredients.length);
            break;
          case "ingredientsDesc":
            result.sort((a, b) => b.ingredients.length - a.ingredients.length);
            break;
        }
      }
      const totalItems = result.length;
      setTotalPages(Math.ceil(totalItems / pageSize));
      result = result.slice((page - 1) * pageSize, page * pageSize);
      return result;
    }

    getSearchResults(page, pageSize).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [name, ingredient, dietaryRestriction, sortOption, page]);

  return (
    <>
      <section className="mx-auto max-w-[85rem] px-4  sm:px-6 lg:px-8 ">
        <h2 className="mb-8 text-3xl font-bold">Search Results</h2>

        {loading ? (
          <div>
            <h3>Loading...</h3>
          </div>
        ) : (
          <>
            {data && data.length === 0 && (
              <div>
                <h3>No results found</h3>
              </div>
            )}
            {data &&
              data.map((recipe) => (
                <a
                  key={recipe._id}
                  href={`/recipes/${recipe._id}/${encodeURIComponent(
                    recipe.name,
                  ).replace(/%20/g, "-")}`}
                  className="group relative m-5 block rounded-xl"
                >
                  <span className="absolute inset-0 rounded-xl border-2 border-dashed border-black dark:border-white"></span>

                  <div className="relative flex h-full transform items-end rounded-xl border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-white dark:bg-gray-800">
                    <div className=" space-y-2 px-6 py-4 ">
                      <span className="text-xl font-medium sm:text-2xl">
                        {recipe.name}
                      </span>

                      <p className=" text-sm sm:text-base">
                        {recipe.description}
                      </p>
                      <span className="text-sm sm:text-base">
                        {recipe.minutes} minutes • {recipe.n_ingredients}{" "}
                        ingredients • {recipe.n_steps} steps
                      </span>
                      <div className="flex flex-wrap gap-2 ">
                        {Array.isArray(recipe.tags) &&
                          recipe.tags
                            .slice(0, 10)
                            .map((tag) => (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
                                {tag}
                              </span>
                            ))}
                      </div>
                      <p className="font-bold">Read more</p>
                    </div>
                  </div>
                </a>
              ))}
          </>
        )}
        {/* <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button> */}

        {data && data.length > 0 && (
          <div class="flex w-full items-center justify-center gap-x-1 ">
            <button
              type="button"
              className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <svg
                class="size-3.5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Previous</span>
            </button>
            <div class="flex items-center gap-x-1">
              <span class="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:bg-white/10">
                {page}
              </span>
              <span class="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 dark:text-gray-500">
                of
              </span>
              <span class="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 dark:text-gray-500">
                {totalPages}
              </span>
            </div>
            <button
              type="button"
              className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <span>Next</span>
              <svg
                class="size-3.5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
{
  /* <a href="#" class="group relative m-5 block rounded-xl">
            <span class="absolute inset-0 rounded-xl border-2 border-dashed border-black dark:border-white"></span>

            <div class="relative flex h-full transform items-end rounded-xl border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-white dark:bg-gray-800">
              <div class=" px-6 py-4 space-y-2 ">
                <span class="text-xl font-medium sm:text-2xl">
                  Banana Split
                </span>

                <p class=" text-sm sm:text-base">
                  This is play on the banana split. it's warm banana bread with
                  fresh bananas, chocolate ganach, crushed pineapple, candied
                  walnuts and whipped cream. it's much easier than it sounds!
                  very impressive dessert
                </p>
                <span class="text-sm sm:text-base">
                  40 minutes • 9 ingredients • 5 steps
                </span>
                <div className="flex flex-wrap gap-2 ">
                  <span class="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
                    Badge
                  </span>
                </div>
                <p class="font-bold">Read more</p>
              </div>
            </div>
          </a> */
}

//           export default function SearchResultCard() {
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name") || "";
//   const ingredient = searchParams.get("ingredient") || "";
//   const dietaryRestriction = searchParams.get("dietaryRestriction") || "";
//   const sortOption = searchParams.get("sortOption");

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true); // Set loading to true when a new query is sent
//     async function getSearchResults() {
//       let apiquary = apiurl + `/search?n=${name}&i=${ingredient}`;
//       const res = await fetch(apiquary, {
//         cache: "no-store",
//       });
//       let data = await res.json();
//       let result = data.recipes;

//       // Filter out recipes that contain the restricted ingredients
//       if (dietaryRestriction) {
//         const restrictions = dietaryRestriction.split(",");
//         result = result.filter((recipe) =>
//           restrictions.every(
//             (restriction) => !recipe.ingredients.includes(restriction),
//           ),
//         );
//       }

//       // Sort the recipes based on the selected option
//       if (sortOption) {
//         switch (sortOption) {
//           case "minutesAsc":
//             result.sort((a, b) => a.minutes - b.minutes);
//             break;
//           case "minutesDesc":
//             result.sort((a, b) => b.minutes - a.minutes);
//             break;
//           case "stepsAsc":
//             result.sort((a, b) => a.steps.length - b.steps.length);
//             break;
//           case "stepsDesc":
//             result.sort((a, b) => b.steps.length - a.steps.length);
//             break;
//           case "ingredientsAsc":
//             result.sort((a, b) => a.ingredients.length - b.ingredients.length);
//             break;
//           case "ingredientsDesc":
//             result.sort((a, b) => b.ingredients.length - a.ingredients.length);
//             break;
//         }
//       }

//       return result;
//     }

//     getSearchResults().then((result) => {
//       setData(result);
//       setLoading(false);
//     });
//   }, [name, ingredient, dietaryRestriction, sortOption]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div>
//         <h1>Search Result</h1>
//         <p>
//           Search Result for {name} {ingredient} {dietaryRestriction}
//           {sortOption}
//         </p>
//         {/* <div>{JSON.stringify(data)}</div> */}

//          <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
//           <h2 className="mb-8 text-3xl font-bold">Search Results</h2>
//           {data.length === 0 && (
//             <div>
//               <h3>No results found</h3>
//             </div>
//           )}
//           {data.map((recipe) => (
//             <a
//               key={recipe._id}
//               href={`/recipes/${recipe._id}/${encodeURIComponent(
//                 recipe.name,
//               ).replace(/%20/g, "-")}`}
//               className="group relative m-5 block rounded-xl"
//             >
//               <span className="absolute inset-0 rounded-xl border-2 border-dashed border-black dark:border-white"></span>

//               <div className="relative flex h-full transform items-end rounded-xl border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-white dark:bg-gray-800">
//                 <div className=" space-y-2 px-6 py-4 ">
//                   <span className="text-xl font-medium sm:text-2xl">
//                     {recipe.name}
//                   </span>

//                   <p className=" text-sm sm:text-base">{recipe.description}</p>
//                   <span className="text-sm sm:text-base">
//                     {recipe.minutes} minutes • {recipe.n_ingredients}{" "}
//                     ingredients
//                   </span>
//                   <div className="flex flex-wrap gap-2 ">
//                     <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
//                       Badge
//                     </span>
//                   </div>
//                   <p className="font-bold">Read more</p>
//                 </div>
//               </div>
//             </a>
//           ))}

//         </section>
//       </div>
//     </>
//   );
// }
{
  /* <a href="#" class="group relative m-5 block rounded-xl">
            <span class="absolute inset-0 rounded-xl border-2 border-dashed border-black dark:border-white"></span>

            <div class="relative flex h-full transform items-end rounded-xl border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-white dark:bg-gray-800">
              <div class=" px-6 py-4 space-y-2 ">
                <span class="text-xl font-medium sm:text-2xl">
                  Banana Split
                </span>

                <p class=" text-sm sm:text-base">
                  This is play on the banana split. it's warm banana bread with
                  fresh bananas, chocolate ganach, crushed pineapple, candied
                  walnuts and whipped cream. it's much easier than it sounds!
                  very impressive dessert
                </p>
                <span class="text-sm sm:text-base">
                  40 minutes • 9 ingredients • 5 steps
                </span>
                <div className="flex flex-wrap gap-2 ">
                  <span class="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
                    Badge
                  </span>
                </div>
                <p class="font-bold">Read more</p>
              </div>
            </div>
          </a>
          

          // <div class="flex w-full items-center justify-center gap-x-1 ">
            //   <button
            //     type="button"
            //     className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            //     onClick={() => setPage(page - 1)}
            //     disabled={page === 1}
            //   >
            //     <svg
            //       class="size-3.5 flex-shrink-0"
            //       xmlns="http://www.w3.org/2000/svg"
            //       width="24"
            //       height="24"
            //       viewBox="0 0 24 24"
            //       fill="none"
            //       stroke="currentColor"
            //       stroke-width="2"
            //       stroke-linecap="round"
            //       stroke-linejoin="round"
            //     >
            //       <path d="m15 18-6-6 6-6" />
            //     </svg>
            //     <span>Previous</span>
            //   </button>
            //   <div class="flex items-center gap-x-1">
            //     <span class="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:bg-white/10">
            //       {page}
            //     </span>
            //     <span class="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 dark:text-gray-500">
            //       of
            //     </span>
            //     <span class="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 dark:text-gray-500">
            //       {totalPages}
            //     </span>
            //   </div>
            //   <button
            //     type="button"
            //     className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            //     onClick={() => setPage(page + 1)}
            //     disabled={page === totalPages}
            //   >
            //     <span>Next</span>
            //     <svg
            //       class="size-3.5 flex-shrink-0"
            //       xmlns="http://www.w3.org/2000/svg"
            //       width="24"
            //       height="24"
            //       viewBox="0 0 24 24"
            //       fill="none"
            //       stroke="currentColor"
            //       stroke-width="2"
            //       stroke-linecap="round"
            //       stroke-linejoin="round"
            //     >
            //       <path d="m9 18 6-6-6-6" />
            //     </svg>
            //   </button>
            // </div>
          
          
          
          
          
          
          
          
          
          
          
          */
}

//           export default function SearchResultCard() {
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name") || "";
//   const ingredient = searchParams.get("ingredient") || "";
//   const dietaryRestriction = searchParams.get("dietaryRestriction") || "";
//   const sortOption = searchParams.get("sortOption");

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true); // Set loading to true when a new query is sent
//     async function getSearchResults() {
//       let apiquary = apiurl + `/search?n=${name}&i=${ingredient}`;
//       const res = await fetch(apiquary, {
//         cache: "no-store",
//       });
//       let data = await res.json();
//       let result = data.recipes;

//       // Filter out recipes that contain the restricted ingredients
//       if (dietaryRestriction) {
//         const restrictions = dietaryRestriction.split(",");
//         result = result.filter((recipe) =>
//           restrictions.every(
//             (restriction) => !recipe.ingredients.includes(restriction),
//           ),
//         );
//       }

//       // Sort the recipes based on the selected option
//       if (sortOption) {
//         switch (sortOption) {
//           case "minutesAsc":
//             result.sort((a, b) => a.minutes - b.minutes);
//             break;
//           case "minutesDesc":
//             result.sort((a, b) => b.minutes - a.minutes);
//             break;
//           case "stepsAsc":
//             result.sort((a, b) => a.steps.length - b.steps.length);
//             break;
//           case "stepsDesc":
//             result.sort((a, b) => b.steps.length - a.steps.length);
//             break;
//           case "ingredientsAsc":
//             result.sort((a, b) => a.ingredients.length - b.ingredients.length);
//             break;
//           case "ingredientsDesc":
//             result.sort((a, b) => b.ingredients.length - a.ingredients.length);
//             break;
//         }
//       }

//       return result;
//     }

//     getSearchResults().then((result) => {
//       setData(result);
//       setLoading(false);
//     });
//   }, [name, ingredient, dietaryRestriction, sortOption]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div>
//         <h1>Search Result</h1>
//         <p>
//           Search Result for {name} {ingredient} {dietaryRestriction}
//           {sortOption}
//         </p>
//         {/* <div>{JSON.stringify(data)}</div> */}

//          <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
//           <h2 className="mb-8 text-3xl font-bold">Search Results</h2>
//           {data.length === 0 && (
//             <div>
//               <h3>No results found</h3>
//             </div>
//           )}
//           {data.map((recipe) => (
//             <a
//               key={recipe._id}
//               href={`/recipes/${recipe._id}/${encodeURIComponent(
//                 recipe.name,
//               ).replace(/%20/g, "-")}`}
//               className="group relative m-5 block rounded-xl"
//             >
//               <span className="absolute inset-0 rounded-xl border-2 border-dashed border-black dark:border-white"></span>

//               <div className="relative flex h-full transform items-end rounded-xl border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-white dark:bg-gray-800">
//                 <div className=" space-y-2 px-6 py-4 ">
//                   <span className="text-xl font-medium sm:text-2xl">
//                     {recipe.name}
//                   </span>

//                   <p className=" text-sm sm:text-base">{recipe.description}</p>
//                   <span className="text-sm sm:text-base">
//                     {recipe.minutes} minutes • {recipe.n_ingredients}{" "}
//                     ingredients
//                   </span>
//                   <div className="flex flex-wrap gap-2 ">
//                     <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
//                       Badge
//                     </span>
//                   </div>
//                   <p className="font-bold">Read more</p>
//                 </div>
//               </div>
//             </a>
//           ))}

//         </section>
//       </div>
//     </>
//   );
// }

{
  /*
        
        // <a
                //   key={recipe._id}
                //   href={`/recipes/${recipe._id}/${encodeURIComponent(
                //     recipe.name,
                //   ).replace(/%20/g, "-")}`}
                //   className="group relative m-5 block rounded-xl"
                // >
                //   <span className="absolute inset-0 rounded-xl border-2 border-dashed border-black dark:border-white"></span>

                //   <div className="relative flex h-full transform items-end rounded-xl border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-white dark:bg-gray-800">
                //     <div className=" space-y-2 px-6 py-4 ">
                //       <span className="text-xl font-medium sm:text-2xl">
                //         {recipe.name}
                //       </span>

                //       <p className=" text-sm sm:text-base">
                //         {recipe.description}
                //       </p>
                //       <span className="text-sm sm:text-base">
                //         {recipe.minutes} minutes • {recipe.n_ingredients}{" "}
                //         ingredients • {recipe.n_steps} steps
                //       </span>
                //       <div className="flex flex-wrap gap-2 ">
                //         {Array.isArray(recipe.tags) &&
                //           recipe.tags
                //             .slice(0, 10)
                //             .map((tag) => (
                //               <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
                //                 {tag}
                //               </span>
                //             ))}
                //       </div>
                //       <p className="font-bold">Read more</p>
                //     </div>
                //   </div>
                // </a>
        
        
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button> */
}

{
  /* {data ? (
        <section className="mx-auto max-w-[85rem] px-4  sm:px-6 lg:px-8 ">
          <h2 className="mb-8 text-3xl font-bold">Search Results</h2>








          {loading ? (
            <div>
              <h3>Loading...</h3>
            </div>
          ) : (
            <>
              {data && data.length === 0 && (
                <div>
                  <h3>No results found</h3>
                </div>
              )}
              {data &&
                data.map((recipe) => <SearchResultCard recipe={recipe} />)}
            </>
          )}

          {data && data.length > 0 && (
            

            <SearchPagePagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
        </section>
      ) : (
        <div>
          <h3>Nothing Found</h3>
        </div>
      )} */
}

// <div>
//   <h2 className="mb-8 text-3xl font-bold">Search Results</h2>
//   {loading ? (
//     <div>
//       {Array.from({ length: 10 }).map((_, i) => (
//         <div
//           key={i}
//           className="my-5 h-56 w-full rounded-xl bg-gray-200 "
//         ></div>
//       ))}
//     </div>
//   ) : (
//     <>
//       {data && data.length === 0 && (
//         <div>
//           <h3>No results found</h3>
//         </div>
//       )}
//       {data &&
//         data.map((recipe) => <SearchResultCard recipe={recipe} />)}
//     </>
//   )}
//   <SearchPagePagination
//     page={page}
//     totalPages={totalPages}
//     setPage={setPage}
//   />
// </div>
