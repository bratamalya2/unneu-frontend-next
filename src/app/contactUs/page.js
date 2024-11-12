import Image from "next/image";

import Hero from "@/../public/contactUs-hero.svg";
import UnneuLogo from "@/../public/logo.png";
import Address from "@/../public/registered-address.svg";
import Phone from "@/../public/phone-contactUs.svg";
import Email from "@/../public/email-contactUs.svg";

import "@/styles/contactUs.css";

export default function AboutUs() {
    return <main className="relative w-full top-[80px] mt-[21px]">
        <p className="uppercase text-2xl font-semibold ml-[5%]">Contact uS</p>
        <section className="relative mt-[24px] ml-[2%] w-full h-[520px] bg-[#FEA355] mb-[576px] z-0">
            <Image src={Hero} alt="hero" className="absolute right-[-4%] w-[70%] h-full z-0" id="contact-us-hero-img" />
            <div className="absolute bg-[#FFD7B6] w-[25%] h-[365px] top-[83px] left-[-2%] z-10"></div>
            <div className="absolute top-[150px] left-[26%]">
                <p className="text-white text-2xl font-semibold">Get In Touch</p>
                <p className="mt-[16px] font-medium text-white max-w-[35%]">Want to get in touch ? We&apos;d love to hear from you. Here&apos;s how you can reach us.</p>
            </div>
            <aside className="absolute bg-white w-[211px] h-[180px] py-[12px] px-[27px] flex flex-col flex-nowrap items-center justify-between left-[15%] bottom-[-150px] rounded-[10px] z-20" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <Image src={UnneuLogo} alt="unneu" className="w-[125px] h-[44px]" />
                <p className="font-medium">Merchant Legal Entity Name: </p>
                <p className="text-sm font-semibold">Unneu Private Limited</p>
            </aside>
            <aside className="absolute bg-white w-[211px] h-[409px] py-[12px] px-[27px] flex flex-col flex-nowrap items-center justify-between left-[40%] bottom-[-380px] rounded-[10px] z-20" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <Image src={Address} alt="address" className="w-[40px] h-[40px]" />
                <div>
                    <p className="text-sm font-semibold">Registered Address</p>
                    <p>70, SREERAMPUR ROAD, NORTH GARIA, South 24 Parganas, West Bengal</p>
                </div>
                <div>
                    <p className="text-sm font-semibold">Operational Address</p>
                    <p>70, SREERAMPUR ROAD, NORTH GARIA, South 24 Parganas, West Bengal</p>
                </div>
            </aside>
            <aside className="absolute bg-white w-[280px] h-[170px] py-[12px] px-[27px] flex flex-col flex-nowrap justify-between left-[65%] bottom-[-140px] rounded-[10px] z-20" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <div>
                    <div className="flex flex-row flex-nowrap items-center">
                        <Image src={Phone} alt="phone" className="w-[20px] h-[20px]" />
                        <p className="ml-[8px] text-sm font-semibold">Phone No :</p>
                    </div>
                    <p className="mt-[8px]">+919475674244</p>
                </div>
                <div>
                    <div className="flex flex-row flex-nowrap items-center">
                        <Image src={Email} alt="phone" className="w-[26px] h-[20px]" />
                        <p className="ml-[8px] text-sm font-semibold">Email ID :</p>
                    </div>
                    <p className="mt-[8px] text-sm">indranichowdhury@unneu.com</p>
                </div>
            </aside>
        </section>
    </main>
}