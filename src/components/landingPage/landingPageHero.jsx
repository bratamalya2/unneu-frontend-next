import Image from "next/image";

import HeroImageBackground from "@/../public/hero-image-background.png";
import HeroBackground from "@/../public/hero-background.png";
import HeroForeground from "@/../public/hero-foreground.svg";

import "@/styles/landingPageHero.css";

export default function LandingPageHero() {
    return <>
        <section className="relative mt-[24px] md:h-[600px] lg:h-[650px] xl:h-[750px] 2xl:h-[829px] z-0 hidden md:block">
            <Image src={HeroImageBackground} alt="background-1" className="w-full h-full relative z-0" />
            <Image src={HeroBackground} alt="background-2" className="absolute md:w-[50%] lg:w-[45%] 2xl:w-[40%] lg:h-full md:h-full xl:h-full 2xl:h-full z-10 right-0 top-0" />
            <Image src={HeroForeground} alt="foreground" className="absolute md:w-[38%] lg:w-[35%] xl:w-[36%] 2xl:w-[34%] md:h-[750px] lg:h-[700px] xl:h-[600px] 2xl:h-[720px] z-10 md:right-[15%] lg:right-[20%] xl:right-[17%] 2xl:right-[24%] md:top-0 lg:top-[25px] xl:top-[110px] 2xl:top-[90px]" />
            <p className="absolute 2xl:left-[7%] xl:left-[5.5%] lg:left-[6%] md:left-[5%] top-[78px] text-[#363636] md:font-semibold xl:font-bold md:text-[30px] lg:text-[36px] xl:text-[42px] md:max-w-[44%] lg:max-w-[44%] xl:max-w-[40%] 2xl:max-w-[36%]">Wardrobes are filled with sarees! Yet, nothing new to wear?</p>
            <p className="absolute 2xl:left-[7%] xl:left-[5.5%] lg:left-[6%] md:left-[5%] top-[303px] text-[#2B2A2A] font-medium md:text-lg xl:text-[22px] md:max-w-[45%] lg:max-w-[46%] xl:max-w-[42%] 2xl:max-w-[37.5%]">Welcome to &quot; India&apos;s First <span className="font-semibold text-[#FE9135]">saree aggregator</span> to buy and sell your pre-owned sarees at a negotiable fee&quot;. </p>
            <button className="absolute 2xl:left-[7%] xl:left-[5.5%] lg:left-[6%] md:left-[5%] top-[443px] xl:top-[400px] text-white text-[18px] px-[32px] py-[16px] rounded-[20px] bg-[#FE9135] hover:bg-[#FBC246]">Start Swapping</button>
        </section>
        <section className="relative mt-0 h-[760px] z-0 block md:hidden">
            <Image src={HeroImageBackground} alt="background-1" className="w-full h-full relative z-0" />
            <div id="landingpage-hero-bg-2" className="absolute w-full h-[377px] z-10 right-0 top-0 overflow-y-hidden">
                <Image src={HeroForeground} alt="foreground" className="absolute z-10 w-[60%] h-[310px] left-[10%] sm:left-[25%] z-10" id="landingpage-hero-fg" />
            </div>
            <p className="absolute left-[5%] sm:left-[15%] bottom-[250px] text-[#363636] font-bold text-[24px] sm:max-w-[70%] mr-[5%] text-center">Wardrobes are filled with sarees! Yet, nothing new to wear?</p>
            <p className="absolute left-[5%] sm:left-[15%] bottom-[160px] font-medium text-[#2B2A2A] text-[14px] sm:max-w-[70%] mr-[5%] text-center">Welcome to &quot; India&apos;s First <span className="font-semibold text-[#FE9135]">saree aggregator</span> to buy and sell your pre-owned sarees at a negotiable fee&quot;. </p>
            <button className="absolute bottom-[90px] left-[29%] sm:left-[35%] text-white px-[16px] py-[12px] font-medium rounded-[9px] bg-[#FE9135] hover:bg-[#FBC246]">Start Swapping</button>
        </section>
    </>
}