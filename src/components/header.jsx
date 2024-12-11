"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    const setPhoneNumberAtStore = useUnneuDataStore(store => store.setPhoneNumber);
    const showSignUp = useUnneuDataStore(store => store.showSignUp);
    const setShowSignUp = useUnneuDataStore(store => store.setShowSignUp);
    const cart = useUnneuDataStore(store => store.cart);
    const jwtToken = useUnneuDataStore(store => store.jwtToken);
    const refreshToken = useUnneuDataStore(store => store.refreshToken);
    const setJwtToken = useUnneuDataStore(store => store.setJwtToken);
    const setRefreshToken = useUnneuDataStore(store => store.setRefreshToken);
    const showHamburger = useUnneuDataStore(store => store.showHamburger);
    const setShowHamburger = useUnneuDataStore(store => store.setShowHamburger);
    const [showSearch, setShowSearch] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search bar visibility

     // New state for search
const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [searchSuggestions, setSearchSuggestions] = useState({ stores: [], categories: [] });
const [showSearchResults, setShowSearchResults] = useState(false);
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const handleSearch = async (query) => {
    if (!query) {
        setSearchResults([]);
        setSearchSuggestions({ stores: [], categories: [] });
        setShowSearchResults(false);
        return;
    }

    try {
        
        // Updated to match the backend route in search.js
        const itemsResponse = await fetch(`${backendUrl}/search/searchItems?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        

        const suggestionsResponse = await fetch(`${backendUrl}/search/suggestSearchTerms?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Detailed error logging
        if (!itemsResponse.ok) {
            const errorText = await itemsResponse.text();
            console.error('Items Search Error:', {
                status: itemsResponse.status,
                statusText: itemsResponse.statusText,
                errorText
            });
            throw new Error(`Items search failed: ${errorText}`);
        }

        if (!itemsResponse.ok || !suggestionsResponse.ok) {
            throw new Error('Search request failed');
        }

        const itemsData = await itemsResponse.json();
        const suggestionsData = await suggestionsResponse.json();

        // Set search results and suggestions
        setSearchResults(itemsData.items || []);
        setSearchSuggestions(suggestionsData.suggestions || { stores: [], categories: [] });
        setShowSearchResults((itemsData.items && itemsData.items.length > 0) || 
                             (suggestionsData.suggestions && 
                              (suggestionsData.suggestions.stores.length > 0 || 
                               suggestionsData.suggestions.categories.length > 0)));
    } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
        setSearchSuggestions({ stores: [], categories: [] });
        setShowSearchResults(false);
    }
};

