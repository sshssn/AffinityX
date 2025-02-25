"use client";

import { HeroSection } from "@/components/blocks/hero-section-dark";

export default function HomeHeroSection() {
  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center -mt-16 sm:-mt-20">
      <HeroSection
        title="Enterprise Software Solutions"
        subtitle={{
          regular: "Transform your business with ",
          gradient: "custom software solutions",
        }}
        description="We build scalable, custom software solutions that drive innovation and growth. From SaaS platforms to enterprise applications, we deliver technology that transforms businesses."
        ctaText="Start Your Project"
        ctaHref="/contact"
        video={{
          src: "/hero.mp4",
          poster: "/images/dashboard-light.png",
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />
    </div>
  );
}
