"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "react-bootstrap/Modal";
import { Libre_Baskerville } from "next/font/google";

import { useUnneuDataStore } from "@/store/store";

import VerticalLeafLeft from "@/../public/vertical-leaf-left.png";
import VerticalLeafRight from "@/../public/vertical-leaf-right.png";
import Close from "@/../public/close.png";

import LandingPageHero from "@/components/landingPage/landingPageHero";
import LandingPageNavSection from "@/components/landingPage/landingPageNavSection";
import LandingPageSeller from "@/components/landingPage/landingPageSeller";
import LandingPageBuyer from "@/components/landingPage/landingPageBuyer";
import LandingPageHowItWorks from "@/components/landingPage/landingPageHowItWorks";
import LandingPageFAQ from "@/components/landingPage/landingPageFAQ";
import LandingPageNewsletter from "@/components/landingPage/landingPageNewsletter";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const router = useRouter();
  const setShowSignUp = useUnneuDataStore(store => store.setShowSignUp);
  const [showRentalPopup, setShowRentalPopup] = useState(false);

  const handleCloseRentalPopup = () => {
    setShowRentalPopup(false);
  }

  const handleScroll = () => {
    setShowSignUp(true);
    window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="relative lg:top-[120px]">
      <LandingPageHero />
      <LandingPageNavSection setShowRentalPopup={setShowRentalPopup} />
      <article className="relative z-0 my-[45px] xl:my-[35px] md:my-[56px] lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[75%] mx-auto flex flex-col items-center">
        <p className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:leading-[64px] lg:leading-[90px]">Economic empowerment:</p>
        <p className="font-bold text-2xl sm:text-4xl lg:text-5xl text-center sm:leading-[64px] lg:leading-[80px] text-[#FE9135]">Resell. Rent</p>
        <p className="my-[32px] sm:text-[18px] lg:text-xl text-center px-5 sm:px-0">
          Set up your social store with us and unleash the business woman within. Tell a story each time you sell your saree.
        </p>
        <button className="max-w-[168px] py-[12px] sm:py-[16px] px-[52px] sm:px-[32px] rounded-[12px] sm:rounded-[20px] bg-[#FBC246] text-[18px] font-medium hover:bg-[#FE9135]" onClick={() => {
          router.push("/seller/home");
        }}>Explore</button>
      </article>
      <LandingPageSeller />
      <LandingPageBuyer />
      <LandingPageHowItWorks />
      <LandingPageFAQ />
      <LandingPageNewsletter />
      <Modal show={showRentalPopup} onHide={handleCloseRentalPopup} className="max-w-[90%] sm:max-w-[60%] lg:max-w-[50%] xl:max-w-[35%] left-[5%] sm:left-[20%] lg:left-[25%] xl:left-[32.5%] top-[200px]">
        <Modal.Body className="relative flex flex-col items-center h-[200px] overflow-hidden">
          <Image src={Close} alt="close" className="absolute top-4 right-4 w-[14px] lg:w-[18px] h-[14px] lg:h-[18px] hover:cursor-pointer" onClick={handleCloseRentalPopup} />
          <p className={`${lbFont.className} text-[26px] lg:text-4xl`}>Rental Services</p>
          <p className="mt-[24px] lg:mt-[38px] text-sm lg:text-base leading-7 w-[90%] left-[5%]">
            For rental services, please contact us via email at <span className="text-[#FE9135] font-semibold">contact@unneu.com</span> or call us at <span className="text-[#FE9135] font-semibold">+91-9748083434</span>
          </p>
          <Image src={VerticalLeafRight} alt="leaf" className="absolute bottom-0 left-0" />
          <Image src={VerticalLeafLeft} alt="leaf" className="absolute bottom-0 right-0" />
        </Modal.Body>
      </Modal>
    </main>
  );
}
