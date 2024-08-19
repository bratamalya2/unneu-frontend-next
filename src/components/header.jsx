"use client";

import { useState } from "react";
import { Libre_Baskerville } from "next/font/google";
import { Poppins } from "next/font/google";
import Image from "next/image";

import Logo from "@/../public/logo.png";
import Search from "@/../public/search.png";
import Like from "@/../public/like.png";
import User from "@/../public/user.png";
import Cart from "@/../public/cart.png";
import Hamburger from "@/../public/hamburgerIcon.png";
import CloseIcon from "@/../public/close.png";
import Home from "@/../public/home.png";
import Sell from "@/../public/sell.png";
import HowItWorks from "@/../public/howItWorks.png";
import AboutUs from "@/../public/aboutUs.png";
import FAQ from "@/../public/FAQ.png";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Header() {
    const [showHamburger, setShowHamburger] = useState(false);

    return <>
        <header className={`${lbFont.className} h-[135px] hidden sm:block`}>
            <div className="py-[33px] flex justify-around items-center px-[7.5%]">
                <Image src={Logo} alt="Unneu" className="w-[85px] lg:w-[125px] lg:h-[44px]" />
                <div className="w-[30%] md:w-[40%] relative">
                    <Image src={Search} alt="Search" className="w-[24px] h-[24px] absolute top-5 left-2" />
                    <input type="text" placeholder="Search for product" className={`rounded-[24px] w-full h-[64px] pl-[48px] ${poppins.className}`} style={{
                        boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                    }} />
                </div>
                <Image src={Like} alt="Like" className="w-[24px] h-[24px] hover:cursor-pointer" />
                <Image src={User} alt="User" className="w-[24px] h-[24px] hover:cursor-pointer" />
                <Image src={Cart} alt="Cart" className="w-[24px] h-[24px] hover:cursor-pointer" />
                <div className="hover:cursor-pointer">Log in</div>
                <button className="px-[16px] py-[18px] text-center rounded-[12px] bg-[#FE9135] text-white hover:bg-[#FBC246]">Sign up</button>
            </div>
            <nav className="border-t border-t-[#dcdcdc99] border-b border-b-[#dcdcdc99] w-full px-[9%] py-[25px] list-none flex gap-x-[38px]">
                <li className="hover:cursor-pointer">Home</li>
                <li className="hover:cursor-pointer">Shop</li>
                <li className="hover:cursor-pointer">Sell</li>
                <li className="hover:cursor-pointer">How it works</li>
                <li className="hover:cursor-pointer">About us</li>
                <li className="hover:cursor-pointer">FAQ</li>
            </nav>
        </header>
        {
            showHamburger && (
                <nav className="block sm:hidden bg-white max-w-[363px] w-[60%] h-[560px] list-none absolute z-50 rounded-tr-[24px] rounded-br-[24px]" style={{
                    boxShadow: "0px 4px 78px 0px rgba(0, 0, 0, 0.25)"
                }}>
                    <Image src={CloseIcon} alt="close" className="w-[14px] h-[14px] absolute top-10 right-3" onClick={() => {
                        setShowHamburger(false);
                    }} />
                    <Image src={Like} alt="wishlist" className="w-[20px] h-[17px] absolute left-3 top-10" />
                    <div className="absolute top-10 left-10 text-[14px]">Wish list</div>
                    <li className="bg-[#FE9135] text-white py-[8px] px-[20px] text-center absolute left-3 top-20 rounded-[6px] font-medium hover:cursor-pointer">
                        Sign up
                    </li>
                    <li className="py-[8px] px-[20px] text-center absolute left-[130px] top-20 rounded-[6px] font-medium border border-[#000] hover:cursor-pointer">
                        Login
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[150px]" />
                    <li className="flex flex-nowrap items-center gap-x-6 absolute top-[175px] left-3 text-[18px]">
                        <Image src={Home} alt="home" className="w-[20px] h-[18px]" />
                        Home
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[220px]" />
                    <li className="flex flex-nowrap items-center gap-x-6 absolute top-[245px] left-3 text-[18px]">
                        <Image src={Sell} alt="sell" className="w-[20px] h-[18px]" />
                        Sell
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[290px]" />
                    <li className="flex flex-nowrap items-center gap-x-6 absolute top-[315px] left-3 text-[18px]">
                        <Image src={HowItWorks} alt="how it works" className="w-[20px] h-[20px]" />
                        How it works
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[360px]" />
                    <li className="flex flex-nowrap items-center gap-x-3 absolute top-[385px] left-3 text-[18px]">
                        <Image src={AboutUs} alt="about us" className="w-[30px] h-[18px]" />
                        About us
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[430px]" />
                    <li className="flex flex-nowrap items-center gap-x-6 absolute top-[455px] left-3 text-[18px]">
                        <Image src={FAQ} alt="FAQ" className="w-[20px] h-[20px]" />
                        FAQ
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[500px]" />
                </nav>
            )
        }
        <header className={`${lbFont.className} h-[135px] block sm:hidden h-[36px] flex items-center px-[30px] mt-[20px]`}>
            <Image src={Hamburger} alt="details" className="w-[20px] h-[14px]" onClick={() => {
                setShowHamburger(true);
            }} />
            <Image src={Logo} alt="Unneu" className="w-[103px] h-[36px] ml-[30%]" />
            <Image src={Search} alt="Search" className="w-[20px] h-[20px] ml-[15%]" />
            <Image src={Cart} alt="Cart" className="w-[20px] h-[20px] hover:cursor-pointer ml-[5%]" />
        </header>
    </>
}