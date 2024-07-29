import Image from "next/image";

import HeroImageBackground from "@/../public/hero-image-background.png";
import HeroBackground from "@/../public/hero-background.png";
import HeroForeground from "@/../public/hero-foreground.png";

export default function LandingPageHero() {
    return <section className="relative mt-[24px] h-[829px] z-0">
        <Image src={HeroImageBackground} alt="background-1" className="w-full relative z-0" />
        <Image src={HeroBackground} alt="background-2" className="absolute w-[50%] h-[651px] z-10 right-0 top-0" />
        <Image src={HeroForeground} alt="foreground" className="absolute w-[30%] h-[651px] z-10 right-[25%] top-0" />
        <p className="absolute left-[10%] top-[78px] text-[#363636] font-bold text-[42px] max-w-[35%]">Wardrobes are filled with sarees! Yet, nothing new to wear?</p>
        <p className="absolute left-[10%] top-[303px] text-[#2B2A2A] font-medium text-[22px] max-w-[35%]">Welcome to “ India's First <span className="font-semibold text-[#FE9135]">saree aggregator</span> to buy and sell your pre-owned sarees at a negotiable fee”. </p>
        <button className="absolute left-[10%] top-[443px] text-white text-[18px] px-[16px] py-[22px] rounded-[20px] bg-[#FE9135]">Start Swapping</button>
    </section>
}