"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import NewArrivals from "@/../public/buyer-home-new-arrival.jpg";
import FestiveWear from "@/../public/buyer-home-festive-wear.jpg";
import BridalWear from "@/../public/buyer-home-bridal-wear.jpg";
import PartyWear from "@/../public/buyer-home-party-wear.jpg";
import CasualWear from "@/../public/buyer-home-casual-wear.png";
import DailyWear from "@/../public/buyer-home-daily-wear.jpg";
import RightDarkArrow from "@/../public/dark arrow.svg"; //only arrow
import LeftDarkArrow from "@/../public/left dark arrow.svg";
import LeftLightArrow from "@/../public/light arrow.svg"; //only arrow
import RightLightArrow from "@/../public/right light arrow.svg";

export default function Categories() {
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
        setScrollContainer(document.getElementById("scroll-container-buyer-home"));
    }, []);

    return <>
        <section className="relative mt-[80px] h-[380px] overflow-y-hidden whitespace-nowrap overflow-x-hidden pl-[10%] custom-horizontal-scroll-with-btns z-0" id="scroll-container-buyer-home">
            <section className="inline-block relative lg:w-[30%] xl:w-[25%] 2xl:w-[22%] h-full rounded-[24px]">
                <Image src={NewArrivals} alt="new-arrivals" className="absolute w-full h-full z-0 rounded-[24px]" />
                <button className="absolute w-[60%] left-[20%] bottom-5 py-[12px] px-[34px] font-bold rounded-[16px]" style={{
                    background: "linear-gradient(90deg, #F0E7DE 0%, #FBC246 100%)"
                }}>
                    New Arrivals
                </button>
            </section>
            <section className="inline-block ml-[32px] relative lg:w-[30%] xl:w-[25%] 2xl:w-[22%] h-full rounded-[24px]">
                <Image src={FestiveWear} alt="festive-wear" className="absolute w-full h-full z-0 rounded-[24px]" />
                <button className="absolute w-[60%] left-[20%] bottom-5 py-[12px] px-[34px] font-bold rounded-[16px]" style={{
                    background: "linear-gradient(90deg, #F0E7DE 0%, #FBC246 100%)"
                }}>
                    Festive Wear
                </button>
            </section>
            <section className="inline-block ml-[32px] relative lg:w-[30%] xl:w-[25%] 2xl:w-[22%] h-full rounded-[24px]">
                <Image src={BridalWear} alt="bridal-wear" className="absolute w-full h-full z-0 rounded-[24px]" />
                <button className="absolute w-[60%] left-[20%] bottom-5 py-[12px] px-[34px] font-bold rounded-[16px]" style={{
                    background: "linear-gradient(90deg, #F0E7DE 0%, #FBC246 100%)"
                }}>
                    Bridal Wear
                </button>
            </section>
            <section className="inline-block ml-[32px] relative lg:w-[30%] xl:w-[25%] 2xl:w-[22%] h-full rounded-[24px]">
                <Image src={PartyWear} alt="party-wear" className="absolute w-full h-full z-0 rounded-[24px]" />
                <button className="absolute w-[60%] left-[20%] bottom-5 py-[12px] px-[34px] font-bold rounded-[16px]" style={{
                    background: "linear-gradient(90deg, #F0E7DE 0%, #FBC246 100%)"
                }}>
                    Party Wear
                </button>
            </section>
            <section className="inline-block ml-[32px] relative lg:w-[30%] xl:w-[25%] 2xl:w-[22%] h-full rounded-[24px]">
                <Image src={CasualWear} alt="casual-wear" className="absolute w-full h-full z-0 rounded-[24px]" />
                <button className="absolute w-[60%] left-[20%] bottom-5 py-[12px] px-[34px] font-bold rounded-[16px]" style={{
                    background: "linear-gradient(90deg, #F0E7DE 0%, #FBC246 100%)"
                }}>
                    Casual Wear
                </button>
            </section>
            <section className="inline-block ml-[32px] relative lg:w-[30%] xl:w-[25%] 2xl:w-[22%] h-full rounded-[24px]">
                <Image src={DailyWear} alt="daily-wear" className="absolute w-full h-full z-0 rounded-[24px]" />
                <button className="absolute w-[60%] left-[20%] bottom-5 py-[12px] px-[34px] font-bold rounded-[16px]" style={{
                    background: "linear-gradient(90deg, #F0E7DE 0%, #FBC246 100%)"
                }}>
                    Daily Wear
                </button>
            </section>
        </section>
        <div className="w-fit absolute right-5 flex flex-row flex-nowrap items-center gap-x-3 mt-[30px] mb-[60px]">
            {
                scrollAmount === 0 ? (
                    <div className="border border-neutral-600 rounded-[100%] w-[50px] h-[50px] flex flex-row flex-nowrap items-center justify-center">
                        <Image src={LeftLightArrow} alt="left-arrow" className="w-[25px] h-[25px]" />
                    </div>
                ) : (
                    <Image src={LeftDarkArrow} alt="left-arrow" className="w-[50px] h-[50px] hover:cursor-pointer" onClick={scrollLeft} />
                )
            }
            {
                scrollContainer && (scrollAmount + scrollContainer.clientWidth >= scrollContainer.scrollWidth ? (
                    <Image src={RightLightArrow} alt="right-arrow" className="w-[50px] h-[50px]" />
                ) : (
                    <div className="border border-neutral-600 rounded-[100%] w-[50px] h-[50px] flex flex-row flex-nowrap items-center justify-center hover:cursor-pointer" onClick={scrollRight}>
                        <Image src={RightDarkArrow} alt="right-arrow" className="w-[25px] h-[25px]" />
                    </div>
                ))
            }
        </div>
    </>
}