"use client";

import ServiceContactSection from "@/components/ServiceContactSection";
import ServiceNavigation from "@/components/ServiceNavigation";
import { usePathname } from "next/navigation";
// import StickyStackScroll from "@/components/StickyStackScroll5";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Only show contact section for individual service pages, not the main services page
  const shouldShowContact =
    pathname !== null &&
    pathname !== "/services" &&
    pathname.startsWith("/services/");

  return (
    <>
      {children}
      {/* {shouldShowContact && <ServiceContactSection />} */}
      {/* {shouldShowContact && <StickyStackScroll />} */}
      {shouldShowContact && <ServiceNavigation />}
    </>
  );
}
