import Image from "next/image";

import LandingPageSellerBackground from "@/../public/landingpage-seller-background.png";
import SampleSeller from "@/../public/sample-seller.png";

export default function LandingPageSeller() {
    return <section className="relative w-full flex flex-col items-center">
        <Image src={LandingPageSellerBackground} alt="circles" className="w-[366px] h-[373px] absolute z-10 left-5 top-[-30px]" />
        <Image src={SampleSeller} alt="sample seller" className="w-[65%] mx-auto h-[872px] rounded-[32px] absolute z-20 top-20" />
    </section>
}