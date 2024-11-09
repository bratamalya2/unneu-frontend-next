"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Libre_Baskerville } from "next/font/google";
import { Poppins } from "next/font/google";
import Image from "next/image";

import { useUnneuDataStore } from "@/store/store";

import Logo from "@/../public/logo.png";
import Search from "@/../public/search.png";
import Like from "@/../public/like.png";
import User from "@/../public/user.png";
import Hamburger from "@/../public/hamburgerIcon.png";
import CloseIcon from "@/../public/close.png";
import Home from "@/../public/home.png";
import Sell from "@/../public/sell.png";
import HowItWorks from "@/../public/howItWorks.png";
import AboutUs from "@/../public/aboutUs.png";
import FAQ from "@/../public/FAQ.png";
import BlankDP from "@/../public/blank-dp.webp";
import MyOrders from "@/../public/My orders.png";
import Address from "@/../public/Address.png";
import Settings from "@/../public/Privacy setting.png";
import Logout from "@/../public/Logout.png";

import SignInPopup from "./signInPopup";
import SignUpPopup from "./signUpPopup";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const showSignIn = useUnneuDataStore(store => store.showSignIn);
    const setShowSignIn = useUnneuDataStore(store => store.setShowSignIn);
    const showSignUp = useUnneuDataStore(store => store.showSignUp);
    const setShowSignUp = useUnneuDataStore(store => store.setShowSignUp);
    const cart = useUnneuDataStore(store => store.cart);
    const jwtToken = useUnneuDataStore(store => store.jwtToken);
    const refreshToken = useUnneuDataStore(store => store.refreshToken);
    const setJwtToken = useUnneuDataStore(store => store.setJwtToken);
    const setRefreshToken = useUnneuDataStore(store => store.setRefreshToken);
    const [showHamburger, setShowHamburger] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const hideHamburger = () => {
        setShowHamburger(false);
    };

    const hideSignIn = () => {
        setShowSignIn(false);
    };

    const hideSignUp = () => {
        setShowSignUp(false);
    };

    return <>
        {
            pathname === "/" && (
                <header className={`w-full ${lbFont.className} h-[182px] hidden md:block z-[200] bg-white fixed top-0`}>
                    <div className="py-[33px] flex justify-around items-center mg:px-[6%] lg:px-[5%]">
                        <Image src={Logo} alt="Unneu" className={`w-[85px] lg:w-[125px] lg:h-[44px] ${jwtToken.length === 0 ? "lg:ml-[-10px] xl:ml-[-20px] min-[1400px]:ml-[-22px]" : "lg:ml-[-25px] xl:ml-[-35px] min-[1400px]:ml-[-37px]"}`} />
                        <div className="w-[30%] md:w-[40%] relative">
                            <Image src={Search} alt="Search" className="w-[24px] h-[24px] absolute top-5 left-4" />
                            <input type="text" placeholder="Search for product" className={`rounded-[24px] w-full h-[64px] pl-[48px] ${poppins.className}`} style={{
                                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                            }} />
                        </div>
                        <Image src={Like} alt="Like" className="w-[24px] h-[24px] hover:cursor-pointer" />
                        <div className="w-[24px] h-[24px] relative">
                            <Image src={User} alt="User" className="w-[24px] h-[24px] hover:cursor-pointer" onClick={() => setShowProfile(x => !x)} />
                            {
                                showProfile && jwtToken.length > 0 && (
                                    <div className="absolute w-[310px] h-[350px] bg-[#FEEECB] right-0 top-[30px] rounded-tl-[30px] shadow-2xl">
                                        <div className="h-[22%] w-full bg-white p-[20px]">
                                            <Image src={BlankDP} alt="dp" className="w-[50px] h-[50px] rounded-[100%]" />
                                        </div>
                                        <div className="h-[0.8px] w-full bg-[#0000004d]"></div>
                                        <div className="w-full h-[77%] py-[20px] px-[36px] flex flex-col flex-nowrap justify-between">
                                            <div className="w-full flex flex-row flex-nowrap items-center text-[18px] font-medium hover:cursor-pointer">
                                                <Image src={Like} alt="wishlist" className="w-[22px] h-[20px] mr-[32px]" />
                                                Wishlist
                                            </div>
                                            <div className="w-full flex flex-row flex-nowrap items-center text-[18px] font-medium hover:cursor-pointer">
                                                <Image src={MyOrders} alt="orders" className="w-[22px] h-[20px] mr-[33px]" />
                                                My Orders
                                            </div>
                                            <div className="w-full flex flex-row flex-nowrap items-center text-[18px] font-medium hover:cursor-pointer">
                                                <Image src={Address} alt="address" className="w-[17px] h-[25px] mr-[36px]" />
                                                Address
                                            </div>
                                            <div className="w-full flex flex-row flex-nowrap items-center text-[18px] font-medium hover:cursor-pointer">
                                                <Image src={Settings} alt="privacy settings" className="w-[24px] h-[24px] mr-[30px]" />
                                                Privacy Settings
                                            </div>
                                            <div className="w-full flex flex-row flex-nowrap items-center text-[18px] font-medium hover:cursor-pointer" onClick={() => {
                                                setJwtToken("");
                                                setRefreshToken("");
                                                setShowProfile(false);
                                            }}>
                                                <Image src={Logout} alt="logout" className="w-[22px] h-[22px] mr-[30px]" />
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="relative w-[24px] h-[24px] hover:cursor-pointer default-background-svg cart-icon" onClick={() => {
                            if (cart.length > 0)
                                router.push("/purchase?slug=cart");
                        }}>
                            {
                                cart.length > 0 && (
                                    <div className="z-10 absolute bg-[#FBC246] rounded-[100%] h-[18px] w-[18px] top-[-5px] right-[-5px] text-[10px] font-medium flex flex-row flex-nowrap items-center justify-center">
                                        {cart.length}
                                    </div>
                                )
                            }
                        </div>
                        {/* <Image src={Cart} alt="Cart" className="w-[24px] h-[24px] hover:cursor-pointer" /> */}
                        {
                            jwtToken.length === 0 && refreshToken.length === 0 ? (
                                <>
                                    <div className="hover:cursor-pointer" onClick={() => {
                                        hideHamburger();
                                        setShowSignIn(true);
                                    }}>Log in</div>
                                    <button className="px-[28px] py-[16px] text-center rounded-[12px] bg-[#FE9135] text-white hover:bg-[#FBC246]" onClick={() => {
                                        hideHamburger();
                                        setShowSignUp(true);
                                    }}>Sign up</button>
                                </>
                            ) : (
                                null
                            )
                        }
                    </div>
                    <nav className="border-t border-t-[#dcdcdc99] border-b border-b-[#dcdcdc99] w-full px-[6%] 2xl:px-[7%] py-[25px] list-none flex gap-x-[38px] bg-white">
                        <li className="hover:cursor-pointer">Home</li>
                        <li className="hover:cursor-pointer">Shop</li>
                        <li className="hover:cursor-pointer" onClick={() => {
                            router.push("/seller/home");
                        }}>Sell</li>
                        <a href="#landing-page-howitworks-laptop"><li className="hover:cursor-pointer">How it works</li></a>
                        <li className="hover:cursor-pointer" onClick={() => {
                            router.push("/aboutUs");
                        }}>About us</li>
                        <a href="#faq-section"><li className="hover:cursor-pointer">FAQ</li></a>
                    </nav>
                </header>)}
        {
            showHamburger && pathname === "/" && (
                <nav className={`block ${pathname === "/" ? "md:hidden" : "lg:hidden"} bg-white max-w-[363px] w-[80%] h-[560px] list-none absolute z-50 rounded-tr-[24px] rounded-br-[24px]`} style={{
                    boxShadow: "0px 4px 78px 0px rgba(0, 0, 0, 0.25)"
                }} id="mobile-nav">
                    <Image src={CloseIcon} alt="close" className="w-[14px] h-[14px] absolute top-[90px] right-5" onClick={hideHamburger} />
                    <Image src={Like} alt="wishlist" className="w-[20px] h-[17px] absolute left-5 top-10" />
                    <div className="absolute top-10 left-[50px] text-[14px]">Wish list</div>
                    {
                        jwtToken.length === 0 && refreshToken.length === 0 ? (
                            <>
                                <li className="bg-[#FE9135] text-white py-[8px] px-[16px] text-center absolute left-5 top-20 rounded-[6px] font-medium hover:cursor-pointer" onClick={() => {
                                    hideHamburger();
                                    setShowSignUp(true);
                                }}>
                                    Sign up
                                </li>
                                <li className="py-[8px] px-[16px] text-center absolute left-[130px] top-20 rounded-[6px] font-medium border border-[#000] hover:cursor-pointer" onClick={() => {
                                    hideHamburger();
                                    setShowSignIn(true);
                                }}>
                                    Login
                                </li>
                            </>
                        ) : (
                            <li className="bg-[#FE9135] text-white py-[8px] px-[16px] text-center absolute left-5 top-20 rounded-[6px] font-medium hover:cursor-pointer" onClick={() => {
                                hideHamburger();
                                setJwtToken("");
                                setRefreshToken("");
                            }}>
                                Logout
                            </li>
                        )
                    }
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[150px]" />
                    <li className="flex flex-nowrap items-center gap-x-6 absolute top-[175px] left-5 text-[18px]" onClick={() => {
                        router.push("/buyer/home");
                    }}>
                        <Image src={Home} alt="home" className="w-[20px] h-[18px]" />
                        Home
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[220px]" />
                    <a href="#landing-page-seller" onClick={hideHamburger}>
                        <li className="flex flex-nowrap items-center gap-x-6 absolute top-[245px] left-5 text-[18px]">
                            <Image src={Sell} alt="sell" className="w-[20px] h-[18px]" />
                            Sell
                        </li>
                    </a>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[290px]" />
                    <a href="#landing-page-howitworks" onClick={hideHamburger}>
                        <li className="flex flex-nowrap items-center gap-x-6 absolute top-[315px] left-5 text-[18px]">
                            <Image src={HowItWorks} alt="how it works" className="w-[20px] h-[20px]" />
                            How it works
                        </li>
                    </a>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[360px]" />
                    <li className="flex flex-nowrap items-center gap-x-3 absolute top-[385px] left-5 text-[18px]" onClick={() => {
                        router.push("/aboutUs");
                    }}>
                        <Image src={AboutUs} alt="about us" className="w-[30px] h-[18px]" />
                        About us
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[430px]" />
                    <a href="#faq-section" onClick={hideHamburger}>
                        <li className="flex flex-nowrap items-center gap-x-6 absolute top-[455px] left-5 text-[18px]">
                            <Image src={FAQ} alt="FAQ" className="w-[20px] h-[20px]" />
                            FAQ
                        </li>
                    </a>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[500px]" />
                </nav>
            )
        }
        {
            showHamburger && pathname !== "/" && (
                <nav className={`block lg:hidden bg-white max-w-[363px] w-[80%] h-[560px] list-none absolute z-50 rounded-tr-[24px] rounded-br-[24px]`} style={{
                    boxShadow: "0px 4px 78px 0px rgba(0, 0, 0, 0.25)"
                }} id="mobile-nav">
                    <Image src={CloseIcon} alt="close" className="w-[14px] h-[14px] absolute top-[90px] right-5" onClick={hideHamburger} />
                    <Image src={Like} alt="wishlist" className="w-[20px] h-[17px] absolute left-5 top-10" />
                    <div className="absolute top-10 left-[50px] text-[14px]">Wish list</div>
                    {
                        jwtToken.length === 0 && refreshToken.length === 0 ? (
                            <>
                                <li className="bg-[#FE9135] text-white py-[8px] px-[16px] text-center absolute left-5 top-20 rounded-[6px] font-medium hover:cursor-pointer" onClick={() => {
                                    hideHamburger();
                                    setShowSignUp(true);
                                }}>
                                    Sign up
                                </li>
                                <li className="py-[8px] px-[16px] text-center absolute left-[130px] top-20 rounded-[6px] font-medium border border-[#000] hover:cursor-pointer" onClick={() => {
                                    hideHamburger();
                                    setShowSignIn(true);
                                }}>
                                    Login
                                </li>
                            </>
                        ) : (
                            <li className="bg-[#FE9135] text-white py-[8px] px-[16px] text-center absolute left-5 top-20 rounded-[6px] font-medium hover:cursor-pointer" onClick={() => {
                                hideHamburger();
                                setJwtToken("");
                                setRefreshToken("");
                            }}>
                                Logout
                            </li>
                        )
                    }
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[150px]" />
                    <li className="flex flex-nowrap items-center gap-x-6 absolute top-[175px] left-5 text-[18px]" onClick={() => {
                        router.push("/buyer/home");
                    }}>
                        <Image src={Home} alt="home" className="w-[20px] h-[18px]" />
                        Home
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[220px]" />
                    <li className="flex flex-nowrap items-center gap-x-6 absolute top-[245px] left-5 text-[18px]" onClick={() => {
                        router.push("/buyer/home");
                        hideHamburger();
                    }}>
                        <Image src={Sell} alt="sell" className="w-[20px] h-[18px]" />
                        Shop
                    </li>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[290px]" />
                    {/* <a href="#landing-page-howitworks" onClick={hideHamburger}>
                        <li className="flex flex-nowrap items-center gap-x-6 absolute top-[315px] left-5 text-[18px]">
                            <Image src={HowItWorks} alt="how it works" className="w-[20px] h-[20px]" />
                            How it works
                        </li>
                    </a>
                    <div className="bg-[#D4D4D4] h-[1px] w-full absolute top-[360px]" /> */}
                </nav>
            )
        }
        {
            pathname === "/" && (
                <header className={`${lbFont.className} block md:hidden h-[76px] flex items-center px-[15px] pt-[20px] pb-[20px] z-[200] sticky top-0 bg-white`}>
                    <Image src={Hamburger} alt="details" className="w-[20px] h-[14px]" onClick={() => {
                        setShowHamburger(true);
                    }} />
                    <Image src={Logo} alt="Unneu" className={`w-[103px] h-[36px] ${showSearch ? "ml-[4%] sm:ml-[10%]" : "ml-[29%] sm:ml-[36%]"}`} />
                    {
                        showSearch && (
                            <input type="text" placeholder="Search here" className="w-[112px] sm:w-[210px] py-[5px] pl-[2px] text-[14px] font-medium ml-4 border-b border-[#9C9C9C] outline-0" />
                        )
                    }
                    <Image src={Search} alt="Search" className={`w-[20px] h-[20px] ${showSearch ? "ml-[1%] sm:ml-[20%]" : "ml-[17%] sm:ml-[27%]"}`} onClick={() => {
                        setShowSearch(x => !x);
                    }} />
                    <div className="relative w-[24px] h-[24px] ml-[5%] hover:cursor-pointer default-background-svg cart-icon" onClick={() => {
                        if (cart.length > 0)
                            router.push("/purchase?slug=cart");
                    }}>
                        {
                            cart.length > 0 && (
                                <div className="z-10 absolute bg-[#FBC246] rounded-[100%] h-[18px] w-[18px] top-[-5px] right-[-5px] text-[10px] font-medium flex flex-row flex-nowrap items-center justify-center">
                                    {cart.length}
                                </div>
                            )
                        }
                    </div>
                    <SignInPopup showSignIn={showSignIn} hideSignIn={hideSignIn} />
                    <SignUpPopup showSignUp={showSignUp} hideSignUp={hideSignUp} />
                </header>
            )
        }
        {
            (pathname === "/seller/home" || pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem" || pathname === "/aboutUs" || pathname === "/buyer/home" || pathname === "/item" || pathname === "/buyer/category" || pathname === "/purchase") && (
                <header className={`w-full hidden ${lbFont.className} h-[90px] lg:flex flex-row flex-nowrap items-center justify-between fixed top-0 z-[2000] bg-white px-[5%]`}>
                    <Image src={Logo} alt="Unneu" className="w-[125px] h-[44px]" />
                    <nav className="list-none lg:ml-[4%] xl:ml-[4%] 2xl:ml-[8%] lg:w-[33%] xl:w-[30%] 2xl:w-[28%] flex flex-row flex-nowrap items-center justify-between">
                        <li className="text-[18px] hover:cursor-pointer" onClick={() => {
                            if (pathname.split("/")[1] === "seller" && !window.location.href.includes("?sellerId="))
                                router.push("/seller");
                            else
                                router.push("/buyer/home");
                        }}>Home</li>
                        <li className="text-[18px] hover:cursor-pointer" onClick={() => {
                            router.push("/buyer/home");
                        }}>Shop</li>
                        <li className="text-[18px] hover:cursor-pointer">Stories</li>
                        <li className="text-[18px] hover:cursor-pointer" onClick={() => {
                            router.push("/aboutUs");
                        }}>About Us</li>
                    </nav>
                    {
                        (pathname !== "/seller/home" && pathname !== "/seller" && pathname !== "/seller/editItem" && pathname !== "/seller/register/1" && pathname !== "/seller/register/2" && pathname !== "/seller/register/3" && pathname !== "/seller/uploadItem") && (
                            <div className="lg:w-[14%] xl:w-[13%] 2xl:w-[12%] flex flex-row flex-nowrap items-center justify-between">
                                <Image src={Search} alt="Search" className="w-[24px] h-[24px] hover:cursor-pointer" />
                                <Image src={User} alt="User" className="w-[24px] h-[24px] hover:cursor-pointer" onClick={() => setShowProfile(x => !x)} />
                                <div className="relative w-[24px] h-[24px] hover:cursor-pointer default-background-svg cart-icon" onClick={() => {
                                    if (cart.length > 0)
                                        router.push("/purchase?slug=cart");
                                }}>
                                    {
                                        cart.length > 0 && (
                                            <div className="z-10 absolute bg-[#FBC246] rounded-[100%] h-[18px] w-[18px] top-[-5px] right-[-5px] text-[10px] font-medium flex flex-row flex-nowrap items-center justify-center">
                                                {cart.length}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        (pathname === "/seller/home" || pathname === "/seller" || pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem") && (
                            <button className="text-[18px] font-bold bg-[#FE9135] py-[12px] px-[38px] rounded-[12px] text-white" onClick={() => {
                                setJwtToken("");
                                setRefreshToken("");
                                router.push("/");
                            }}>Logout</button>
                        )
                    }
                </header>
            )
        }
        {
            (pathname === "/seller/home" || pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem" || pathname === "/aboutUs" || pathname === "/buyer/home" || pathname === "/item" || pathname === "/buyer/category" || pathname === "/purchase") && (
                <header className={`w-full ${lbFont.className} block lg:hidden h-[76px] flex items-center px-[15px] pt-[20px] pb-[20px] z-[1000] fixed top-0 bg-white`}>
                    <a href="#mobile-nav">
                        <Image src={Hamburger} alt="details" className="w-[20px] h-[14px]" onClick={() => {
                            setShowHamburger(true);
                        }} />
                    </a>
                    <Image src={Logo} alt="Unneu" className={`w-[103px] h-[36px] ${showSearch ? "ml-[4%] sm:ml-[10%]" : "ml-[29%] sm:ml-[36%]"}`} />
                    {
                        (pathname !== "/seller/home" && pathname !== "/seller" && pathname !== "/seller/editItem" && pathname !== "/seller/register/1" && pathname !== "/seller/register/2" && pathname !== "/seller/register/3" && pathname !== "/seller/uploadItem") && showSearch && (
                            <input type="text" placeholder="Search here" className="w-[112px] sm:w-[210px] py-[5px] pl-[2px] text-[14px] font-medium ml-4 border-b border-[#9C9C9C] outline-0" />
                        )
                    }
                    {
                        (pathname !== "/seller/home" && pathname !== "/seller" && pathname !== "/seller/editItem" && pathname !== "/seller/register/1" && pathname !== "/seller/register/2" && pathname !== "/seller/register/3" && pathname !== "/seller/uploadItem") && (
                            <>
                                <Image src={Search} alt="Search" className={`w-[20px] h-[20px] ${showSearch ? "ml-[1%] min-[400px]:ml-[14%] min-[430px]:ml-[16%] min-[460px]:ml-[17%] min-[500px]:ml-[18%] sm:ml-[20%]" : "ml-[17%] min-[400px]:ml-[22%] min-[430px]:ml-[24%] min-[460px]:ml-[25%] min-[500px]:ml-[26%] sm:ml-[27%] md:ml-[32%]"}`} onClick={() => {
                                    setShowSearch(x => !x);
                                }} />
                                <div className="ml-[5%] relative w-[20px] h-[20px] hover:cursor-pointer default-background-svg cart-icon" onClick={() => {
                                    if (cart.length > 0)
                                        router.push("/purchase?slug=cart");
                                }}>
                                    {
                                        cart.length > 0 && (
                                            <div className="z-10 absolute bg-[#FBC246] rounded-[100%] h-[12px] w-[12px] top-[-5px] right-[-5px] text-[10px] font-medium flex flex-row flex-nowrap items-center justify-center">
                                                {cart.length}
                                            </div>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }
                    <SignInPopup showSignIn={showSignIn} hideSignIn={hideSignIn} />
                    <SignUpPopup showSignUp={showSignUp} hideSignUp={hideSignUp} />
                </header>
            )
        }
    </>
}