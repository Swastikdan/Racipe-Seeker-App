import React from 'react'

export default function Recipe({ recipes }) {
  return (
    <section>
      <div className="flex flex-col items-start gap-2 text-xl font-bold capitalize sm:text-2xl md:flex-row md:items-center xl:text-3xl">
        <h1>{recipes.name || "No tile found"}</h1>
        {recipes.nutrition && recipes.nutrition[0] && (
          <span className="inline-flex  items-center gap-x-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium  text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 md:text-base">
            {recipes.nutrition[0]} cal
          </span>
        )}
      </div>
      <div className="py-5 ">
        <p className="pb-5 text-sm font-light text-gray-800 dark:text-gray-400 sm:text-base">
          {recipes.description || "Not available"}
        </p>

        <span class="ms-1 inline-flex items-center gap-2 gap-x-1 rounded-full bg-gray-100 px-2 py-1 font-light leading-4 dark:text-gray-900 sm:text-lg">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.1"
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              fill="#323232"
            />
            <path
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#323232"
              stroke-width="2"
            />
            <path
              d="M12 7L12 12"
              stroke="#323232"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 4L20 3"
              stroke="#323232"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="px-2"> {recipes.minutes || 0} minutes</span>
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div class="flex items-center gap-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-utensils-crossed"
          >
            <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
            <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
            <path d="m2.1 21.8 6.4-6.3" />
            <path d="m19 5-7 7" />
          </svg>
          <div>
            <h3 class="font-medium text-gray-800 dark:text-gray-200 sm:text-xl lg:text-2xl">
              Nutrition (Daily Value):
            </h3>
          </div>
        </div>
        <span className="text-[8px] font-light md:text-xs">
          Please note that the Percent Daily Values (% DV) are based on a diet
          of 2000 calories per day. Your Daily Values may be higher or lower
          depending on your calorie needs.
        </span>
        <div className="flex flex-wrap items-center  gap-3">
          {Array.isArray(recipes.nutrition) && recipes.nutrition.length > 0 ? (
            <>
              <span class="inline-flex items-center gap-x-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium capitalize text-blue-800 dark:bg-blue-800/30 dark:text-blue-500  md:text-base">
                Fat : {recipes.nutrition[1] || "Not available"}
              </span>
              <span class="inline-flex items-center gap-x-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium capitalize text-blue-800 dark:bg-blue-800/30 dark:text-blue-500  md:text-base">
                Sugar : {recipes.nutrition[2] || "Not available"}
              </span>
              <span class="inline-flex items-center gap-x-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium capitalize text-blue-800 dark:bg-blue-800/30 dark:text-blue-500  md:text-base">
                Sodium : {recipes.nutrition[3] || "Not available"}
              </span>
              <span class="inline-flex items-center gap-x-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium capitalize text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 md:text-base">
                Protein : {recipes.nutrition[4] || "Not available"}
              </span>
              <span class="inline-flex items-center gap-x-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium capitalize text-blue-800 dark:bg-blue-800/30 dark:text-blue-500  md:text-base">
                Saturated Fat : {recipes.nutrition[5] || "Not available"}
              </span>
              <span class="inline-flex items-center gap-x-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium  text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 md:text-base">
                Carbohydrates : {recipes.nutrition[6] || "Not available"}
              </span>
            </>
          ) : (
            <div>No nutrition information found</div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 py-5">
        <div class="flex items-center gap-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-shopping-basket"
          >
            <path d="m15 11-1 9" />
            <path d="m19 11-4-7" />
            <path d="M2 11h20" />
            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
            <path d="M4.5 15.5h15" />
            <path d="m5 11 4-7" />
            <path d="m9 11 1 9" />
          </svg>
          <div>
            <h3 class="text-sm font-medium text-gray-800 dark:text-gray-200 sm:text-xl lg:text-2xl">
              Ingredients:
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.isArray(recipes.ingredients) &&
          recipes.ingredients.length > 0 ? (
            recipes.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="rounded-xl bg-gray-200 px-3 py-1 font-light capitalize dark:bg-gray-800"
              >
                {ingredient}
              </span>
            ))
          ) : (
            <div>No ingredients found</div>
          )}
        </div>
      </div>

      <div>
        <div class="flex items-center gap-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-route"
          >
            <circle cx="6" cy="19" r="3" />
            <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
            <circle cx="18" cy="5" r="3" />
          </svg>
          <div>
            <h3 class="font-medium text-gray-800 dark:text-gray-200 sm:text-xl lg:text-2xl">
              Steps:
            </h3>
          </div>
        </div>
        <ul className="pt-5">
          {Array.isArray(recipes.steps) && recipes.steps.length > 0 ? (
            recipes.steps.map((step, index) => (
              <li key={index} className="py-2">
                <div className="flex w-full gap-2 rounded-xl bg-gray-100 px-4 py-1.5 text-gray-900 dark:bg-gray-900 dark:text-white">
                  <span class="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-asterisk"
                    >
                      <path d="M12 6v12" />
                      <path d="M17.196 9 6.804 15" />
                      <path d="m6.804 9 10.392 6" />
                    </svg>
                  </span>
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </div>
              </li>
            ))
          ) : (
            <div>No steps found</div>
          )}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 py-10">
        {Array.isArray(recipes.tags) && recipes.tags.length > 0 ? (
          recipes.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-x-1.5 rounded-lg  border border-gray-800 px-3 py-1.5 text-xs text-gray-800 dark:border-gray-200 dark:text-white"
            >
              {tag}
            </span>
          ))
        ) : (
          <div>No tags found</div>
        )}
      </div>
    </section>
  );
}
