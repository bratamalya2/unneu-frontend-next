import Image from "next/image";

import Background from "@/../public/landing-page-newsletter-background.png";
import Background2 from "@/../public/landing-page-newsletter-background-2.png";
import Foreground from "@/../public/landing-page-newsletter-foreground.png";
import ForwardArrow from "@/../public/forward-arrow.png";

import "@/styles/landingPageNewsletter.css";

export default function LandingPageNewsletter() {
    return <>
        <section className="relative hidden lg:block lg:top-[1050px] 2xl:top-[1800px] xl:top-[1550px] lg:h-[550px] xl:h-[450px] 2xl:h-[504px]">
            <Image src={Background} alt="bg" className="absolute z-10 h-full w-full" />
            <Image src={Foreground} alt="fg" className="absolute z-10 h-full xl:w-[45%] 2xl:w-[40%] right-0" />
            <p className="absolute z-20 lg:max-w-[52%] xl:max-w-[45%] 2xl:max-w-[40%] left-[10%] lg:top-[64px] xl:top-[64px] 2xl:top-[84px] text-[#E3E3E3] lg:text-[40px] xl:text-[48px] font-bold">
                Join the sustainability revolution: <span className="text-[#FE9135]">one saree at a time.</span>
            </p>
            <p className="absolute z-20 mt-[32px] left-[10%] lg:top-[242px] xl:top-[262px] 2xl:top-[292px] text-white text-xl font-medium">
                Join our newsletter for more Updates
            </p>
            <input type="email" placeholder="Enter your e-mail" className="absolute z-20 mt-[32px] left-[10%] lg:top-[304px] xl:top-[324px] 2xl:top-[354px] xl:w-[20%] lg:w-[26%] h-[47px] rounded-[20px] px-3 font-medium text-[18px]" />
            <Image src={ForwardArrow} alt="right arrow" className="absolute z-30 lg:top-[338px] xl:top-[358px] 2xl:top-[388px] w-[44px] h-[44px] hover:cursor-pointer" id="landing-page-newsletter-forward-arrow-big" />
        </section>
        <section className="relative lg:hidden top-[450px] sm:top-[900px] w-full h-[630px]">
            <Image src={Background2} alt="bg" className="absolute z-10 h-full w-full" />
            <p className="absolute z-20 max-w-[80%] sm:max-w-[45%] left-[10%] top-[74px] text-[#E3E3E3] text-2xl md:text-3xl font-bold">
                Join the sustainability revolution: <span className="text-[#FE9135]">one saree at a time.</span>
            </p>
            <p className="absolute z-20 mt-[32px] max-w-[60%] sm:max-w-[45%] left-[10%] top-[162px] md:text-lg text-white">
                Join our newsletter for more Updates
            </p>
            <input type="email" placeholder="Enter your e-mail" className="absolute z-20 mt-[32px] left-[10%] top-[240px] h-[38px] sm:h-[42px] w-[230px] sm:w-[300px] rounded-[20px] px-3 font-medium" />
            <Image src={ForwardArrow} alt="right arrow" className="absolute z-30 w-[34px] h-[34px] sm:h-[38px] hover:cursor-pointer" id="landing-page-newsletter-forward-arrow" />
            <Image src={Foreground} alt="fg" className="absolute z-10 w-full max-h-[504px] sm:max-h-[480px] md:max-h-none md:max-w-[90%] right-0 bottom-0" />
        </section>
    </>
}