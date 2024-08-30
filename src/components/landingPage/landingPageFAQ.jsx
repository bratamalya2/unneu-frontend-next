"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import LandingPageResellersFAQ from "./landingPageResellersFAQ";
import LandingPageSellersFAQ from "./landingPageSellerFAQ";
import LandingPageBuyerFAQ from "./landingPageBuyerFAQ";

import ExpandButton from "@/../public/accordion-button.png";

import "@/styles/landingPageFAQ.css";

export default function LandingPageFAQ() {
    const [isResellerVisible, setIsResellerVisible] = useState(false);
    const [isSellerVisible, setIsSellerVisible] = useState(false);
    const [isBuyerVisible, setIsBuyerVisible] = useState(false);

    useEffect(() => {
        if (isResellerVisible) {
            if (window.innerWidth < 500)
                document.getElementById("faq-section").style.minHeight = "1300px";
            else
                document.getElementById("faq-section").style.minHeight = "1200px";
        }
        else if (isSellerVisible) {
            if (window.innerWidth < 500)
                document.getElementById("faq-section").style.minHeight = "900px";
            else
                document.getElementById("faq-section").style.minHeight = "800px";
        }
        else if (isBuyerVisible) {
            if (window.innerWidth < 500)
                document.getElementById("faq-section").style.minHeight = "1150px";
            else
                document.getElementById("faq-section").style.minHeight = "1040px";
        }
        else {
            if (window.innerWidth < 500)
                document.getElementById("faq-section").style.minHeight = "600px";
            else
                document.getElementById("faq-section").style.minHeight = "600px";
        }
    }, [isResellerVisible, isSellerVisible, isBuyerVisible]);

    return <section id="faq-section" className="relative px-[10%] min-h-[550px] sm:min-h-[600px] md:min-h-[650px]">
        <p className="text-[#2D2D2D] text-3xl sm:text-4xl md:text-[42px] font-bold">
            Frequently Asked <span className="text-[#FE9135]">Question</span>
        </p>
        <p className="sm:text-[18px] mt-[30px]">
            Question commonly asked by Buyers and sellers.
        </p>
        <div className="mt-[50px] h-[65px] bg-[#FBFBFB] rounded-[24px] flex justify-between items-center py-[10px] px-[36px]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            <div className="font-medium text-lg sm:text-2xl">For Resellers</div>
            <Image src={ExpandButton} alt="expand" className="hover:cursor-pointer w-[40px] h-[40px]" onClick={() => {
                setIsResellerVisible((curr) => !curr);
                setIsSellerVisible(false);
                setIsBuyerVisible(false);
            }} />
        </div>
        <LandingPageResellersFAQ isVisible={isResellerVisible} />
        <div className="mt-[32px] h-[65px] bg-[#FBFBFB] rounded-[24px] flex justify-between items-center py-[10px] px-[36px]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            <div className="font-medium text-lg sm:text-2xl">For seller representatives</div>
            <Image src={ExpandButton} alt="expand" className="hover:cursor-pointer w-[40px] h-[40px]" onClick={() => {
                setIsSellerVisible((curr) => !curr);
                setIsBuyerVisible(false);
                setIsResellerVisible(false);
            }} />
        </div>
        <LandingPageSellersFAQ isVisible={isSellerVisible} />
        <div className="mt-[32px] h-[65px] bg-[#FBFBFB] rounded-[24px] flex justify-between items-center py-[10px] px-[36px]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            <div className="font-medium text-lg sm:text-2xl">For Buyers</div>
            <Image src={ExpandButton} alt="expand" className="hover:cursor-pointer w-[40px] h-[40px]" onClick={() => {
                setIsBuyerVisible((curr) => !curr);
                setIsResellerVisible(false);
                setIsSellerVisible(false);
            }} />
        </div>
        <LandingPageBuyerFAQ isVisible={isBuyerVisible} />
    </section>
}