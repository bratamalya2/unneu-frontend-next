"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Seller from "./seller";

import RightDarkArrow from "@/../public/dark arrow.svg"; //only arrow
import LeftDarkArrow from "@/../public/left dark arrow.svg";
import LeftLightArrow from "@/../public/light arrow.svg"; //only arrow
import RightLightArrow from "@/../public/right light arrow.svg";
import Illustration from "@/../public/seller-illustration.svg";
import MobileIllustration from "@/../public/seller-illustration-mobile.svg";

export default function TopSellers({ top10Sellers }) {
    const [scrollAmount, setScrollAmount] = useState(0);
    const [scrollContainer, setScrollContainer] = useState(null);

    const scrollLeft = () => {
        scrollContainer.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
        setScrollAmount(curr => curr - 200);
    };

    const scrollRight = () => {
        scrollContainer.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
        setScrollAmount(curr => curr + 200);
    };

    useEffect(() => {
        setScrollContainer(document.getElementById("scroll-container-buyer-home-top-seller"));
    }, []);

    return <section className="relative w-full bg-[#F1EFEF] mb-[20px] lg:mb-[60px]" id="top-sellers">
        <Image src={Illustration} alt="bg" className="hidden lg:block absolute w-full h-full top-0 left-0" />
        <Image src={MobileIllustration} alt="bg" className="lg:hidden absolute w-full h-full top-0 left-0" />
        <div className="px-[5%] pt-[30px] px-[10%]">
            <p className="text-[#3B3333] font-medium text-2xl lg:text-4xl">Explore <span className="font-semibold text-[#FE9135]">Seller Store</span></p>
            <p className="text-[#3B3333] text-sm lg:text-[17px]">Explore sellers tailored to your needs.</p>
        </div>
        <section className="relative z-0 overflow-y-hidden whitespace-nowrap overflow-x-auto lg:overflow-x-hidden custom-horizontal-scroll-with-btns w-full px-[5%] pt-[30px] pb-[50px]" id="scroll-container-buyer-home-top-seller">
            {
                top10Sellers.map((seller, index) => <Seller seller={seller} key={index} index={index} />)
            }
        </section>
        {
            scrollAmount === 0 ? (
                <div className="absolute z-10 top-[50%] left-[3vw] bg-[#FFFFFF] border border-neutral-600 rounded-[100%] w-[50px] h-[50px] hidden lg:flex flex-row flex-nowrap items-center justify-center">
                    <Image src={LeftLightArrow} alt="left-arrow" className="w-[25px] h-[25px]" />
                </div>
            ) : (
                <Image src={LeftDarkArrow} alt="left-arrow" className="hidden lg:block absolute z-10 top-[50%] left-[3vw] w-[50px] h-[50px] hover:cursor-pointer" onClick={scrollLeft} />
            )
        }
        {
            scrollContainer && (scrollAmount + scrollContainer.clientWidth >= scrollContainer.scrollWidth ? (
                <Image src={RightLightArrow} alt="right-arrow" className="hidden lg:block absolute z-10 top-[50%] right-[3vw] w-[50px] h-[50px]" />
            ) : (
                <div className="absolute z-10 top-[50%] right-[3vw] bg-[#FFFFFF] border border-neutral-600 rounded-[100%] w-[50px] h-[50px] hidden lg:flex flex-row flex-nowrap items-center justify-center hover:cursor-pointer" onClick={scrollRight}>
                    <Image src={RightDarkArrow} alt="right-arrow" className="w-[25px] h-[25px]" />
                </div>
            ))
        }
    </section>
}