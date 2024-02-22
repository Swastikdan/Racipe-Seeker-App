import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "@/components/themeswitcher";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full border-b-[1px] border-primary ">
        <nav
          className=" w-full max-w-screen-xl items-center mx-auto px-5 py-5 flex flex-wrap basis-full justify-between "
          aria-label="Global"
        >
          <Link
            className="sm:order-1 flex-none text-xl md:text-2xl font-semibold dark:text-white flex items-center gap-x-2"
            href="/"
          >
            <Image src="/icon.svg" alt="logo" width={40} height={30} />
            <span>RecipeDB</span>
          </Link>
          <div className="sm:order-3 flex items-center gap-x-2">
            <Link href="/api" className="mx-5">
              <Button className="px-6 uppercase">api</Button>
            </Link>
            <ThemeSwitch />
          </div>
        </nav>
      </header>
    </>
  );
}
