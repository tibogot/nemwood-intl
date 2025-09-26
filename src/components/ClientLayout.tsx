"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation8";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition4";
import PageLoader from "@/components/PageLoader2";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showLoader, setShowLoader] = useState(false); // Start with false
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    // Show loader on every page refresh/initial load
    setShowLoader(true);

    // Add loading class to body immediately
    document.body.classList.add("page-loader-active");

    // DON'T remove the CSS overlay here - let PageLoader handle it when ready
  }, []);

  const handlePageLoaderReady = () => {
    // Remove the CSS overlay only when PageLoader is covering the page
    document.documentElement.classList.add("page-loader-ready");
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setIsContentLoaded(true);

    // Remove loading class and add content loaded class
    document.body.classList.remove("page-loader-active");
    document.body.classList.add("content-loaded");

    // Add global flag that PageLoader is complete
    document.documentElement.classList.add("page-loader-complete");

    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent("pageLoaderComplete"));
  };

  return (
    <ThemeProvider>
      {showLoader && (
        <PageLoader
          onComplete={handleLoaderComplete}
          onReady={handlePageLoaderReady}
        />
      )}

      <PageTransition>
        <LenisProvider>
          <ScrollToTop />
          <Navigation />
          <main className="">{children}</main>
          <Footer />
        </LenisProvider>
      </PageTransition>
    </ThemeProvider>
  );
}
