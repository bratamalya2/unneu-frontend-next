import Image from "next/image";

import Gradient from "@/../public/buyer-home-gradient.png";
import HeroImg from "@/../public/buyer-home-hero.svg";
import SampleSeller1 from "@/../public/buyer-home-hero-profile-1.svg";
import SampleSeller2 from "@/../public/buyer-home-hero-profile-2.svg";
import FacebookShare from "@/../public/buyer-home-facebook-share.png";
import InstagramShare from "@/../public/buyer-home-insta-share.png";
import WhatsappShare from "@/../public/buyer-home-whatsapp-share.png";

export default function Hero() {
    const urlToShare = "https://unneu.com/buyer/home"; // Replace with your link
    const textToShare = "Check out our website which resells old & ununsed clothes!"; // Custom message
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}%20${encodeURIComponent(urlToShare)}`;

    return <section className="relative w-full lg:h-[350px] xl:h-[440px] 2xl:h-[530px]">
        <Image src={Gradient} alt="bg" className="absolute w-full h-full z-0" />
        <Image src={HeroImg} alt="hero" className="absolute right-0 bottom-0 h-full max-w-[50%] z-10" />
        <div className="absolute left-[50%] top-[17px] z-20">
            <div className="relative w-[13px] h-[13px] left-[60%] rounded-[100%] bg-[#595959]"></div>
            <Image src={SampleSeller1} alt="sample-seller-1" className="lg:h-[140px] xl:h-[160px] lg:w-[110px] xl:w-[130px]" />
        </div>
        <div className="absolute left-[50%] bottom-[17px] z-20">
            <div className="relative w-[13px] h-[13px] left-[30%] rounded-[100%] bg-[#595959]"></div>
            <Image src={SampleSeller2} alt="sample-seller-2" className="lg:h-[140px] xl:h-[160px] lg:w-[110px] xl:w-[130px]" />
        </div>
        <aside className="absolute left-[5%] lg:top-[50px] xl:top-[100px] z-10 lg:max-w-[35%] xl:max-w-[30%]">
            <p className="text-[#AD6324] font-bold lg:text-2xl xl:text-3xl">Pre-Owned Paradise:</p>
            <p className="lg:mt-[12px] xl:mt-[18px] font-medium lg:text-2xl xl:text-3xl">Where aspiration meets affordability</p>
            <button className="lg:mt-[30px] px-[36px] py-[10px] rounded-[24px] bg-[#FE9135] text-xl font-semibold text-white">Explore sellers</button>
            <div className="lg:mt-[50px] mt-[80px] flex flex-row flex-nowrap items-center gap-x-4">
                <p className="text-[#A4A1A1] font-semibold">Share us on :</p>
                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
                    <Image src={FacebookShare} alt="facebook-share" className="w-[24px] h-[24px] hover:cursor-pointer" />
                </a>
                <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
                    <Image src={WhatsappShare} alt="whatsapp-share" className="w-[24px] h-[24px] hover:cursor-pointer" />
                </a>
            </div>
        </aside>
    </section>
}