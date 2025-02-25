'use client';

import { HeroSection } from "./ui/code";

export default function Hero() {
  return (
    <HeroSection
      title="Welcome to Affinity Labs"
      subtitle={{
        regular: "Building the future with ",
        gradient: "cutting-edge technology"
      }}
      description="We combine innovation with expertise to deliver exceptional digital solutions that transform ideas into powerful experiences."
      ctaText="Get Started"
      ctaHref="#contact"
      gridOptions={{
        angle: 65,
        cellSize: 60,
        opacity: 0.3,
        lightLineColor: "rgba(59, 130, 246, 0.2)",
        darkLineColor: "rgba(59, 130, 246, 0.2)"
      }}
      bottomImage={{
        light: "/globe.svg",
        dark: "/globe.svg"
      }}
    />
  );
}