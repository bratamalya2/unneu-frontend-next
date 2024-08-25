import Image from "next/image";

import SampleBuyer from "@/../public/sample-buyer.png";
import LandingPageSellerBackground from "@/../public/landingpage-seller-background.png";

export default function LandingPageBuyer() {
    return <>
        <section className="relative hidden xl:flex xl:top-[1000px] 2xl:top-[1300px] w-full items-center justify-center gap-x-6 items-center">
            <Image src={SampleBuyer} alt="sample buyer" className="lg:w-[52%] xl:w-[55%]" />
            <aside className="w-[80%] 2xl:w-[30%] xl:max-w-[43%] 2xl:max-w-[48%] flex flex-col z-10">
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
            <Image src={LandingPageSellerBackground} alt="circles" className="w-[366px] h-[373px] absolute z-[-10] lg:left-[22%] xl:left-[34%] lg:bottom-[-120px] xl:bottom-[-100px]" />
        </section>
        <section className="relative flex flex-col xl:hidden top-[400px] sm:top-[640px] md:top-[700px] lg:top-[950px] xl:top-[750px] w-full items-center">
            <aside className="w-[85%] sm:w-[60%] md:w-[55%] lg:w-[50%] px-3 flex flex-col items-center z-10">
                <p className="font-bold text-2xl lg:text-4xl text-center">
                    Embrace hands-me-down : <span className="text-[#FE9135]">Going back to roots.</span>
                </p>
                <p className="my-[32px] lg:text-xl text-center">
                    Swap your sarees among your community and
                    share the warmth of sisterhood that each saree carries
                    through its memory.
                </p>
                <button className="text-[18px] font-medium lg:text-xl bg-[#FBC246] rounded-[12px] py-[12px] lg:py-[14px] px-[52px] w-[168px] mb-[60px]">Explore</button>
            </aside>
            <Image src={SampleBuyer} alt="sample buyer" className="w-[105%] mx-auto rounded-[12px]" />
            <Image src={LandingPageSellerBackground} alt="circles" className="w-[113px] md:w-[366px] h-[118px] md:h-[373px] absolute z-[-10] right-0 bottom-0 sm:bottom-[-100px] md:bottom-[-10px]" />
        </section>
    </>
}