import Image from "next/image";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import RecepiesPreview from "@/components/recepiespreview";
import GithubBanner from "@/components/githubbanner";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />

  <GithubBanner />
      <main className="">
        <section className="relative overflow-hidden before:absolute before:top-1/2 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/component/hyperdrive.svg')] before:bg-no-repeat before:bg-center before:w-full before:h-96 before:-z-[1] before:transform before:-translate-y-1/2 before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/component-dark/hyperdrive.svg')]">
          <Hero />
        </section>
        <section className="max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <h1 className="text-xl text-gray-800 font-bold sm:text-2xl lg:leading-tight dark:text-gray-200 px-4 decoration-2 underline underline-offset-8  ">
            Random Recipes-
          </h1>

          <RecepiesPreview />
        </section>
      </main>
      <Footer />
    </>
  );
}
