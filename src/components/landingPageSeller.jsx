import Image from "next/image";

import LandingPageSellerBackground from "@/../public/landingpage-seller-background.png";
import SampleSeller from "@/../public/sample-seller.png";

export default function LandingPageSeller() {
    return <section className="relative w-full flex flex-col items-center">
        <Image src={LandingPageSellerBackground} alt="circles" className="w-[113px] sm:w-[366px] h-[118px] sm:h-[373px] absolute z-10 left-0 sm:left-5 top-[-30px]" />
        <Image src={SampleSeller} alt="sample seller" className="w-[95%] 2xl:w-[85%] inline-block mx-auto rounded-[32px] absolute z-20 top-[-15px] sm:top-[5px]" />
    </section>
}