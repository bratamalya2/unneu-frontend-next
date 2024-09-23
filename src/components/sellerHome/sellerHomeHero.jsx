"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import HeroRight from "@/../public/sellerHome-hero-right.png";
import HeroBg from "@/../public/sellerHome-hero-background.svg";
import Saree1 from "@/../public/sellerHome-saree-1.svg";
import PixelDots from "@/../public/sellerHome-pixel-dots.png";

export default function SellerHomeHero() {
    const router = useRouter();

    return <>
        <section className="hidden lg:block w-full lg:h-[525px] xl:h-[500px] 2xl:h-[700px] absolute">
            <Image src={HeroRight} alt="bg-right" className="absolute lg:w-[187px] xl:w-[180px] 2xl:w-[180px] h-full top-0 right-0" />
            <Image src={HeroBg} alt="bg-main" className="absolute w-[50%] xl:w-[40%] 2xl:w-[42%] h-full top-0 lg:right-[2%] xl:right-[5%]" />
            <Image src={Saree1} alt="saree" className="absolute w-[180px] xl:w-[225px] h-[208px] xl:h-[270px] top-[39px] xl:top-[50px] 2xl:top-[85px] lg:right-[36%] xl:right-[38%] 2xl:right-[36%]" />
            <Image src={PixelDots} alt="dots" className="absolute w-[78px] h-[58px] z-[-10] top-[14px] xl:top-[48px] 2xl:top-[88px] lg:right-[45%] xl:right-[48%] 2xl:right-[45%]" />
            <Image src={PixelDots} alt="dots" className="absolute w-[78px] h-[58px] z-[-10] bottom-[134px] 2xl:bottom-[194px] lg:right-[48%] 2xl:right-[46%]" />
            <p className="lg:text-[26px] xl:text-3xl 2xl:text-4xl lg:font-medium max-w-[34%] absolute z-10 left-[10%] lg:top-[106px] xl:top-[130px] 2xl:top-[205px]">
                Launch your reselling business with us in <span className="text-[#FEA355] font-semibold">2 mins.</span>
            </p>
            <p className="lg:text-base xl:text-[18px] max-w-[32%] absolute z-10 left-[10%] lg:top-[220px] xl:top-[250px] 2xl:top-[330px]">Login or register as a seller at unneu.com. Become verified as a seller, list your products with us and streamline your business.</p>
            <button className="absolute left-[10%] lg:text-lg xl:text-xl lg:font-medium xl:font-semibold rounded-[24px] bg-[#FE9135] py-[12px] px-[48px] lg:bottom-[130px] xl:bottom-[80px] text-white" onClick={() => {
                router.push("/seller/register/1");
            }}>Start selling</button>
        </section>
        <section className="lg:hidden absolute w-full h-[630px] md:h-[750px] mt-[40px]">
            <Image src={HeroBg} alt="bg-main" className="absolute w-full max-h-[350px] md:max-h-[450px] right-[-3%] sm:right-0" />
            <Image src={PixelDots} alt="dots" className="absolute w-[62px] h-[46px] z-[-10] top-[40px] md:top-[60px] right-[5%] md:right-[20%]" />
            <Image src={Saree1} alt="saree" className="absolute w-[120px] md:w-[190px] h-[208px] md:h-[350px] top-[-30px] left-[2%] md:left-[10%] z-10" />
            <p className="text-[23px] font-medium w-[90%] absolute z-10 top-[350px] min-[390px]:top-[380px] min-[420px]:top-[410px] md:top-[500px] md:max-w-[50%] md:left-[24%] left-[5%]">Launch your reselling business with us in <span className="text-[#FEA355] font-semibold">2 mins.</span></p>
            <p className="text-sm w-[88%] absolute z-10 top-[430px] min-[390px]:top-[460px] min-[420px]:top-[490px] md:top-[590px] md:max-w-[50%] md:left-[24%] left-[5%]">
                Login or register as a seller at unneu.com. Become verified as a seller, list your products with us and streamline your business.
            </p>
            <button className="absolute left-[5%] md:left-[35%] font-medium rounded-[16px] bg-[#FE9135] py-[12px] px-[22px] bottom-[50px] min-[390px]:bottom-[40px] min-[420px]:bottom-[10px] md:bottom-[30px] text-white" onClick={() => {
                router.push("/seller/register/1");
            }}>Start selling</button>
        </section>
    </>
}