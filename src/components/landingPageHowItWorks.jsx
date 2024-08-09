import Image from "next/image";

import HowItWorks1 from "@/../public/landingpage-hiw-1.png";
import HowItWorks2 from "@/../public/landingpage-hiw-2.png";
import HowItWorks3 from "@/../public/landingpage-hiw-3.png";
import HowItWorks4 from "@/../public/landingpage-hiw-4.png";
import HowItWorks5 from "@/../public/landingpage-hiw-5.png";
import HowItWorks6 from "@/../public/landingpage-hiw-6.png";

export default function LandingPageHowItWorks() {
    return <section className="relative 2xl:top-[1860px] xl:top-[1500px] bg-[#E05F1D] text-white w-full h-[850px] pl-[10%]">
        <p className="absolute text-[48px] mt-[68px] font-bold xl:left-[13.5%]">HOW IT WORKS</p>
        <section className="absolute flex flex-wrap justify-center items-center gap-x-[10%] w-[80%] mx-auto mt-[210px] gap-y-[114px]">
            <div className="flex flex-nowrap lg:w-[42%] xl:w-[40%] justify-between items-center">
                <Image src={HowItWorks1} alt="sign up" className="w-[66px] h-[79px]" />
                <div className="font-bold lg:text-4xl xl:text-6xl">01</div>
                <div className="max-w-[55%]">
                    Sign up as a reseller and open your seller account.
                </div>
            </div>
            <div className="flex flex-nowrap lg:w-[42%] xl:w-[40%] justify-between items-center">
                <Image src={HowItWorks2} alt="list products" className="w-[66px] h-[79px] xl:w-[60px]" />
                <div className="font-bold lg:text-4xl xl:text-6xl">02</div>
                <div className="max-w-[55%]">
                    List your products with us on your profile page.
                </div>
            </div>
            <div className="flex flex-nowrap lg:w-[42%] xl:w-[40%] justify-between items-center">
                <Image src={HowItWorks3} alt="courier" className="w-[66px] h-[79px] xl:w-[75px]" />
                <div className="font-bold lg:text-4xl xl:text-6xl">03</div>
                <div className="max-w-[55%]">
                    Once order gets generated our courier person would go to pick up the saree from your doorstep.
                </div>
            </div>
            <div className="flex flex-nowrap lg:w-[42%] xl:w-[40%] justify-between items-center">
                <Image src={HowItWorks4} alt="quality test" className="w-[66px] h-[79px] xl:w-[75px]" />
                <div className="font-bold lg:text-4xl xl:text-6xl">04</div>
                <div className="max-w-[55%]">
                    Once item is received at Unneu.com they will be subjected to quality test.
                </div>
            </div>
            <div className="flex flex-nowrap lg:w-[42%] xl:w-[40%] justify-between items-center">
                <Image src={HowItWorks5} alt="dispatch" className="w-[66px] h-[79px] xl:w-[80px]" />
                <div className="font-bold lg:text-4xl xl:text-6xl">05</div>
                <div className="max-w-[55%]">
                    Once approved the item is dispatched to the buyer for order fulfillment.
                </div>
            </div>
            <div className="flex flex-nowrap lg:w-[42%] xl:w-[40%] justify-between items-center">
                <Image src={HowItWorks6} alt="list products" className="w-[66px] h-[79px] xl:w-[75px]" />
                <div className="font-bold lg:text-4xl xl:text-6xl">06</div>
                <div className="max-w-[55%]">
                    Your account gets settled every Friday once the purchase is successful
                </div>
            </div>
        </section>
    </section>
}