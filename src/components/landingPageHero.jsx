import Image from "next/image";

import HeroImageBackground from "@/../public/hero-image-background.png";
import HeroBackground from "@/../public/hero-background.png";
import HeroForeground from "@/../public/hero-foreground.png";

export default function LandingPageHero() {
    return <>
        <section className="relative mt-[24px] lg:h-[650px] xl:h-[750px] 2xl:h-[829px] z-0 hidden sm:block">
            <Image src={HeroImageBackground} alt="background-1" className="w-full h-full relative z-0" />
            <Image src={HeroBackground} alt="background-2" className="absolute lg:w-[45%] 2xl:w-[50%] lg:h-full xl:h-full 2xl:h-[821px] z-10 right-0 top-0" />
            <Image src={HeroForeground} alt="foreground" className="absolute lg:w-[29%] xl:w-[36%] 2xl:w-[34%] lg:h-[550px] xl:h-[700px] 2xl:h-[720px] z-10 lg:right-[22%] xl:right-[17%] 2xl:right-[24%] lg:top-[60px] xl:top-[70px] 2xl:top-[80px]" />
            <p className="absolute 2xl:left-[12%] xl:left-[10%] lg:left-[6%] top-[78px] text-[#363636] lg:font-semibold xl:font-bold lg:text-[36px] xl:text-[42px] lg:max-w-[44%] xl:max-w-[40%] 2xl:max-w-[36%]">Wardrobes are filled with sarees! Yet, nothing new to wear?</p>
            <p className="absolute 2xl:left-[12%] xl:left-[10%] lg:left-[6%] top-[303px] text-[#2B2A2A] font-medium lg:text-lg xl:text-[22px] lg:max-w-[46%] xl:max-w-[42%] 2xl:max-w-[37.5%]">Welcome to &quot; India&apos;s First <span className="font-semibold text-[#FE9135]">saree aggregator</span> to buy and sell your pre-owned sarees at a negotiable fee&quot;. </p>
            <button className="absolute 2xl:left-[12%] xl:left-[10%] lg:left-[6%] top-[443px] text-white text-[18px] px-[32px] py-[16px] rounded-[20px] bg-[#FE9135] hover:bg-[#FBC246]">Start Swapping</button>
        </section>
        <section className="relative mt-[24px] h-[760px] z-0 block sm:hidden">
            <Image src={HeroImageBackground} alt="background-1" className="w-full h-full relative z-0" />
            <Image src={HeroBackground} alt="background-2" className="absolute w-full h-[377px] z-10 right-0 top-0" />
            <Image src={HeroForeground} alt="foreground" className="absolute z-10 w-[60%] h-[310px] left-[10%] top-[67px]" />
            <p className="absolute left-[5%] bottom-[250px] text-[#363636] font-bold text-[24px] mr-[5%] text-center">Wardrobes are filled with sarees! Yet, nothing new to wear?</p>
            <p className="absolute left-[5%] bottom-[160px] font-medium text-[#2B2A2A] text-[14px] mr-[5%] text-center">Welcome to &quot; India&apos;s First <span className="font-semibold text-[#FE9135]">saree aggregator</span> to buy and sell your pre-owned sarees at a negotiable fee&quot;. </p>
            <button className="absolute left-[5%] bottom-[90px] left-[35%] text-white px-[16px] py-[12px] font-medium rounded-[9px] bg-[#FE9135] hover:bg-[#FBC246]">Start Swapping</button>
        </section>
    </>
}