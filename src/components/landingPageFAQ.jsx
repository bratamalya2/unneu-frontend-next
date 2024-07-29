"use client";

import { useState } from "react";
import Image from "next/image";

import LandingPageResellersFAQ from "./landingPageResellersFAQ";

import ExpandButton from "@/../public/accordion-button.png";

export default function LandingPageFAQ() {
    const [isResellerVisible, setIsResellerVisible] = useState(false);
    const [isSellerVisible, setIsSellerVisible] = useState(false);
    const [isBuyerVisible, setIsBuyerVisible] = useState(false);

    return <section className="relative top-[1380px] px-[10%] min-h-[600px]">
        <p className="text-[#2D2D2D] text-[42px] font-bold">
            Frequently Asked <span className="text-[#FE9135]">Question</span>
        </p>
        <p className="text-[18px] mt-[30px]">
            Question commonly asked by Buyers and sellers
        </p>
        <div className="mt-[50px] h-[65px] bg-[#FBFBFB] rounded-[24px] flex justify-between items-center px-[36px]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            <div className="font-medium text-2xl">For Resellers</div>
            <Image src={ExpandButton} alt="expand" className="hover:cursor-pointer w-[40px] h-[40px]" onClick={() => {
                setIsResellerVisible((curr) => !curr);
            }} />
        </div>
        {/* <LandingPageResellersFAQ isVisible={isResellerVisible} /> */}
        <div className="mt-[32px] h-[65px] bg-[#FBFBFB] rounded-[24px] flex justify-between items-center px-[36px]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            <div className="font-medium text-2xl">For seller representatives</div>
            <Image src={ExpandButton} alt="expand" className="hover:cursor-pointer w-[40px] h-[40px]" onClick={() => {
                setIsSellerVisible((curr) => !curr);
            }} />
        </div>
        <div className="mt-[32px] h-[65px] bg-[#FBFBFB] rounded-[24px] flex justify-between items-center px-[36px]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            <div className="font-medium text-2xl">For Buyers</div>
            <Image src={ExpandButton} alt="expand" className="hover:cursor-pointer w-[40px] h-[40px]" onClick={() => {
                setIsBuyerVisible((curr) => !curr);
            }} />
        </div>
    </section>
}