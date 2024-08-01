import Image from "next/image";

import HeroImageBackground from "@/../public/hero-image-background.png";
import HeroBackground from "@/../public/hero-background.png";
import HeroForeground from "@/../public/hero-foreground.png";

export default function LandingPageHero() {
    return <section className="relative mt-[24px] lg:h-[650px] xl:h-[750px] 2xl:h-[829px] z-0">
        <Image src={HeroImageBackground} alt="background-1" className="w-full h-full relative z-0" />
        <Image src={HeroBackground} alt="background-2" className="absolute lg:w-[45%] 2xl:w-[50%] lg:h-full xl:h-full 2xl:h-[821px] z-10 right-0 top-0" />
        <Image src={HeroForeground} alt="foreground" className="absolute lg:w-[29%] xl:w-[32%] 2xl:w-[30%] lg:h-[550px] xl:h-[720px] 2xl:h-[705px] z-10 lg:right-[22%] xl:right-[17%] 2xl:right-[25%] lg:top-[60px] top-20" />
        <p className="absolute 2xl:left-[14%] xl:left-[12%] lg:left-[6%] top-[78px] text-[#363636] lg:font-semibold xl:font-bold lg:text-[36px] xl:text-[42px] lg:max-w-[44%] xl:max-w-[38%] 2xl:max-w-[30%]">Wardrobes are filled with sarees! Yet, nothing new to wear?</p>
        <p className="absolute 2xl:left-[14%] xl:left-[12%] lg:left-[6%] top-[303px] text-[#2B2A2A] font-medium lg:text-lg xl:text-[22px] lg:max-w-[46%] xl:max-w-[40%] 2xl:max-w-[30%]">Welcome to &quot; India&apos;s First <span className="font-semibold text-[#FE9135]">saree aggregator</span> to buy and sell your pre-owned sarees at a negotiable fee&quot;. </p>
        <button className="absolute 2xl:left-[14%] xl:left-[12%] lg:left-[6%] top-[443px] text-white text-[18px] px-[32px] py-[16px] rounded-[20px] bg-[#FE9135] hover:bg-[#FBC246]">Start Swapping</button>
    </section>
}