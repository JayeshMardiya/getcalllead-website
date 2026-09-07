import React from "react";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { CoreFeaturesBento } from "@/components/marketing/CoreFeaturesBento";
import { RoleBenefitsSection } from "@/components/marketing/RoleBenefitsSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: Value proposition, Request a Demo CTA, Conceptual Workflow */}
      <HeroSection />

      {/* 2. Phone-sales problem: Forgotten follow-ups, unclear ownership, limited visibility */}
      <ProblemSection />

      {/* 3. Three-step workflow: Intake & qualify, Call & record outcome, Schedule next action */}
      <HowItWorksSection />

      {/* 4. Core CRM Capabilities: Structured intake, pipeline, calendar, ownership */}
      <CoreFeaturesBento />

      {/* 5. Reps and managers: Role-specific value & operational clarity */}
      <RoleBenefitsSection />

      {/* 6. Authoritative Pricing: Policy V3, Interactive seat calculator (1-25 seats), exact totals & savings */}
      <PricingSection />

      {/* 7. Security and FAQ: Workspace scoping, HTTPS, Native dialler, Store availability */}
      <FaqSection />

      {/* 8. Final CTA: Request a Demo, verified support contact */}
      <FinalCtaSection />
    </>
  );
}
