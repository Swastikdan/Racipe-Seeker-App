"use client";
import SearchForm from "@/components/searchform";
import SearchResult from "@/components/searchresult";
import { Suspense } from "react";
export default function page() {
  

  return (
    <>
    <main className="min-h-screen">
   <SearchForm />
    <Suspense>
   <SearchResult /></Suspense></main>
    </>
  );
}
