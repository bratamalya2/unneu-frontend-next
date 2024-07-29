import Image from "next/image";

import SampleBuyer from "@/../public/sample-buyer.png";
import LandingPageSellerBackground from "@/../public/landingpage-seller-background.png";

export default function LandingPageBuyer() {
    return <section className="relative top-[1200px] w-full flex items-center flex justify-around items-center">
        <Image src={SampleBuyer} alt="sample buyer" className="min-w-[55%]" />
        <aside className="w-[30%] flex flex-col z-10">
            <p className="font-bold text-5xl">
                Embrace hands-me-down : <span className="text-[#FE9135]">Going back to roots.</span>
            </p>
            <p className="my-[42px] text-[18px]">
                Swap your sarees among your community and
                share the warmth of sisterhood that each saree carries
                through its memory.
            </p>
        </aside>
        <Image src={LandingPageSellerBackground} alt="circles" className="w-[366px] h-[373px] absolute z-[-10] left-[44%] bottom-0" />
    </section>
}