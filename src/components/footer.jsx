import Image from "next/image";
import { usePathname } from "next/navigation";

import Facebook from "@/../public/facebook.png";
import X from "@/../public/x.png";
import LinkedIn from "@/../public/linkedin.png";
import Instagram from "@/../public/instagram.png";
import Logo from "@/../public/logo-footer.png";
import Phone from "@/../public/phone.png";
import Illustration from "@/../public/footer-illustration.svg";
import MobileIllustration from "@/../public/footer-illustration-mobile.svg";

export default function Footer() {
    const pathname = usePathname();

    return <>
        <footer className={`w-full relative list-none text-[#282828] text-[18px] font-medium hidden lg:flex
                ${pathname === "/" ? "h-[1050px] xl:h-[550px] top-[1320px] xl:top-[1750px] 2xl:top-[2010px] min-[1640px]:top-[2120px] min-[1760px]:top-[2220px] min-[1860px]:top-[2320px] hidden gap-x-14 pt-[100px] px-[9%]" :
                pathname === "/seller/home" ? "lg:top-[2450px] 2xl:top-[2700px] h-[950px] xl:h-[500px] gap-x-14 pt-[100px] px-[5%]" :
                    (pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller/editProfile/1" || pathname === "/seller/editProfile/2" || pathname === "/seller/editProfile/3" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem" || pathname === "/aboutUs" || pathname === "/contactUs" || pathname === "/terms&conditions" || pathname === "/cancellation&refund" || pathname === "/buyer/home" || pathname === "/item" || pathname === "/buyer/category" || pathname === "/purchase") ? "h-[950px] xl:h-[500px] gap-x-14 pt-[100px] px-[7%]" :
                        pathname === "/seller" ? "h-[950px] xl:h-[500px] gap-x-14 pt-[100px] px-[5%]" : "lg:h-[950px] xl:h-[500px]"
            }
                ${(pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller/editProfile/1" || pathname === "/seller/editProfile/2" || pathname === "/seller/editProfile/3") && "lg:top-[100px]"}
            `} style={{
                background: "linear-gradient(0deg, #FFC595 0%, #FFEDDE 100%)",
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
            <Image src={Illustration} alt="bg" className="absolute w-full h-full top-0 left-0" style={{
                pointerEvents: "none"
            }} />
            <li className="lg:w-[26%] xl:w-[38%] 2xl:w-[35%]">
                <p className="uppercase font-bold">About us</p>
                <p className="mt-[32px]">
                    Unneu is a peer to peer marketplace to buy- sell- rent your pre-owned sarees at a negotiable fee from the convenience of your door step.We aim to create a pool of micro entrepreneurs offering social recognition for their contribution to sustainability while making money. A platform to exchange your favourite sarees for a purpose while experiencing varieties everyday.
                </p>
            </li>
            <li className="ml-10 w-[23%] xl:w-[14%]">
                <p className="uppercase font-bold">Policies</p>
                <p className="mt-[32px] hover:cursor-pointer">Shipping</p>
                <p className="mt-[16px] hover:cursor-pointer">Return & refund</p>
                <p className="mt-[16px] hover:cursor-pointer">Delivery information</p>
                <p className="mt-[16px] hover:cursor-pointer">FAQ&apos;s</p>
                <p className="mt-[16px] hover:cursor-pointer">Privacy</p>
            </li>
            <li className="ml-2 xl:ml-10 w-[23%] xl:w-[11%]">
                <p className="uppercase font-bold">Follow us</p>
                <a href="https://www.facebook.com/people/Unneu/61563855900302/?mibextid=qi2Omg&rdid=oM2Cw8JCgiXXh0gM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14dPwyEwCK%2F%3Fmibextid%3Dqi2Omg" target="_blank">
                    <Image src={Facebook} alt="fb" className="w-[34px] h-[34px] mt-[32px] hover:cursor-pointer" />
                </a>
                <a href="https://www.instagram.com/unneuofficial/?utm_source=qr&igsh=dzlvOGs0MjZub2Ju#" target="_blank">
                    <Image src={Instagram} alt="insta" className="w-[30px] h-[30px] mt-[32px] hover:cursor-pointer" />
                </a>
                <Image src={LinkedIn} alt="linkedin" className="w-[24px] h-[22px] mt-[32px] hover:cursor-pointer" />
                <Image src={X} alt="x" className="w-[28px] h-[28px] mt-[32px] hover:cursor-pointer" />
            </li>
            <li className="w-[38%] xl:w-[24%]">
                <Image src={Logo} alt="unneu logo" className="w-[180px] h-[50px]" />
                <p className="mt-[20px]">Unneu Fashion Pvt Ltd</p>
                <p className="mt-[16px]">
                    19, RN Mukherjee Rd, Esplanade, B.B.D. Bagh, Kolkata, West Bengal 700001
                </p>
                <p className="mt-[18px]">Contact@unneu.com</p>
                <p className="mt-[20px]">
                    <Image src={Phone} alt="call" className="w-[20px] h-[20px] inline" />
                    <span className="font-semibold ml-2 lg:text-[15px] xl:text-base">Call us :</span>
                    <span className="lg:text-[15px] xl:text-base">&nbsp;+91 9147397159</span>
                </p>
            </li>
        </footer>
        <footer className={`lg:hidden flex flex-col flex-nowrap 
        ${pathname === "/" && "min-[300px]:top-[550px] sm:top-[880px] min-[730px]:top-[840px] md:top-[820px] min-[780px]:top-[880px] min-[848px]:top-[910px] min-[880px]:top-[950px] min-[910px]:top-[990px] min-[950px]:top-[1040px] min-[1000px]:top-[1100px] h-[1050px] sm:h-[950px] px-[5%] py-[41px]"}
        ${pathname === "/seller/home" && "min-[300px]:top-[2460px] sm:top-[2460px] md:top-[2900px] h-[1050px] sm:h-[950px] px-[5%] py-[41px]"}
        ${pathname === "/seller/editProfile/1" && "min-[300px]:top-[1400px] md:top-[120px] h-[1050px] sm:h-[950px] px-[5%] py-[41px]"}
        ${(pathname === "/seller/register/1") && "min-[300px]:top-[1460px] md:top-[120px] h-[1050px] sm:h-[950px] px-[5%] py-[41px]"} 
        ${(pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller/editProfile/2" || pathname === "/seller/editProfile/3" || pathname === "/seller" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem" || pathname === "/aboutUs" || pathname === "/contactUs" || pathname === "/terms&conditions" || pathname === "/cancellation&refund" || pathname === "/buyer/home" || pathname === "/item" || pathname === "/buyer/category" || pathname === "/purchase") && "min-[300px]:top-[100px] sm:top-[760px] min-[730px]:top-[840px] md:top-[820px] min-[780px]:top-[880px] min-[848px]:top-[910px] min-[880px]:top-[950px] min-[910px]:top-[990px] min-[950px]:top-[1040px] min-[1000px]:top-[1100px] lg:top-0 h-[1050px] sm:h-[950px] px-[5%] py-[41px]"}
        list-none relative`} style={{
                background: "linear-gradient(0deg, #FFC595 0%, #FFEDDE 100%)"
            }}>
            <Image src={MobileIllustration} alt="bg" className="absolute w-full h-full top-0 left-0" style={{
                pointerEvents: "none"
            }} />
            <li className="w-full">
                <p className="uppercase font-bold text-lg">About us</p>
                <p className="mt-[20px] font-medium leading-8">
                    Unneu is a peer to peer marketplace to buy- sell- rent your pre-owned sarees at a negotiable fee from the convenience of your door step.We aim to create a pool of micro entrepreneurs offering social recognition for their contribution to sustainability while making money. A platform to exchange your favourite sarees for a purpose while experiencing varieties everyday.
                </p>
            </li>
            <div className="flex flex-row justify-between mt-[42px] gap-x-12">
                <li className="w-[48%]">
                    <p className="uppercase font-bold">Policies</p>
                    <p className="mt-[32px] hover:cursor-pointer font-medium">Shipping</p>
                    <p className="mt-[16px] hover:cursor-pointer font-medium">Return & refund</p>
                    <p className="mt-[16px] hover:cursor-pointer font-medium">Delivery information</p>
                    <p className="mt-[16px] hover:cursor-pointer font-medium">FAQ&apos;s</p>
                    <p className="mt-[16px] hover:cursor-pointer font-medium">Privacy</p>
                </li>
                <li className="w-[40%]">
                    <p className="uppercase font-bold">Follow us</p>
                    <a href="https://www.facebook.com/people/Unneu/61563855900302/?mibextid=qi2Omg&rdid=oM2Cw8JCgiXXh0gM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14dPwyEwCK%2F%3Fmibextid%3Dqi2Omg" target="_blank">
                        <Image src={Facebook} alt="fb" className="w-[34px] h-[34px] mt-[32px] hover:cursor-pointer" />
                    </a>
                    <a href="https://www.instagram.com/unneuofficial/?utm_source=qr&igsh=dzlvOGs0MjZub2Ju#" target="_blank">
                        <Image src={Instagram} alt="insta" className="w-[30px] h-[30px] mt-[16px] hover:cursor-pointer" />
                    </a>
                    <Image src={LinkedIn} alt="linkedin" className="w-[24px] h-[22px] mt-[16px] hover:cursor-pointer" />
                    <Image src={X} alt="x" className="w-[28px] h-[28px] mt-[16px] hover:cursor-pointer" />
                </li>
            </div>
            <li className="w-full mt-[12px]">
                <Image src={Logo} alt="unneu logo" className="w-[180px] h-[50px] mt-5" />
                <p className="mt-[20px] font-medium">Unneu Fashion Pvt Ltd</p>
                <p className="mt-[16px] max-w-[90%] font-medium">
                    19, RN Mukherjee Rd, Esplanade, B.B.D. Bagh, Kolkata, West Bengal 700001
                </p>
                <p className="mt-[18px] font-medium">Contact@unneu.com</p>
                <p className="mt-[20px] font-medium">
                    <Image src={Phone} alt="call" className="w-[20px] h-[20px] inline" />
                    <span className="font-semibold ml-2">Call us :</span>
                    <span>&nbsp;+91 9147397159</span>
                </p>
            </li>
        </footer>
    </>
}