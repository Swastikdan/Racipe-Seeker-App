function capitalizeFirstLetter(sentence) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
const formatTags = (tags) => {
  try {
    const tagsArray = JSON.parse(tags.replace(/'/g, "\""));
    return tagsArray.map((tag) => `<span class="bg-gray-100 text-gray-800 text-xs font-medium my-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">${capitalizeFirstLetter(tag)}</span>`).join("");
  } catch (error) {
    console.error("Error processing tags:", error);
    return "";
  }
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
        (ingredient, index) =>
          `<li>${index + 1}. ${capitalizeFirstLetter(ingredient)}</li>`
      )
      .join("");
  } catch (error) {
    console.error("Error processing ingredients:", error);
    return "";
  }
};
function getStepsHTML(steps) {
  try {
    const stepsArray = steps
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map((step) => step.trim().replace(/'/g, ""));

    return stepsArray.map((step, index) => `   
      <div class="flex flex-col my-2">
                       
      <span class="text-base font-semibold text-black dark:text-white">Step ${index + 1}:</span>
      <span class="text-base bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-100  rounded-md px-2 py-1 ">${step}</span>   
  </div> 
      `).join("");
  } catch (error) {
    console.error("Error processing steps:", error);
    return "";
  }
}
async function fetchRecipeDetails() {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const recipeId = urlParams.get('id');
    const recipeDetails = document.getElementById('recipe-details');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    const fakeDiv = document.getElementById('fake-div');
    if (recipeId) {
      const apiUrl = `/api/recipes/${recipeId}`;
      const response = await fetch(apiUrl);
      const recipe = await response.json();
      if (response.ok && recipe) {
        loader.style.display = 'none';
        errorMessage.style.display = 'none';
        fakeDiv.style.display = 'none';
        recipeDetails.innerHTML = `
            <div class="racepie-detils my-5 border border-black dark:border-white rounded-xl p-3 md:p-5">

            <h1 class="text-2xl md:text-3xl text-black dark:text-gray-100 font-black py-3  ">${capitalizeFirstLetter(recipe.name)}
            </h1>
            <div class=" description-all flex flex-col space-y-3">
                <span class=" text-lg text-black dark:text-gray-100 font-semibold ">Description:</span>
                <span class=" text-base  text-gray-800 dark:text-gray-400  ">
                ${capitalizeFirstLetter(recipe.description)}
                </span>
            </div>
            <div class=" Time flex  space-x-3 py-3 ">
                <span class=" text-lg text-black dark:text-gray-100 font-semibold ">Time:</span>
                <span class=" text-base  text-gray-800 dark:text-gray-400  ">
                ${recipe.minutes} Minutes
                </span>
            </div>
            <div class="Nutrition flex flex-col space-y-3  ">
                <span class=" text-lg text-black dark:text-gray-100 font-semibold ">Nutrition:</span>
                <span class=" text-base  text-gray-800 dark:text-gray-400  ">
                    <ul class="space-y-3">
                        <li>
                            <span
                                class="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700 dark:bg-green-700 dark:text-green-100">
                                <p class="whitespace-nowrap text-lg md:text-xl">Calories : ${recipe.nutrition.calories}</p>
                            </span>
                        </li>
                        <li>
                            <span
                                class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100">
                                <p class="whitespace-nowrap text-base">Total-fat : ${recipe.nutrition['total-fat']}</p>
                            </span>
                        </li>
                        <li>
                            <span
                                class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100">
                                <p class="whitespace-nowrap text-base">Sugar : ${recipe.nutrition.sugar}</p>
                            </span>
                        </li>
                        <li>
                            <span
                                class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100">
                                <p class="whitespace-nowrap text-base">sodium : ${recipe.nutrition.sodium}</p>
                            </span>
                        </li>
                        <li>
                            <span
                                class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100">
                                <p class="whitespace-nowrap text-base">Protein : ${recipe.nutrition.protein}</p>
                            </span>
                        </li>
                        <li>
                            <span
                                class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100">
                                <p class="whitespace-nowrap text-base">Saturated Fat : ${recipe.nutrition.saturated_fat}</p>
                            </span>
                        </li>
                        <li>
                            <span
                                class="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100">
                                <p class="whitespace-nowrap text-base">Carbohydrates : ${recipe.nutrition.carbohydrates}</p>
                            </span>
                        </li>
                    </ul>
                </span>
            </div>
            <div class=" Ingredients flex flex-col  space-y-3  py-3">
                <span class=" text-lg text-black dark:text-gray-100 font-semibold ">Ingredients:</span>
                <span class=" text-base  text-gray-800 dark:text-gray-400  ">
                    <ul>
                    ${getIngredientsHTML(recipe.ingredients)}
                    </ul>
                </span>
            </div>
            <div class=" Steps flex flex-col  space-y-3  py-3">
                <span class=" text-xl md:text-lg text-black dark:text-gray-100 font-semibold ">Steps:</span>
                <span class=" text-base   space-y-2 ">
                ${getStepsHTML(recipe.steps)}
       
                </span>
            </div>
            <div class=" Tags flex flex-col space-y-3 py-3">
                <span class=" text-lg text-black dark:text-gray-100 font-semibold ">Tags:g:\RecipeSeekr\vercel.json</span>
                <div class=" flex flex-wrap text-base  text-gray-800 dark:text-gray-400 space-y-3 space-x-3  ">
                ${formatTags(recipe.tags)}
                </div>
            </div>
        </div>
          `;
        document.title = capitalizeFirstLetter(recipe.name);
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', capitalizeFirstLetter(recipe.description));
        }
      } else {
        loader.style.display = 'none';
        errorMessage.textContent = 'No recipe found for the provided ID. Please provide a valid ID.';
        errorMessage.style.display = 'block';
      }
    } else {
      loader.style.display = 'none';
      errorMessage.textContent = 'Please provide a valid recipe ID.';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'none';
  fetchRecipeDetails();
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