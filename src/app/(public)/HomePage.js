"use client";

import { useEffect, useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import FUniversities from "./Components/Funiversities";
import Session from "./Components/Session";
import Instructors from "./Components/Instructors";
import Flyer from "./Components/Flyer";
import Upcoming from "./Components/Upcoming";
import Subscription from "./Components/Subcription";
// import ConfirmSubscription from "@/components/ConfirmSubscription";
import Community from "./Components/Community";
import SupportTeam from "./Components/SupportTeam";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  // initial hidden the header and appeard as scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {scrolled && <Header />}
      <main>
        <Hero />
        <section className="mt-20 text-center px-4">
          <hr className="border-t border-gray-500 mb-10 w-4/4 mx-auto" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Uinversities
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl-mx-auto text-sm md:text-base">
            Trusted by world-class institutions and educators, helping studenets
            achieve their academic goals daily.
          </p>
          <FUniversities />
          <hr className="border-t border-gray-500 mb-10 w-4/4 mx-auto" />
        </section>
        <Session />
        <Instructors />
        <Flyer />
        <Upcoming />
        <Subscription />
        {/* <ConfirmSubscription /> */}
        <Community />
        <SupportTeam />
      </main>
      <Footer />
    </>
  );
}
