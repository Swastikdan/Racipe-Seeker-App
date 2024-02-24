
import Hero from "@/components/hero";
import RecepiesPreview from "@/components/recepiespreview";

export const metadata = {
  title: "Recipe DB || An OpenSource Recipe Database",
  description:
    "Recipe DB is an open web application, crafted with Node.js and Express.js, that provides access to a diverse database of recipes from around the world. It leverages MongoDB for efficient storage and retrieval of recipe data.",
};

export default function Home() {
  return (
    <>


      
      <main className="">
        <section className="relative overflow-hidden before:absolute before:start-1/2 before:top-1/2 before:-z-[1] before:h-96 before:w-full before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:bg-[url('https://preline.co/assets/svg/component/hyperdrive.svg')] before:bg-center before:bg-no-repeat dark:before:bg-[url('https://preline.co/assets/svg/component-dark/hyperdrive.svg')]">
          <Hero />
        </section>

        {/* <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          ss
        </section> */}

        <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <h1 className="px-4 text-xl font-bold text-gray-800 underline decoration-2 underline-offset-8 dark:text-gray-200 sm:text-2xl lg:leading-tight  ">
            Random Recipes-
          </h1>

          <RecepiesPreview />
        </section>
      </main>
 
    </>
  );
}
