"use client";

import Image from "next/image";
import { useState } from "react";

import LeftLeaf from "@/../public/sellerHome-leftLeaf.png";
import RightLeaf from "@/../public/sellerHome-rightLeaf.png";
import Audience from "@/../public/sellerHome-audience.png";
import Store from "@/../public/sellerHome-store.png";
import SocialMedia from "@/../public/sellerHome-social-media.png";
import Payments from "@/../public/sellerHome-receive-payments.png";
import LightArrowLeft from "@/../public/light arrow.svg";
import DarkArrowRight from "@/../public/dark arrow.svg";

const icons = [Audience, Store, SocialMedia, Payments];
const titles = [
    "Reach a wider audience",
    "Acces to separate seller store",
    "Social media recognition",
    "Receive Payments"
];
const contents = [
    "By reaching a nationwide pool of buyers, you can significantly increase the visibility of your product or service, attracting more potential customers and ultimately boosting sales.",
    "Create your own virtual store for free with our platform. We&apos;ll generate shareable social media links to help you reach a wider audience and increase your sales potential.",
    "Achieve widespread social recognition across all major social media platforms and earn a prestigious badge of honor reflecting your business success.",
    "Your account gets settled every Friday once the purchase is successful"
];

export default function SellerHomeWhySellWithUs() {
    const [currIndex, setCurrIndex] = useState(0);

    return <>
        <section className="mt-[120px] hidden lg:block absolute lg:top-[1400px] xl:top-[1500px] 2xl:top-[1600px] px-[10%] w-full">
            <p className="text-4xl font-medium">Why <span className="text-[#FE9135] font-semibold">Sell with Us?</span></p>
            <Image src={LeftLeaf} alt="leaf" className="w-[75px] h-[558px] absolute left-0 top-[155px] z-[-10]" />
            <Image src={RightLeaf} alt="leaf" className="w-[75px] h-[558px] absolute right-0 top-[155px] z-[-10]" />
            <div className="flex flex-row flex-wrap items-center justify-between w-full gap-y-[72px] mt-[58px]">
                <div className="py-[33px] px-[38px] flex flex-col flex-nowrap w-[45%] rounded-[16px] bg-[#FAFAFA] gap-y-[18px] min-h-[330px]" style={{
                    boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                }}>
                    <Image src={Audience} alt="audience" className="w-[70px] h-[40px]" />
                    <p className="text-xl font-semibold">Reach a wider audience</p>
                    <p className="text-[#5F5F5F] text-[18px] font-medium">
                        By reaching a nationwide pool of buyers, you can significantly increase the visibility of your product or service, attracting more potential customers and ultimately boosting sales.
                    </p>
                </div>
                <div className="py-[33px] px-[38px] flex flex-col flex-nowrap w-[45%] rounded-[16px] bg-[#FAFAFA] gap-y-[18px] min-h-[330px]" style={{
                    boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                }}>
                    <Image src={Store} alt="store" className="w-[52px] h-[50px]" />
                    <p className="text-xl font-semibold">Acces to separate seller store</p>
                    <p className="text-[#5F5F5F] text-[18px] font-medium">
                        Create your own virtual store for free with our platform. We&apos;ll generate shareable social media links to help you reach a wider audience and increase your sales potential.
                    </p>
                </div>
                <div className="py-[33px] px-[38px] flex flex-col flex-nowrap w-[45%] rounded-[16px] bg-[#FAFAFA] gap-y-[18px] min-h-[330px]" style={{
                    boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                }}>
                    <Image src={SocialMedia} alt="social media" className="w-[54px] h-[54px]" />
                    <p className="text-xl font-semibold">Social media recognition</p>
                    <p className="text-[#5F5F5F] text-[18px] font-medium">
                        Achieve widespread social recognition across all major social media platforms and earn a prestigious badge of honor reflecting your business success.
                    </p>
                </div>
                <div className="py-[33px] px-[38px] flex flex-col flex-nowrap w-[45%] rounded-[16px] bg-[#FAFAFA] gap-y-[18px] min-h-[330px]" style={{
                    boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                }}>
                    <Image src={Payments} alt="payments" className="w-[63px] h-[60px]" />
                    <p className="text-xl font-semibold">Receive Payments</p>
                    <p className="text-[#5F5F5F] text-[18px] font-medium">
                        Your account gets settled every Friday once the purchase is successful
                    </p>
                </div>
            </div>
        </section>
        <section className="absolute top-[1900px] lg:hidden px-[5%] w-full">
            <p className="text-2xl font-medium mb-[40px]">Why <span className="text-[#FE9135]">Sell with Us?</span></p>
            <div className="w-full h-[280px] rounded-[16px] p-[21px] flex flex-col flex-nowrap gap-y-[16px]" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <Image src={icons[currIndex]} alt="icon" className={
                    `${currIndex === 0 && "w-[42px] h-[26px]"}
                     ${currIndex === 1 && "w-[45px] h-[32px]"}
                     ${currIndex === 2 && "w-[40px] h-[35px]"}
                     ${currIndex === 3 && "w-[40px] h-[40px]"}
                    `
                } />
                <p className="font-semibold">{titles[currIndex]}</p>
                <p className="text-sm font-medium">{contents[currIndex]}</p>
            </div>
            <div className="mt-[32px] flex flex-row flex-nowrap items-center justify-center gap-x-[4px]">
                <div className={`w-[8px] h-[8px] rounded-[100%] ${currIndex === 0 ? "bg-[#FE9135]" : "bg-[#D9D9D9]"}`}></div>
                <div className={`w-[8px] h-[8px] rounded-[100%] ${currIndex === 1 ? "bg-[#FE9135]" : "bg-[#D9D9D9]"}`}></div>
                <div className={`w-[8px] h-[8px] rounded-[100%] ${currIndex === 2 ? "bg-[#FE9135]" : "bg-[#D9D9D9]"}`}></div>
                <div className={`w-[8px] h-[8px] rounded-[100%] ${currIndex === 3 ? "bg-[#FE9135]" : "bg-[#D9D9D9]"}`}></div>
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center w-full gap-x-[16px] mt-[25px]">
                <div className="w-[50px] h-[50px] rounded-[100%] border border-slate-800 flex items-center justify-center" onClick={() => {
                    setCurrIndex((x) => {
                        if (x > 0)
                            return x - 1;
                        else
                            return x;
                    })
                }}>
                    <Image src={LightArrowLeft} alt="arrow" />
                </div>
                <div className="w-[50px] h-[50px] rounded-[100%] relative border border-slate-800 flex items-center justify-center" onClick={() => {
                    setCurrIndex((x) => {
                        if (x < 3)
                            return x + 1;
                        else
                            return x;
                    })
                }}>
                    <Image src={DarkArrowRight} alt="arrow" />
                </div>
            </div>
        </section>
    </>
}