import Image from "next/image";
import { Carousel } from "antd";

import HowItWorks1 from "@/../public/landingpage-hiw-1.png";
import HowItWorks2 from "@/../public/landingpage-hiw-2.png";
import HowItWorks3 from "@/../public/landingpage-hiw-3.png";
import HowItWorks4 from "@/../public/landingpage-hiw-4.png";
import HowItWorks5 from "@/../public/landingpage-hiw-5.png";
import HowItWorks6 from "@/../public/landingpage-hiw-6.png";

export default function LandingPageHowItWorks() {
    return <>
        <section className="relative hidden md:block 2xl:top-[1660px] xl:top-[1500px] md:top-[800px] lg:top-[1050px] bg-[#E05F1D] text-white w-full md:h-[920px] lg:h-[850px] md:px-[8%] lg:px-[10%]">
            <p className="absolute text-[48px] mt-[68px] font-bold md:left-[10%] xl:left-[13.5%]">HOW IT WORKS</p>
            <section className="absolute flex flex-wrap justify-center items-center md:gap-x-[4%] lg:gap-x-[10%] md:w-[90%] lg:w-[80%] mx-auto mt-[210px] gap-y-[114px]">
                <div className="flex flex-nowrap md:w-[45%] lg:w-[42%] xl:w-[40%] justify-between items-center">
                    <Image src={HowItWorks1} alt="sign up" className="w-[66px] h-[79px]" />
                    <div className="font-bold md:text-4xl xl:text-6xl">01</div>
                    <div className="md:max-w-[50%] lg:max-w-[55%]">
                        Sign up as a reseller and open your seller account.
                    </div>
                </div>
                <div className="flex flex-nowrap md:w-[45%] lg:w-[42%] xl:w-[40%] justify-between items-center">
                    <Image src={HowItWorks2} alt="list products" className="w-[66px] h-[79px] xl:w-[60px]" />
                    <div className="font-bold md:text-4xl xl:text-6xl">02</div>
                    <div className="md:max-w-[50%] lg:max-w-[55%]">
                        List your products with us on your profile page.
                    </div>
                </div>
                <div className="flex flex-nowrap md:w-[45%] lg:w-[42%] xl:w-[40%] justify-between items-center">
                    <Image src={HowItWorks3} alt="courier" className="w-[66px] h-[79px] xl:w-[75px]" />
                    <div className="font-bold md:text-4xl xl:text-6xl">03</div>
                    <div className="md:max-w-[50%] lg:max-w-[55%]">
                        Once order gets generated our courier person would go to pick up the saree from your doorstep.
                    </div>
                </div>
                <div className="flex flex-nowrap md:w-[45%] lg:w-[42%] xl:w-[40%] justify-between items-center">
                    <Image src={HowItWorks4} alt="quality test" className="w-[66px] h-[79px] xl:w-[75px]" />
                    <div className="font-bold md:text-4xl xl:text-6xl">04</div>
                    <div className="md:max-w-[50%] lg:max-w-[55%]">
                        Once item is received at Unneu.com they will be subjected to quality test.
                    </div>
                </div>
                <div className="flex flex-nowrap md:w-[45%] lg:w-[42%] xl:w-[40%] justify-between items-center">
                    <Image src={HowItWorks5} alt="dispatch" className="w-[66px] h-[79px] xl:w-[80px]" />
                    <div className="font-bold md:text-4xl xl:text-6xl">05</div>
                    <div className="md:max-w-[50%] lg:max-w-[55%]">
                        Once approved the item is dispatched to the buyer for order fulfillment.
                    </div>
                </div>
                <div className="flex flex-nowrap md:w-[45%] lg:w-[42%] xl:w-[40%] justify-between items-center">
                    <Image src={HowItWorks6} alt="list products" className="w-[66px] h-[79px] xl:w-[75px]" />
                    <div className="font-bold md:text-4xl xl:text-6xl">06</div>
                    <div className="md:max-w-[50%] lg:max-w-[55%]">
                        Your account gets settled every Friday once the purchase is successful
                    </div>
                </div>
            </section>
        </section>
        <section className="relative block md:hidden top-[450px] sm:top-[800px] bg-[#E05F1D] text-white w-full h-[530px] sm:h-[600px] px-[10%] z-0" id="landing-page-howitworks">
            <p className="relative text-[24px] top-[28px] font-bold">HOW IT WORKS</p>
            <Carousel autoplay dotPosition="bottom" className="relative z-10 left-0 top-[50px] text-white">
                <div className="flex flex-col flex-nowrap">
                    <div className="flex flex-row flex-nowrap justify-around items-center my-10">
                        <Image src={HowItWorks1} alt="list products" className="w-[42px] h-[50px]" />
                        <div className="font-bold text-[32px]">01</div>
                        <div className="max-w-[55%] sm:text-lg">
                            Sign up as a reseller and open your seller account.
                        </div>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-around items-center my-5 sm:my-10">
                        <Image src={HowItWorks2} alt="list products" className="w-[42px] h-[50px]" />
                        <div className="font-bold text-[32px]">02</div>
                        <div className="max-w-[55%] sm:text-lg">
                            List your products with us on your profile page.
                        </div>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-around items-center mt-5 sm:my-10">
                        <Image src={HowItWorks3} alt="list products" className="w-[42px] h-[50px]" />
                        <div className="font-bold text-[32px]">03</div>
                        <div className="max-w-[55%] sm:text-lg">
                            Once order gets generated our courier person would come to pick up the saree from your doorstep.
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-nowrap">
                    <div className="flex flex-row flex-nowrap justify-around items-center my-5">
                        <Image src={HowItWorks4} alt="list products" className="w-[46px] h-[50px]" />
                        <div className="font-bold text-[32px]">04</div>
                        <div className="max-w-[55%] sm:text-lg">
                            Once item is received at unneu.com they will be subjected to quality test.
                        </div>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-around items-center my-5">
                        <Image src={HowItWorks5} alt="list products" className="w-[50px] h-[50px]" />
                        <div className="font-bold text-[32px]">05</div>
                        <div className="max-w-[55%] sm:text-lg">
                            Once approved the item is dispatched to the buyer for order fulfillment.
                        </div>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-around items-center mt-5">
                        <Image src={HowItWorks6} alt="list products" className="w-[50px] h-[50px]" />
                        <div className="font-bold text-[32px]">06</div>
                        <div className="max-w-[55%] sm:text-lg">
                            Your account gets settled every Friday once the purchase is successful
                        </div>
                    </div>
                </div>
            </Carousel>
        </section>
    </>
}