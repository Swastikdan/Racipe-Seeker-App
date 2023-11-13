document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("search");
  const ingredientInput = document.getElementById("ingredient");
  const dietaryInput = document.getElementById("dietaryRestriction");
  const sortOptionSelect = document.getElementById("sortOption");
  const recipeList = document.getElementById("recipe-list");
  const paginationDiv = document.getElementById("pagination");
  const helpTextSpan = document.getElementById("helpText");
  let currentPage = 1;
  let totalResults = 0;
  let fetchedData = [];
  const resultsPerPage = 10;
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
      ingredientInput.disabled = true;
      ingredientInput.classList.add("disabled");
    } else {
      ingredientInput.disabled = false;
      ingredientInput.classList.remove("disabled");
    }
  });
  ingredientInput.addEventListener("input", () => {
    if (ingredientInput.value.trim() !== "") {
      searchInput.disabled = true;
      searchInput.classList.add("disabled");
    } else {
      searchInput.disabled = false;
      searchInput.classList.remove("disabled");
    }
  });
  const updatePaginationUI = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

    const helpText = `
            Showing <span class="font-semibold text-gray-900 dark:text-white">${startIndex + 1
      }</span>
            to <span class="font-semibold text-gray-900 dark:text-white">${endIndex}</span>
            of <span class="font-semibold text-gray-900 dark:text-white">${totalResults}</span> Entries
        `;

    helpTextSpan.innerHTML = helpText;
  };
  const updatePaginationButtons = () => {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const paginationButtons = paginationDiv.querySelectorAll("[data-page]");
    if (paginationButtons.length !== 2) {

      return;
    }
    const prevButton = paginationButtons[0];
    const nextButton = paginationButtons[1];
    if (currentPage === 1) {
      prevButton.classList.add("disabled");
    } else {
      prevButton.classList.remove("disabled");
    }

    if (currentPage === totalPages) {
      nextButton.classList.add("disabled");
    } else {
      nextButton.classList.remove("disabled");
    }
  };
  const displayRecipes = (filteredData) => {
    recipeList.innerHTML = "";

    if (filteredData.length === 0) {
      recipeList.innerHTML = `<div class=" py-5 flex flex-col space-y-5 text-center ">
<h2 class=" text-2xl font-semibold  text-black dark:text-white">Oops! 🙇🏽‍♂️ Nothing found </h2>
<span class="text-sm md:text-md font-light text-black dark:text-white"> Did you spell it right? Double check and try again! ☕️</span> </div>`;

      paginationDiv.style.display = "none";

    }
    filteredData.forEach((recipe) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.innerHTML = `       
    <a href="/recipe-details?id=${recipe._id}" class="py-5 ">
    <article
          class="rounded-lg border border-gray-900 dark:border-gray-100 bg-gray-100 dark:bg-gray-900 p-4 shadow-sm transition hover:shadow-xl sm:p-6 font-mono"
        >
            <h3 class="mt-0.5 text-lg font-bold text-gray-900 dark:text-white capitalize">
            ${recipe.name}
            </h3>
          <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          ${capitalizeFirstLetter(recipe.description)}
          </p>
            <div class="flex flex-col justify-between space-y-2 mt-4">
              <span>
              <span class="text-md  text-gray-900 dark:text-white">Time: </span>
         <span class="text-md ext-gray-900 dark:text-white">${recipe.minutes
        }  min</span>
           </span>
              <span>
              <span class="text-md  text-gray-900 dark:text-white">Steps: </span>
         <span class="text-md ext-gray-900 dark:text-white">${recipe.n_steps
        }</span>
           </span>
              <div class="flex flex-col">
                <span class="text-lg font-medium text-gray-900 dark:text-white">Ingredients</span>
                <div class="mt-2 space-y-1">

                ${getIngredientsHTML(recipe.ingredients)}
                </div>
              </div>
            </div>
         
        </article>
        </a>
            `;
      recipeList.appendChild(recipeDiv);
    });

    updatePaginationUI();
    updatePaginationButtons();
  };
  const displayPagination = (totalResults) => {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    let paginationHTML = `
            <div class="flex flex-col items-center">
                <div class="flex">
                    <a href="#top" data-page="prev"  class="flex items-center justify-center px-4 h-10 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Prev
                    </a>
                    <a href="#top" data-page="next" class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
    paginationDiv.innerHTML = paginationHTML;
    const paginationButtons = paginationDiv.querySelectorAll("[data-page]");
    paginationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (!button.classList.contains("disabled")) {
          const pageData = button.getAttribute("data-page");
          if (pageData === "prev" && currentPage > 1) {
            currentPage--;
          } else if (pageData === "next" && currentPage < totalPages) {
            currentPage++;
          } else {
            currentPage = parseInt(pageData);
          }
          displayPaginatedRecipes();
        }
      });
    });
    updatePaginationButtons();
  };
  const displayPaginatedRecipes = () => {
    const startIdx = (currentPage - 1) * resultsPerPage;
    const endIdx = startIdx + resultsPerPage;
    const paginatedData = fetchedData.slice(startIdx, endIdx);

    displayRecipes(paginatedData);
  };
  searchButton.addEventListener("click", async () => {
    const searchQuery = sanitizeInput(searchInput.value.trim());
    const ingredientQuery = sanitizeInput(ingredientInput.value.trim());
    const dietaryQuery = sanitizeInput(dietaryInput.value.trim());
    const sortOption = sortOptionSelect.value;
    const finalDietaryQuery = dietaryQuery.split(/\s*,\s*/).filter(term => term !== "");
   
    try {
      const loader = document.getElementById("loader");
      loader.style.display = "block";
      recipeList.style.display = "none";
      paginationDiv.style.display = "none";
      helpTextSpan.style.display = "none";
      let apiUrl = `/api/recipes?`;
      if (searchQuery) {
        apiUrl += `search=${encodeURIComponent(searchQuery)}`;
      }
      if (ingredientQuery) {
        apiUrl += `&ingredient=${encodeURIComponent(ingredientQuery)}`;
      }
      const fetchPromise = fetch(apiUrl);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 20000)
      );
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      loader.style.display = "none";
      recipeList.style.display = "block";
      paginationDiv.style.display = "block";
      helpTextSpan.style.display = "block";
      // Rest of your code
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.message === "Request timed out") {
        displayError("It's taking a long time to get your data. Bare with us.");
        setTimeout(() => {
          if (!response.ok) {
            displayError("Something went wrong");
          }
        }, 60000);
      } else if (error.message) {
        // If the error is an HTTP error, display the status code
        displayError(`Error: ${error.message}`);
      } else {
        // If the error is not an HTTP error, display a generic error message
        displayError("Something went wrong");
      }
    }
  });
  const sortData = (data, sortOption) => {
    if (sortOption === "minutesAsc") {
      return data.sort((a, b) => a.minutes - b.minutes);
    }
    if (sortOption === "minutesDesc") {
      return data.sort((a, b) => b.minutes - a.minutes);
    }
    if (sortOption === "stepsAsc") {
      return data.sort((a, b) => a.n_steps - b.n_steps);
    }
    if (sortOption === "stepsDesc") {
      return data.sort((a, b) => b.n_steps - a.n_steps);
    }
    if (sortOption === "ingredientsAsc") {
      return data.sort((a, b) => a.n_ingredients - b.n_ingredients);
    }
    if (sortOption === "ingredientsDesc") {
      return data.sort((a, b) => b.n_ingredients - a.n_ingredients);
    }
    return data;
  };
  const getIngredientsHTML = (ingredients) => {
    try {
      const ingredientsArray = ingredients
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((ingredient) => ingredient.trim().replace(/'/g, ""));

      return ingredientsArray
        .map(
          (ingredient) =>
            `<span class="inline-block px-3 py-1 mx-1 text-xs font-medium text-green-600 bg-green-100 rounded-full dark:text-green-400 dark:bg-green-800 border-[0.5px] border-green-400 dark:border-green-200">${capitalizeFirstLetter(ingredient)}</span>`
        )
        .join("");
    } catch (error) {
      console.error("Error processing ingredients:", error);
    }
    return "";
  };
  const capitalizeFirstLetter = (sentence) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };
  const sanitizeInput = (input) => {
    return input.replace(/[<>&"']/g, "");
  };
  const displayError = (message) => {
    recipeList.innerHTML = `
     <article
            class="rounded-lg border text-center border-gray-900 bg-gray-100 dark:bg-gray-900 p-4 shadow-sm transition hover:shadow-xl sm:p-6 font-mono"
          >
              <h3 class="mt-0.5 text-lg font-bold text-gray-900 dark:text-white capitalize">
              ${message}
              </h3>  
          </article>
        `;
  };
});
const secretConsoleMessage = `
%cHey, curious developer! 🕵️‍♂️
If you're snooping around here, you must be a coding ninja!
This website is powered by magic ✨ and a lot of caffeine ☕.

Made with ❤️ by


█▀ █░█░█ ▄▀█ █▀ ▀█▀ █ █▄▀
▄█ ▀▄▀▄▀ █▀█ ▄█ ░█░ █ █░█
Check out the code at:
GitHub Repository: https://github.com/Swastikdan/Racipe-Seeker-App.git

P.S. Don't forget to take a break and stretch those coding muscles!
`;

