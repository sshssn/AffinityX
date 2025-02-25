import HeroSection from "@/components/homepage/hero-section";
import { WhyChooseSection } from "@/components/homepage/why-choose-section";
import { FAQSection } from "@/components/homepage/faq-section";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { TechStackSection } from "@/components/homepage/tech-stack-section";
import { TechStackFlow } from "@/components/homepage/tech-stack-flow";
import { OurServicesSection } from "@/components/homepage/our-services-section";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <div className="space-y-24">
        <WhyChooseSection />
        <TechStackSection />
        <OurServicesSection />
        <TechStackFlow />
        <FAQSection />
      </div>
    </PageWrapper>
  );
}
