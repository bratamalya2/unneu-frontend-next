import Image from "next/image";

import Background from "@/../public/landing-page-newsletter-background.png";
import Foreground from "@/../public/landing-page-newsletter-foreground.png";
import ForwardArrow from "@/../public/forward-arrow.png";

export default function LandingPageNewsletter() {
    return <section className="relative top-[1300px] h-[504px]">
        <Image src={Background} alt="bg" className="absolute z-10 h-full w-full" />
        <Image src={Foreground} alt="fg" className="absolute z-10 h-full w-[30%] right-0" />
        <p className="absolute z-20 max-w-[32%] left-[10%] top-[84px] text-[#E3E3E3] text-[48px] font-bold">
            Join the sustainability revolution: <span className="text-[#FE9135]">one saree at a time.</span>
        </p>
        <p className="absolute z-20 mt-[32px] left-[10%] top-[292px] text-white text-xl font-medium">
            Join our newsletter for more Updates
        </p>
        <input type="email" placeholder="Enter your e-mail" className="absolute z-20 mt-[32px] left-[10%] top-[354px] w-[20%] h-[47px] rounded-[20px] px-5 font-medium text-[18px]" />
        <Image src={ForwardArrow} alt="right arrow" className="absolute z-30 left-[27%] top-[392px] w-[34px] h-[34px] hover:cursor-pointer" />
    </section>
}