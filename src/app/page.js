"use client";

import LandingPageHero from "@/components/landingPageHero";
import LandingPageNavSection from "@/components/landingPageNavSection";
import LandingPageSeller from "@/components/landingPageSeller";
import LandingPageBuyer from "@/components/landingPageBuyer";
import LandingPageHowItWorks from "@/components/landingPageHowItWorks";
import LandingPageFAQ from "@/components/landingPageFAQ";
import LandingPageNewsletter from "@/components/landingPageNewsletter";

export default function Home() {
  return (
    <main className="relative">
      <LandingPageHero />
      <LandingPageNavSection />
      <article className="my-[45px] md:my-[86px] lg:max-w-[64%] xl:max-w-[50%] 2xl:max-w-[42%] mx-auto flex flex-col items-center">
        <p className="font-bold text-2xl sm:text-4xl text-center sm:leading-[64px]">Economic empowerment:</p>
        <p className="font-bold text-2xl sm:text-4xl text-center sm:leading-[64px] text-[#FE9135]">Resell. Rent</p>
        <p className="my-[32px] sm:text-[18px] text-center px-5 sm:px-0">
          Set up your social store with us and unleash the business woman within. Tell a story each time you sell your saree.
        </p>
        <button className="max-w-[168px] py-[12px] sm:py-[16px] px-[52px] sm:px-[32px] rounded-[12px] sm:rounded-[20px] bg-[#FBC246] text-[18px] font-medium hover:bg-[#FE9135]">Explore</button>
      </article>
      <LandingPageSeller />
      <LandingPageBuyer />
      <LandingPageHowItWorks />
      <LandingPageFAQ />
      <LandingPageNewsletter />
    </main>
  );
}
