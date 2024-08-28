"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import HeroLeft from "@/../public/sellerHome-hero-left.png";
import HeroRight from "@/../public/sellerHome-hero-right.png";
import HeroBg from "@/../public/sellerHome-hero-background.png";
import Saree1 from "@/../public/sellerHome-saree-1.png";
import PixelDots from "@/../public/sellerHome-pixel-dots.png";

export default function SellerHomeHero() {
    const router = useRouter();

    return <>
        <section className="w-full lg:h-[525px] xl:h-[630px] 2xl:h-[500px] absolute">
            <Image src={HeroLeft} alt="bg-left" className="absolute w-[159px] h-[184px] top-0 left-0" />
            <Image src={HeroRight} alt="bg-right" className="absolute w-[267px] xl:w-[220px] 2xl:w-[180px] h-full top-0 right-0" />
            <Image src={HeroBg} alt="bg-main" className="absolute w-[50%] 2xl:w-[44%] h-full top-0 right-[5%]" />
            <Image src={Saree1} alt="saree" className="absolute w-[180px] h-[208px] top-[39px] right-[40%] 2xl:right-[38%]" />
            <Image src={PixelDots} alt="dots" className="absolute w-[78px] h-[58px] z-[-10] top-[14px] right-[50%]" />
            <Image src={PixelDots} alt="dots" className="absolute w-[78px] h-[58px] z-[-10] bottom-[134px] right-[51%]" />
            <p className="text-4xl font-medium max-w-[34%] absolute z-10 left-[10%] top-[106px]">Launch your reselling business with us in <span className="text-[#FEA355] font-semibold">2 min.</span></p>
            <p className="text-[18px] max-w-[32%] absolute z-10 left-[10%] top-[250px]">Login or register as a seller at Unneu.com. Become verified as seller, list your product with us and streamline your business.</p>
            <button className="absolute left-[10%] text-xl font-semibold rounded-[24px] bg-[#FE9135] py-[12px] px-[48px] bottom-[80px] text-white" onClick={() => {
                router.push("/seller/register/1");
            }}>Start selling</button>
        </section>
    </>
}