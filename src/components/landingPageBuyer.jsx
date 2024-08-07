import Image from "next/image";

import SampleBuyer from "@/../public/sample-buyer.png";
import LandingPageSellerBackground from "@/../public/landingpage-seller-background.png";

export default function LandingPageBuyer() {
    return <section className="relative lg:top-[1200px] xl:top-[1400px] 2xl:top-[1700px] w-full flex items-center justify-center flex gap-x-8 items-center">
        <Image src={SampleBuyer} alt="sample buyer" className="lg:w-[52%] xl:w-[55%]" />
        <aside className="2xl:w-[30%] xl:max-w-[43%] 2xl:max-w-[48%] flex flex-col z-10">
            <p className="font-bold text-5xl">
                Embrace hands-me-down : <span className="text-[#FE9135]">Going back to roots.</span>
            </p>
            <p className="my-[42px] text-[18px]">
                Swap your sarees among your community and
                share the warmth of sisterhood that each saree carries
                through its memory.
            </p>
            <button className="text-[18px] font-medium bg-[#FBC246] rounded-[20px] py-[16px] px-[32px] w-[168px]">Explore</button>
        </aside>
        <Image src={LandingPageSellerBackground} alt="circles" className="w-[366px] h-[373px] absolute z-[-10] lg:left-[32%] xl:left-[44%] lg:bottom-[-120px] xl:bottom-0" />
    </section>
}