// Debounce search to reduce unnecessary API calls
useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (searchQuery.trim()) {
            handleSearch(searchQuery);
        }
    }, 300);

    return () => clearTimeout(timeoutId);
}, [searchQuery]);


    // Handle search input change
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    // Handle search result click
    const handleSearchResultClick = (sareeId) => {
        // Navigate to the specific saree page
        router.push(`http://localhost:3000/item?itemId=${sareeId}`);
        setShowSearchResults(false);
    };

    //handle store routing:
    const handleStoreClick = (sellerId) => {
        // Format the URL for routing to the store
        const baseUrl = "http://localhost:3000"; // Update as needed for your environment
        const storeUrl = `${baseUrl}/seller?sellerId=${encodeURIComponent(sellerId)}`;
        
        // Navigate to the specific store page
        router.push(storeUrl);
    };

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const searchContainer = document.getElementById('search-container');
            if (searchContainer && !searchContainer.contains(event.target)) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const hideHamburger = () => {
        setShowHamburger(false);
    };

    const hideSignIn = () => {
        setShowSignIn(false);
    };

    const hideSignUp = () => {
        setShowSignUp(false);
    };

     // Toggle search bar visibility
     const toggleSearch = () => {
        setIsSearchVisible((prev) => !prev);
    };

    return <>
        {
            pathname === "/" && (
                <header className={`w-full ${lbFont.className} h-[182px] hidden md:block z-[200] bg-white fixed top-0`}>
                    <div className="py-[33px] flex justify-between items-center md:px-[6%] lg:pl-[5.5%] lg:pr-[5%]">
                        <Image src={Logo} alt="Unneu" className={`w-[85px] lg:w-[125px] lg:h-[44px] cursor-pointer`} onClick={()=> router.push('/')}/>
                        <div className="w-[30%] md:w-[40%] relative" id="search-container">
                            <Image src={Search} alt="Search" className="w-[24px] h-[24px] absolute top-5 left-4" />
                            <input 
                                type="text" 
                                placeholder="Search for product" 
                                className={`rounded-[24px] w-full h-[64px] pl-[48px] ${poppins.className}`} 
                                style={{
                                    boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                                }}
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            {showSearchResults && (
                                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-[24px] max-h-[300px] overflow-y-auto z-50">
                                    {/* Item Results Section */}
                                    {searchResults.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Items</div>
                                            {searchResults.map((saree) => (
                                                <div 
                                                    key={saree.itemId} 
                                                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                                                    onClick={() => handleSearchResultClick(saree.itemId)}
                                                >
                                                    {saree.imageUrl && (
                                                        <Image 
                                                            src={saree.imageUrl} 
                                                            alt={saree.itemName || 'Saree'} 
                                                            width={50} 
                                                            height={50} 
                                                            className="mr-3"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-bold">{saree.itemName || 'Unnamed Saree'}</div>
                                                        <div className="text-sm text-gray-600">{saree.description || 'No description available'}</div>
                                                        <div className="text-sm text-gray-500">₹{saree.sellingPrice}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Suggestions Section */}
                                    {(searchSuggestions.stores.length > 0 || searchSuggestions.categories.length > 0) && (
                                        <div>
                                            {searchSuggestions.stores.length > 0 && (
                                                <div>
                                                    <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Stores</div>
                                                    {searchSuggestions.stores.map((store) => (
                                                        <div 
                                                            key={store.sellerId} 
                                                            className="p-3 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleStoreClick(store.sellerId)}
                                                        >
                                                            <div className="font-bold">{store.storeName}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {searchSuggestions.categories.length > 0 && (
                                                <div>
                                                    <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Categories</div>
                                                    {searchSuggestions.categories.map((category) => (
                                                        <div 
                                                            key={category} 
                                                            className="p-3 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {/* Handle category navigation */}}
                                                        >
                                                            <div className="font-bold">{category}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
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
                                                setPhoneNumberAtStore("");
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
                            jwtToken.length === 0 && refreshToken.length === 0 ?
                                (
                                    <>
                                        <div className="font-semibold hover:cursor-pointer" onClick={() => {
                                            hideHamburger();
                                            setShowSignIn(true);
                                        }}>Log in</div>
                                        <button className="font-semibold px-[28px] py-[16px] text-center rounded-[12px] bg-[#FE9135] text-white hover:bg-[#FBC246]" onClick={() => {
                                            hideHamburger();
                                            setShowSignUp(true);
                                        }}>Sign up</button>
                                    </>
                                ) :
                                (
                                    <button className="font-semibold px-[28px] py-[16px] text-center rounded-[12px] bg-[#FE9135] text-white hover:bg-[#FBC246]" onClick={() => {
                                        hideHamburger();
                                        setJwtToken("");
                                        setRefreshToken("");
                                    }}>Logout</button>
                                )
                        }
                    </div>
                    <nav className="border-t border-t-[#dcdcdc99] border-b border-b-[#dcdcdc99] w-full px-[6%] 2xl:px-[7%] py-[25px] list-none flex gap-x-[38px] bg-white">
                        <li className="hover:cursor-pointer">Home</li>
                        <li className="hover:cursor-pointer" onClick={() => {
                            router.push("/buyer/home");
                        }}>Shop</li>
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
                <nav className={`mt-[60px] block ${pathname === "/" ? "md:hidden" : "lg:hidden"} bg-white max-w-[363px] w-[70%] h-[560px] list-none absolute z-50 rounded-tr-[24px] rounded-br-[24px]`} style={{
                    boxShadow: "0px 4px 78px 0px rgba(0, 0, 0, 0.25)"
                }} id="mobile-nav">
                    <Image src={CloseIcon} alt="close" className="w-[14px] h-[14px] absolute top-[40px] right-2 min-[360px]:right-5" onClick={hideHamburger} />
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
                                setPhoneNumberAtStore("");
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
                    <Link href="/seller/home" onClick={hideHamburger}>
                        <li className="flex flex-nowrap items-center gap-x-6 absolute top-[245px] left-5 text-[18px]">
                            <Image src={Sell} alt="sell" className="w-[20px] h-[18px]" />
                            Sell
                        </li>
                    </Link>
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
                <nav className={`mt-[20px] block lg:hidden bg-white max-w-[363px] w-[70%] h-[560px] list-none absolute z-50 rounded-tr-[24px] rounded-br-[24px]`} style={{
                    boxShadow: "0px 4px 78px 0px rgba(0, 0, 0, 0.25)"
                }} id="mobile-nav">
                    <Image src={CloseIcon} alt="close" className="w-[14px] h-[14px] absolute top-[90px] right-2 min-[360px]:right-5" onClick={hideHamburger} />
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
                                setPhoneNumberAtStore("");
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
                <header className={`${lbFont.className} md:hidden h-[76px] flex items-center px-[15px] pt-[20px] pb-[20px] z-[200] sticky top-0 bg-white`}>
                    <Image src={Hamburger} alt="details" className="w-[20px] h-[14px]" onClick={() => {
                        setShowHamburger(true);
                    }} />
                    <Image src={Logo} alt="Unneu" onClick={() => router.push('/')}  className={`w-[103px] h-[36px] cursor-pointer ${showSearch ? "ml-[4%] sm:ml-[10%]" : "ml-[29%] sm:ml-[36%]"}`} />
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
            // Buyer/home path settings! and header  functioanlity
            (pathname === "/seller/home" || pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller/editProfile/1" || pathname === "/seller/editProfile/2" || pathname === "/seller/editProfile/3" || pathname === "/seller" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem" || pathname === "/aboutUs" || pathname === "/contactUs" || pathname === "/terms&conditions" || pathname === "/cancellation&refund" || pathname === "/buyer/home" || pathname === "/item" || pathname === "/buyer/category" || pathname === "/purchase") && (
                <header className={`w-full hidden ${lbFont.className} h-[90px] lg:flex flex-row flex-nowrap items-center  ${(jwtToken.length > 0 && refreshToken.length > 0) || pathname === "/buyer/home" ? "justify-between" : "justify-between"} fixed top-0 z-[2000] bg-white px-[5%]`}>
                    <Image src={Logo} alt="Unneu" className="w-[125px] h-[44px]" onClick={() => router.push('/')} />
                    <nav className={`list-none ${jwtToken.length > 0 && refreshToken.length > 0 ? "lg:ml-[4%] xl:ml-[4%] 2xl:ml-[8%]" : "lg:ml-[18%] xl:ml-[22%] 2xl:ml-[24%]"}  lg:w-[33%] xl:w-[30%] 2xl:w-[28%] flex flex-row flex-nowrap items-center justify-between`}>
                        <li className="text-[18px] hover:cursor-pointer" onClick={() => {
                            if (pathname.split("/")[1] === "seller" && !window.location.href.includes("?sellerId="))
                                router.push("/seller");
                            else
                                router.push("/buyer/home");
                        }}>Home</li>
                        {
                            (pathname === "/buyer/home" || pathname === "/item" || pathname === "/buyer/category" || pathname === "/purchase") ? (
                                <li className="text-[18px] hover:cursor-pointer" onClick={() => {
                                    router.push("/seller/home");
                                }}>Sell</li>
                            ) : (
                                <li className="text-[18px] hover:cursor-pointer" onClick={() => {
                                    router.push("/buyer/home");
                                }}>Shop</li>
                            )
                        }
                        <li className="text-[18px] hover:cursor-pointer">Stories</li>
                        <li className="text-[18px] hover:cursor-pointer" onClick={() => {
                            router.push("/aboutUs");
                        }}>About Us</li>
                    </nav>

                    <div className="lg:w-[14%] xl:w-[13%] 2xl:w-[25%] flex flex-row items-center justify-between">
      
                            {/* Login/Signup Buttons or User Profile */}
                            <div className="flex items-center space-x-3 w-[80%] ml-[120px]">
                                {jwtToken.length === 0 ? (
                                <>
                                    <button
                                    className={`${lbFont.className} text-base font-semibold text-black`}
                                    onClick={() => setShowSignIn(true)}
                                    >
                                    Login
                                    </button>
                                    <div
                                    className="relative w-6 h-6 hover:cursor-pointer default-background-svg cart-icon"
                                    onClick={() => {
                                        if (jwtToken.length === 0) {
                                          setShowSignUp(true);
                                          setShowSignIp(true);
                                        } else if (cart.length > 0) {
                                          router.push('/purchase?slug=cart');
                                        }
                                      }}
                                >
                                    {cart.length > 0 && (
                                    <div className="z-20 absolute bg-[#FBC246] rounded-full h-[18px] w-[18px] top-[-5px] right-[-5px] text-[10px] font-medium flex items-center justify-center">
                                        {cart.length}
                                    </div>
                                    )}
                                </div>
                                    {/* <button
                                    className="text-base font-medium bg-[#FE9135] py-2 px-4 rounded-[12px] text-white"
                                    onClick={() => setShowSignUp(true)}
                                    >
                                    Sign Up
                                    </button> */}
                                </>
                                ) : (
                                    <p></p>
                                )}
                            </div>

                            {/* Cart Icon */}
                            
                         </div>

                    {
                        (pathname !== "/seller/home" && pathname !== "/seller" && pathname !== "/seller/editItem" && pathname !== "/seller/register/1" && pathname !== "/seller/register/2" && pathname !== "/seller/register/3" && pathname !== "/seller/editProfile/1" && pathname !== "/seller/editProfile/2" && pathname !== "/seller/editProfile/3" && pathname !== "/seller/uploadItem") && (jwtToken.length > 0 && refreshToken.length > 0) && (
                            <div className="lg:w-[14%] xl:w-[13%] 2xl:w-[25%] flex flex-row flex-nowrap items-center justify-between relative" >
                                {/*TODO:Search functionality */}
                                <div className="w-[30%] md:w-[70%]">
                    {!isSearchVisible ? (
                        <Image
                            src={Search}
                            alt="Search"
                            className="w-[24px] h-[24px] hover:cursor-pointer ml-56"
                            onClick={toggleSearch} // Toggle search bar on click
                        />
                    ) : (
                        <div
                            className={`transition-transform duration-300 ease-in-out ${
                                isSearchVisible ? "scale-100" : "scale-0"
                            } w-full`}
                        >
                            <input
                                type="text"
                                placeholder="Search for product"
                                className="rounded-[24px] w-full h-[64px] pl-[48px] poppins-class"
                                style={{ boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)" }}
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                    {showSearchResults && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-[24px] max-h-[300px] overflow-y-auto z-50">
                            {/* Item Results */}
                            {searchResults.length > 0 && (
                                <div>
                                    <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Items</div>
                                    {searchResults.map((item) => (
                                        <div
                                            key={item.itemId}
                                            className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={() => handleSearchResultClick(item.itemId)}
                                        >
                                            {item.imageUrl && (
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.itemName || "Unnamed Item"}
                                                    width={50}
                                                    height={50}
                                                    className="mr-3"
                                                />
                                            )}
                                            <div>
                                                <div className="font-bold">{item.itemName || "Unnamed Item"}</div>
                                                <div className="text-sm text-gray-600">{item.description || "No description available"}</div>
                                                <div className="text-sm text-gray-500">₹{item.sellingPrice}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Suggestions */}
                            {(searchSuggestions.stores.length > 0 || searchSuggestions.categories.length > 0) && (
                                <div>
                                    {/* Store Suggestions */}
                                    {searchSuggestions.stores.length > 0 && (
                                        <div>
                                            <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Stores</div>
                                            {searchSuggestions.stores.map((store) => (
                                                <div
                                                    key={store.sellerId}
                                                    className="p-3 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleStoreClick(store.sellerId)}
                                                >
                                                    <div className="font-bold">{store.storeName}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                                            {/* Category Suggestions */}
                                                            {searchSuggestions.categories.length > 0 && (
                                                                <div>
                                                                    <div className="px-4 py-2 bg-gray-100 text-sm font-semibold">Categories</div>
                                                                    {searchSuggestions.categories.map((category) => (
                                                                        <div
                                                                            key={category}
                                                                            className="p-3 hover:bg-gray-100 cursor-pointer"
                                                                            onClick={() => {
                                                                                /* Handle category navigation */
                                                                            }}
                                                                        >
                                                                            <div className="font-bold">{category}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
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
                                                setPhoneNumberAtStore("");
                                            }}>
                                                <Image src={Logout} alt="logout" className="w-[22px] h-[22px] mr-[30px]" />
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
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
                        (pathname === "/seller/home" || pathname === "/seller" || pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller/editProfile/1" || pathname === "/seller/editProfile/2" || pathname === "/seller/editProfile/3" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem") && (jwtToken.length > 0 && refreshToken.length > 0) && (
                            <button className="text-[18px] font-bold bg-[#FE9135] py-[12px] px-[38px] rounded-[12px] text-white" onClick={() => {
                                setJwtToken("");
                                setRefreshToken("");
                                router.push("/");
                                setPhoneNumberAtStore("");
                            }}>Logout</button>
                        )
                    }
                </header>
            )
        }
        {
            (pathname === "/seller/home" || pathname === "/seller/register/1" || pathname === "/seller/register/2" || pathname === "/seller/register/3" || pathname === "/seller/editProfile/1" || pathname === "/seller/editProfile/2" || pathname === "/seller/editProfile/3" || pathname === "/seller" || pathname === "/seller/uploadItem" || pathname === "/seller/editItem" || pathname === "/aboutUs" || pathname === "/buyer/home" || pathname === "/item" || pathname === "/buyer/category" || pathname === "/purchase") && (
                <header className={`w-full ${lbFont.className} lg:hidden h-[76px] flex items-center px-[15px] pt-[20px] pb-[20px] z-[1000] fixed top-0 bg-white`}>
                    <a href="#mobile-nav">
                        <Image src={Hamburger} alt="details" className="w-[20px] h-[14px]" onClick={() => {
                            setShowHamburger(true);
                        }} />
                    </a>
                    <Image src={Logo} alt="Unneu" onClick={() => router.push('/')} className={`w-[103px] h-[36px] ${showSearch ? "ml-[4%] sm:ml-[10%]" : "ml-[29%] sm:ml-[36%]"}`} />
                    {
                        (pathname !== "/seller/home" && pathname !== "/seller" && pathname !== "/seller/editItem" && pathname !== "/seller/register/1" && pathname !== "/seller/register/2" && pathname !== "/seller/register/3" && pathname !== "/seller/uploadItem") && showSearch && (
                            <input type="text" placeholder="Search here" className="w-[112px] sm:w-[210px] py-[5px] pl-[2px] text-[14px] font-medium ml-4 border-b border-[#9C9C9C] outline-0" />
                        )
                    }
                    {
                        (pathname !== "/seller/home" && pathname !== "/seller" && pathname !== "/seller/editItem" && pathname !== "/seller/register/1" && pathname !== "/seller/register/2" && pathname !== "/seller/register/3" && pathname !== "/seller/editProfile/1" && pathname !== "/seller/editProfile/2" && pathname !== "/seller/editProfile/3" && pathname !== "/seller/uploadItem") && (
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