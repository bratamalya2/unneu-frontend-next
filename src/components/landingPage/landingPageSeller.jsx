import Image from "next/image";

import LandingPageSellerBackground from "@/../public/landingpage-seller-background.png";
import SampleSeller from "@/../public/sample-seller.svg";

export default function LandingPageSeller() {
    return <section className="relative w-full flex flex-col items-center" id="landing-page-seller">
        <Image src={LandingPageSellerBackground} alt="circles" className="w-[113px] md:w-[366px] h-[118px] md:h-[373px] absolute z-10 left-0 md:left-5 top-[-30px]" />
        <Image src={SampleSeller} alt="sample seller" className="w-[95%] lg:w-[90%] xl:w-[85%] 2xl:w-[82%] max-h-[400px] sm:max-h-[645px] lg:max-h-[950px] xl:max-h-[1020px] 2xl:w-[85%] inline-block mx-auto rounded-[32px] absolute z-20 top-[-15px] sm:top-[5px]" />
    </section>
}