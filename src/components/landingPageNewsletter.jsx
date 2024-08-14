import Image from "next/image";

import Background from "@/../public/landing-page-newsletter-background.png";
import Background2 from "@/../public/landing-page-newsletter-background-2.png";
import Foreground from "@/../public/landing-page-newsletter-foreground.png";
import ForwardArrow from "@/../public/forward-arrow.png";

export default function LandingPageNewsletter() {
    return <>
        <section className="relative hidden sm:block top-[700px] 2xl:top-[1800px] xl:top-[1550px] lg:h-[450px] xl:h-[450px] 2xl:h-[504px]">
            <Image src={Background} alt="bg" className="absolute z-10 h-full w-full" />
            <Image src={Foreground} alt="fg" className="absolute z-10 h-full xl:w-[45%] 2xl:w-[40%] right-0" />
            <p className="absolute z-20 lg:max-w-[52%] xl:max-w-[45%] 2xl:max-w-[40%] left-[10%] lg:top-[64px] xl:top-[64px] 2xl:top-[84px] text-[#E3E3E3] lg:text-[40px] xl:text-[48px] font-bold">
                Join the sustainability revolution: <span className="text-[#FE9135]">one saree at a time.</span>
            </p>
            <p className="absolute z-20 mt-[32px] left-[10%] lg:top-[242px] xl:top-[262px] 2xl:top-[292px] text-white text-xl font-medium">
                Join our newsletter for more Updates
            </p>
            <input type="email" placeholder="Enter your e-mail" className="absolute z-20 mt-[32px] left-[10%] lg:top-[304px] xl:top-[324px] 2xl:top-[354px] xl:w-[20%] lg:w-[24%] h-[47px] rounded-[20px] px-5 font-medium text-[18px]" />
            <Image src={ForwardArrow} alt="right arrow" className="absolute z-30 xl:left-[27%] lg:left-[30%] lg:top-[344px] xl:top-[362px] 2xl:top-[392px] w-[34px] h-[34px] hover:cursor-pointer" />
        </section>
        <section className="relative sm:hidden top-[500px] w-full h-[714px]">
            <Image src={Background2} alt="bg" className="absolute z-10 h-full w-full" />
            <p className="absolute z-20 max-w-[80%] left-[10%] top-[74px] text-[#E3E3E3] text-2xl font-bold">
                Join the sustainability revolution: <span className="text-[#FE9135]">one saree at a time.</span>
            </p>
            <p className="absolute z-20 mt-[32px] max-w-[60%] left-[10%] top-[162px] text-white">
                Join our newsletter for more Updates
            </p>
            <input type="email" placeholder="Enter your e-mail" className="absolute z-20 mt-[32px] left-[10%] top-[240px] h-[38px] rounded-[20px] px-5 font-medium" />
            <Image src={ForwardArrow} alt="right arrow" className="absolute z-30 left-[62%] top-[274px] w-[34px] h-[34px] hover:cursor-pointer" />
            <Image src={Foreground} alt="fg" className="absolute z-10 h-[350px] w-full right-0 bottom-0" />
        </section>
    </>
}