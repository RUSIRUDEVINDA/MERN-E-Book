import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";

const LandingPage = () => {
  return (
    <div className="mb-[100vh]">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
