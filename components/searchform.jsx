"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SearchForm() {
  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [isNameDisabled, setIsNameDisabled] = useState(false);
  const [isIngredientDisabled, setIsIngredientDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setName(searchParams.get("name") || "");
    setIngredient(searchParams.get("ingredient") || "");
    setDietaryRestriction(searchParams.get("dietaryRestriction") || "");
    setSortOption(searchParams.get("sortOption") || "default");
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value) {
      setIsIngredientDisabled(true);
    } else {
      setIsIngredientDisabled(false);
    }
  };

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
    if (e.target.value) {
      setIsNameDisabled(true);
    } else {
      setIsNameDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(
      `/search?name=${name}&ingredient=${ingredient}&dietaryRestriction=${dietaryRestriction}&sortOption=${sortOption}`,
    );
  };

  useEffect(() => {
    if (name) {
      setIsIngredientDisabled(true);
    } else if (ingredient) {
      setIsNameDisabled(true);
    }
  }, [name, ingredient]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-auto  w-full max-w-screen-xl items-center justify-center p-6  text-base"
    >
      <div className="mb-4">
        <label
          for="search"
          className="mb-3 block text-xl font-semibold text-gray-900 dark:text-gray-200 md:text-2xl"
        >
          Search Recipe
        </label>
        <div
          className={`flex w-full items-center rounded-xl border bg-gray-100 focus:border-gray-800 focus:outline-none ${isNameDisabled ? "cursor-default opacity-40" : ""} dark:bg-gray-600 dark:text-gray-100 dark:focus:border-gray-100`}
        >
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            disabled={isNameDisabled}
            className="w-full  rounded-xl bg-gray-100 px-3  py-2 font-light  placeholder-gray-900 dark:bg-gray-600  dark:placeholder-gray-200 "
            placeholder="Enter a recipe name"
          />
          {name && (
            <span
              onClick={() => {
                setName("");
                setIsIngredientDisabled(false);
              }}
              className=" flex cursor-pointer justify-end px-2 text-end text-sm font-light hover:underline hover:underline-offset-4 "
            >
              <X />
            </span>
          )}
        </div>
      </div>
      <div className="mx-auto items-center text-center md:py-4 ">
        <span className="mx-auto items-center text-center text-lg  text-gray-900  dark:text-gray-200 ">
          Or
        </span>
      </div>
      <div className="mb-4">
        <div
          className={`flex w-full items-center rounded-xl border bg-gray-100 focus:border-gray-800 focus:outline-none ${isIngredientDisabled ? "cursor-default opacity-40" : ""} dark:bg-gray-600 dark:text-gray-100 dark:focus:border-gray-100`}
        >
          <input
            type="text"
            value={ingredient}
            onChange={handleIngredientChange}
            disabled={isIngredientDisabled}
            className="w-full rounded-xl bg-gray-100 px-3  py-2 font-light  placeholder-gray-900 dark:bg-gray-600 dark:placeholder-gray-200"
            placeholder="Enter a recipe name"
          />
          {ingredient && (
            <span
              onClick={() => {
                setIngredient("");
                setIsNameDisabled(false);
              }}
              className="flex cursor-pointer justify-end px-2 text-end text-sm font-light hover:underline hover:underline-offset-4"
            >
              <X />
            </span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <TooltipProvider>
          <Tooltip>
            <div className=" flex space-x-2">
              <label
                for="dietaryRestriction"
                className="mb-3 block  font-semibold text-gray-900 dark:text-gray-200"
              >
                Dietary Restrictions
              </label>
              <TooltipTrigger className="pb-5">
                <span className="mb-6 cursor-pointer rounded-2xl  bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
                  Beta
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-center">
                  This is a beta feature. <br /> It may not work properly all
                  the time
                </p>
              </TooltipContent>
            </div>
          </Tooltip>
        </TooltipProvider>
        <div className="flex w-full items-center rounded-xl border bg-gray-100 focus:border-gray-800 focus:outline-none dark:bg-gray-600 dark:text-gray-100 dark:focus:border-gray-100">
          <input
            type="text"
            value={dietaryRestriction}
            onChange={(e) => setDietaryRestriction(e.target.value)}
            className="w-full  rounded-xl bg-gray-100 px-3  py-2 font-light  placeholder-gray-900 dark:bg-gray-600  dark:placeholder-gray-200 "
            placeholder="Dietary restrictions  (comma-separated)"
          />
          {dietaryRestriction && (
            <span
              onClick={() => {
                setDietaryRestriction("");
              }}
              className="flex cursor-pointer justify-end px-2 text-end text-sm font-light hover:underline hover:underline-offset-4 "
            >
              <X />
            </span>
          )}
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between ">
        <select
          className="w-36 cursor-pointer rounded-xl border bg-gray-100 px-3 py-2  font-light focus:border-gray-500 focus:outline-none dark:bg-gray-600 dark:text-gray-100 md:w-64 "
          aria-labelledby="sortOption"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option className="cursor-pointer font-light" value="default">
            Sort by
          </option>
          <option className="cursor-pointer font-light" value="minutesAsc">
            Minutes (Low to High)
          </option>
          <option className="cursor-pointer font-light" value="minutesDesc">
            Minutes (High to Low)
          </option>
          <option className="cursor-pointer font-light" value="stepsAsc">
            Steps (Low to High)
          </option>
          <option className="cursor-pointer font-light" value="stepsDesc">
            Steps (High to Low)
          </option>
          <option className="cursor-pointer font-light" value="ingredientsAsc">
            Ingredients (Low to High)
          </option>
          <option className="cursor-pointer font-light" value="ingredientsDesc">
            Ingredients (High to Low)
          </option>
        </select>
        <button
          type="submit"
          className=" text-md rounded-lg border border-transparent bg-blue-600  px-8 py-2 font-medium text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 md:text-xl "
        >
          Search
        </button>
      </div>
      <div className="helper-text-all flex justify-between pt-5">
        <div></div>
      </div>
    </form>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { X } from "lucide-react";
// export default function SearchForm() {
//   const [name, setName] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [dietaryRestriction, setDietaryRestriction] = useState("");
//   const [sortOption, setSortOption] = useState("default");
//   const [isNameDisabled, setIsNameDisabled] = useState(false);
//   const [isIngredientDisabled, setIsIngredientDisabled] = useState(false);
//   const router = useRouter();

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     if (e.target.value) {
//       setIsIngredientDisabled(true);
//     } else {
//       setIsIngredientDisabled(false);
//     }
//   };

//   const handleIngredientChange = (e) => {
//     setIngredient(e.target.value);
//     if (e.target.value) {
//       setIsNameDisabled(true);
//     } else {
//       setIsNameDisabled(false);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     router.push(
//       `/search?name=${name}&ingredient=${ingredient}&dietaryRestriction=${dietaryRestriction}&sortOption=${sortOption}`,
//     );
//   };

//   useEffect(() => {
//     if (name) {
//       setIsIngredientDisabled(true);
//     } else if (ingredient) {
//       setIsNameDisabled(true);
//     }
//   }, [name, ingredient]);

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className=" mx-auto  w-full max-w-screen-xl items-center justify-center  p-6"
//     >
//       <div className="mb-4">
//         <label
//           for="search"
//           className="mb-3 block text-xl font-semibold text-gray-900 dark:text-gray-200 md:text-2xl"
//         >
//           Search Recipe
//         </label>
//         <div
//           className={`flex w-full items-center rounded-xl border bg-gray-100 focus:border-gray-800 focus:outline-none ${isNameDisabled ? "cursor-default opacity-40" : ""} dark:bg-gray-600 dark:text-gray-100 dark:focus:border-gray-100`}
//         >
//           <input
//             type="text"
//             value={name}
//             onChange={handleNameChange}
//             disabled={isNameDisabled}
//             className="w-full  rounded-xl bg-gray-100 px-3 py-2 placeholder-gray-900 dark:bg-gray-600  dark:placeholder-gray-200 "
//             placeholder="Enter a recipe name"
//           />
//           {name && (
//             <span
//               onClick={() => {
//                 setName("");
//                 setIsIngredientDisabled(false);
//               }}
//               className="text-x flex cursor-pointer justify-end px-2 text-end font-light hover:underline hover:underline-offset-4 sm:text-sm "
//             >
//               <X />
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="mx-auto items-center text-center md:py-4 ">
//         <span className="mx-auto items-center text-center text-xl font-semibold text-gray-900  dark:text-gray-200 md:text-2xl ">
//           Or
//         </span>
//       </div>
//       <div className="mb-4">
//         <div
//           className={`flex w-full items-center rounded-xl border bg-gray-100 focus:border-gray-800 focus:outline-none ${isIngredientDisabled ? "cursor-default opacity-40" : ""} dark:bg-gray-600 dark:text-gray-100 dark:focus:border-gray-100`}
//         >
//           <input
//             type="text"
//             value={ingredient}
//             onChange={handleIngredientChange}
//             disabled={isIngredientDisabled}
//             className="w-full rounded-xl bg-gray-100 px-3 py-2 placeholder-gray-900 dark:bg-gray-600 dark:placeholder-gray-200"
//             placeholder="Enter a recipe name"
//           />
//           {ingredient && (
//             <span
//               onClick={() => {
//                 setIngredient("");
//                 setIsNameDisabled(false);
//               }}
//               className="text-x flex cursor-pointer justify-end px-2 text-end font-light hover:underline hover:underline-offset-4 sm:text-sm"
//             >
//               <X />
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="mb-4">
//         <div className="hs-tooltip flex space-x-2 [--trigger:click]">
//           <label
//             for="dietaryRestriction"
//             className="mb-3 block text-xl font-semibold text-gray-900 dark:text-gray-200 md:text-2xl"
//           >
//             Dietary Restrictions{" "}
//           </label>
//           <span className=" hs-tooltip-toggle mb-6 cursor-pointer rounded-2xl  bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
//             Beta
//           </span>
//           <span
//             className="  hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-10 inline-block rounded-md bg-gray-900 px-2 py-1 text-center text-xs font-medium text-white opacity-0 transition-opacity dark:bg-slate-700"
//             role="tooltip"
//           >
//             This is a beta feature. <br /> It may not work properly all the
//             time.
//           </span>
//         </div>
//         <div className="flex w-full items-center rounded-xl border bg-gray-100 focus:border-gray-800 focus:outline-none dark:bg-gray-600 dark:text-gray-100 dark:focus:border-gray-100">
//           <input
//             type="text"
//             value={dietaryRestriction}
//             onChange={(e) => setDietaryRestriction(e.target.value)}
//             className="w-full  rounded-xl bg-gray-100 px-3 py-2 placeholder-gray-900 dark:bg-gray-600  dark:placeholder-gray-200 "
//             placeholder="Dietary restrictions  (comma-separated)"
//           />
//           {dietaryRestriction && (
//             <span
//               onClick={() => {
//                 setDietaryRestriction("");
//               }}
//               className="text-x flex cursor-pointer justify-end px-2 text-end font-light hover:underline hover:underline-offset-4 sm:text-sm "
//             >
//               <X />
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="mb-4 flex items-center justify-between ">
//         <select
//           className="md:text-md w-36 rounded-xl border bg-gray-100 px-3 py-2 focus:border-gray-500 focus:outline-none dark:bg-gray-600 dark:text-gray-100 md:w-64 "
//           aria-labelledby="sortOption"
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//         >
//           <option value="default">Sort by</option>
//           <option value="minutesAsc">Minutes (Low to High)</option>
//           <option value="minutesDesc">Minutes (High to Low)</option>
//           <option value="stepsAsc">Steps (Low to High)</option>
//           <option value="stepsDesc">Steps (High to Low)</option>
//           <option value="ingredientsAsc">Ingredients (Low to High)</option>
//           <option value="ingredientsDesc">Ingredients (High to Low)</option>
//         </select>
//         <button
//           type="submit"
//           className=" text-md rounded-lg border border-transparent bg-blue-600  px-8 py-2 font-medium text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 md:text-xl "
//         >
//           Search
//         </button>
//       </div>
//       <div className="helper-text-all flex justify-between pt-5">
//         <div></div>
//         <div
//           className="text-base text-gray-700 dark:text-gray-400"
//           id="helpText"
//         ></div>
//       </div>
//     </form>
//   );
// }
