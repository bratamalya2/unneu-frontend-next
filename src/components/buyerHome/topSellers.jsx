"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Seller from "./seller";

import RightDarkArrow from "@/../public/dark arrow.svg"; //only arrow
import LeftDarkArrow from "@/../public/left dark arrow.svg";
import LeftLightArrow from "@/../public/light arrow.svg"; //only arrow
import RightLightArrow from "@/../public/right light arrow.svg";
import Illustration from "@/../public/seller-illustration.svg";

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

    return <section className="relative w-full bg-[#F1EFEF]">
        <Image src={Illustration} alt="bg" className="absolute w-full h-full top-0 left-0" />
        <div className="pt-[30px] px-[10%]">
            <p className="text-[#3B3333] font-medium text-4xl">Explore <span className="text-[#FE9135]">Seller Store</span></p>
            <p className="text-[#3B3333] text-[17px]">Explore sellers tailored to your needs</p>
        </div>
        <section className="relative z-0 overflow-y-hidden whitespace-nowrap overflow-x-hidden custom-horizontal-scroll-with-btns w-full px-[10%] pt-[30px] pb-[60px]" id="scroll-container-buyer-home-top-seller">
            {
                top10Sellers.map((seller, index) => <Seller seller={seller} key={index} index={index} />)
            }
        </section>
        {
            scrollAmount === 0 ? (
                <div className="relative z-10 top-[-250px] left-5 border border-neutral-600 rounded-[100%] w-[50px] h-[50px] flex flex-row flex-nowrap items-center justify-center">
                    <Image src={LeftLightArrow} alt="left-arrow" className="w-[25px] h-[25px]" />
                </div>
            ) : (
                <Image src={LeftDarkArrow} alt="left-arrow" className="relative z-10 top-[-250px] left-5 w-[50px] h-[50px] hover:cursor-pointer" onClick={scrollLeft} />
            )
        }
        {
            scrollContainer && (scrollAmount + scrollContainer.clientWidth >= scrollContainer.scrollWidth ? (
                <Image src={RightLightArrow} alt="right-arrow" className="relative z-10 top-[-300px] left-[95vw] w-[50px] h-[50px]" />
            ) : (
                <div className="relative z-10 top-[-300px] left-[95vw] border border-neutral-600 rounded-[100%] w-[50px] h-[50px] flex flex-row flex-nowrap items-center justify-center hover:cursor-pointer" onClick={scrollRight}>
                    <Image src={RightDarkArrow} alt="right-arrow" className="w-[25px] h-[25px]" />
                </div>
            ))
        }
    </section>
}