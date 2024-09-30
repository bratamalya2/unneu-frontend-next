import Image from "next/image";

import Hero from "@/../public/aboutUs-hero.svg";
import HeroMobile from "@/../public/aboutUs-hero-mobile.svg";

export default function HeroSection() {
    return <>
        <section className="w-full lg:h-[700px] hidden lg:flex flex-row flex-nowrap items-center justify-between pl-[5%]">
            <aside className="lg:w-[40%] xl:w-[50%] 2xl:w-[40%] h-full">
                <p className="mt-[30px]">Home / About us</p>
                <p className="mt-[60px] lg:text-3xl font-semibold">ABOUT US</p>
                <p className="mt-[20px] text-[15px] xl:text-lg">
                    <span className="font-semibold text-[#FE9135]">Unneu</span> is a re-commerce platform offering a marketplace for pre-owned sarees. Indian women an list their branded or unbranded sarees for resale or rental, generating creating a new income stream.
                </p>
                <p className="mt-[30px] text-[15px] xl:text-lg">
                    We aim to empowers individuals to become micro-entrepreneurs, fulfilling their dreams through zero-investment sales of personal inventory transforming personal assets into profit streams. Simultaneously, it caters to saree enthusiasts seeking affordable daily luxury.
                </p>
                <p className="mt-[30px] text-[15px] xl:text-lg">
                    This business is committed to fostering a circular economy by addressing economic, social, cultural, and environmental sustainability.
                </p>
            </aside>
            <aside className="relative z-0 lg:w-[40%] xl:w-[30%] 2xl:w-[40%] h-full bg-[#FE9135]">
                <aside className="absolute lg:w-[500px] lg:h-[400px] bg-white z-10 lg:top-[118px] lg:right-[20%] xl:right-[30%] 2xl:right-[45%] rounded-[24px] flex flex-row flex-nowrap items-center justify-center">
                    <Image src={Hero} alt="hero" className="w-[95%] h-[95%] rounded-[24px]" />
                </aside>
            </aside>
        </section >
        <p className="px-[5%] lg:hidden text-sm mt-[30px]">Home / About us</p>
        <p className="px-[5%] lg:hidden mt-[30px] text-xl font-semibold">ABOUT US</p>
        <section className="relative mt-[30px] w-full h-fit flex lg:hidden flex-col flex-nowrap">
            <aside className="absolute w-[55%] h-[390px] top-0 right-0 bg-[#FE9135]">
                <aside className="absolute w-[85vw] h-[237px] bg-white z-10 top-[70px] right-[18%] rounded-[12px] flex flex-row flex-nowrap items-center justify-center">
                    <Image src={HeroMobile} alt="hero" className="h-[80%] rounded-[12px]" />
                </aside>
            </aside>
            <aside className="mt-[422px] px-[5%]">
                <p className="mt-[20px] text-[15px]">
                    <span className="font-semibold text-[#FE9135]">Unneu</span> is a re-commerce platform offering a marketplace for pre-owned sarees. Indian women an list their branded or unbranded sarees for resale or rental, generating creating a new income stream.
                </p>
                <p className="mt-[30px] text-[15px]">
                    We aim to empowers individuals to become micro-entrepreneurs, fulfilling their dreams through zero-investment sales of personal inventory transforming personal assets into profit streams. Simultaneously, it caters to saree enthusiasts seeking affordable daily luxury.
                </p>
                <p className="mt-[30px] text-[15px]">
                    This business is committed to fostering a circular economy by addressing economic, social, cultural, and environmental sustainability.
                </p>
            </aside>
        </section>
    </>
}