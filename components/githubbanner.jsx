"use client";

import React, { useEffect, useState } from "react";

export default function GithubBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const dismissedTime = localStorage.getItem("githubBannerDismissed");
    const currentTime = new Date().getTime();
    const twoDays = 1 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
    if (!dismissedTime || currentTime - dismissedTime > twoDays) {
      setShowBanner(true);
    }
  }, []);

  const dismissBanner = () => {
    localStorage.setItem("githubBannerDismissed", new Date().getTime());
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="hs-removing:-translate-y-full bg-blue-600 github-banner">
      <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 mx-auto items-center">
        <div className="flex items-center">
          <a
            href="https://github.com/Swastikdan/recipe-api"
            target="_blank"
            className="text-white hover:underline underline-offset-4"
          >
            Enjoy This? Give it a star on GitHub
          </a>

          <div className="ps-3 ms-auto">
            <button
              type="button"
              className="inline-flex rounded-lg p-1.5 text-white/[.8] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              onClick={dismissBanner}
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="flex-shrink-0 size-6"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
