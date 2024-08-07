import { Libre_Baskerville } from "next/font/google";
import { Poppins } from "next/font/google";
import Image from "next/image";

import Logo from "@/../public/logo.png";
import Search from "@/../public/search.png";
import Like from "@/../public/like.png";
import User from "@/../public/user.png";
import Cart from "@/../public/cart.png";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Header() {
    return <header className={`${lbFont.className} h-[135px]`}>
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
}