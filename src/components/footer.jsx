import Image from "next/image";

import Facebook from "@/../public/facebook.png";
import X from "@/../public/x.png";
import LinkedIn from "@/../public/linkedin.png";
import Instagram from "@/../public/instagram.png";
import Logo from "@/../public/logo-footer.png";
import Phone from "@/../public/phone.png";

export default function Footer() {
    return <footer className="w-full h-[743px] xl:h-[550px] relative 2xl:top-[1800px] xl:top-[1550px] flex gap-x-14 pt-[100px] list-none px-[9%] text-[#282828] text-[18px] font-medium" style={{
        background: "linear-gradient(0deg, #FFC595 0%, #FFEDDE 100%)",
        boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
    }}>
        <li className="lg:w-[26%] xl:w-[40%] 2xl:w-[30%]">
            <p className="uppercase font-bold">About us</p>
            <p className="mt-[32px]">
                Unneu is a peer to peer marketplace to buy- sell- rent your pre-owned sarees at a negotiable fee from the convenience of your door step.We aim to create a pool of micro entrepreneurs offering social recognition for their contribution to sustainability while making money. A platform to exchange your favourite sarees for a purpose while experiencing varieties everyday.
            </p>
        </li>
        <li className="w-[23%]">
            <p className="uppercase font-bold">Policies</p>
            <p className="mt-[32px] hover:cursor-pointer">Shipping</p>
            <p className="mt-[16px] hover:cursor-pointer">Return & refund</p>
            <p className="mt-[16px] hover:cursor-pointer">Delivery information</p>
            <p className="mt-[16px] hover:cursor-pointer">FAQ&apos;s</p>
            <p className="mt-[16px] hover:cursor-pointer">Privacy</p>
        </li>
        <li className="w-[23%]">
            <p className="uppercase font-bold">Follow us</p>
            <Image src={Facebook} alt="fb" className="w-[32px] h-[32px] mt-[32px] hover:cursor-pointer" />
            <Image src={Instagram} alt="insta" className="w-[34px] h-[32px] mt-[32px] hover:cursor-pointer" />
            <Image src={LinkedIn} alt="linkedin" className="w-[28px] h-[32px] mt-[32px] hover:cursor-pointer" />
            <Image src={X} alt="x" className="w-[28px] h-[32px] mt-[32px] hover:cursor-pointer" />
        </li>
        <li className="w-[23%] xl:w-[32%]">
            <Image src={Logo} alt="unneu logo" className="w-[180px] h-[50px]" />
            <p className="mt-[20px]">Unneu Fashion Pvt Ltd</p>
            <p className="mt-[16px]">
                19, RN Mukherjee Rd, Esplanade, B.B.D. Bagh, Kolkata, West Bengal 700001
            </p>
            <p className="mt-[18px]">Contact@unneu.com</p>
            <p className="mt-[20px]">
                <Image src={Phone} alt="call" className="w-[20px] h-[20px] inline" />
                <span className="font-semibold ml-2">Call us :</span>
                <span>&nbsp;+91 9147397159</span>
            </p>
        </li>
    </footer>
}