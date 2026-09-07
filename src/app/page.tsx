import React from "react";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProductProofSection } from "@/components/marketing/ProductProofSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { CoreFeaturesBento } from "@/components/marketing/CoreFeaturesBento";
import { ProductWalkthrough } from "@/components/marketing/ProductWalkthrough";
import { RoleBenefitsSection } from "@/components/marketing/RoleBenefitsSection";
import { UseCasesSection } from "@/components/marketing/UseCasesSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      {/* Section 2: Hero */}
      <HeroSection />

      {/* Section 3: Product Proof */}
      <ProductProofSection />

      {/* Section 4: Problem Statement */}
      <ProblemSection />

      {/* Section 5: How It Works */}
      <HowItWorksSection />

      {/* Section 6: Core Features Bento */}
      <CoreFeaturesBento />

      {/* Section 7: Product Walkthrough */}
      <ProductWalkthrough />

      {/* Section 8: Benefits by Role */}
      <RoleBenefitsSection />

      {/* Section 9: Use Cases */}
      <UseCasesSection />

      {/* Section 10: Pricing */}
      <PricingSection />

      {/* Section 11: Frequently Asked Questions */}
      <FaqSection />

      {/* Section 12: Final Conversion Block */}
      <FinalCtaSection />
    </>
  );
}
