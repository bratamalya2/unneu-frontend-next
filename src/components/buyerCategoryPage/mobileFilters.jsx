"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Close from "@/../public/close.png";
import Reset from "@/../public/reset-filters.svg";
import DownArrow from "@/../public/down-arrow.png";
import UpArrow from "@/../public/up-arrow.png";
import Search from "@/../public/search.png";

import "@/styles/buyerPageFilters.css";

const availableColors = [
    "#893E3E",
    "#EFBD5B",
    "#3A9849",
    "#366884",
    "#7B7950",
    "#B63CB8",
    "#8D5AC0",
    "#7A3730",
    "#31908E",
    "#C49240"
];

export default function MobileFilters({ appliedFilters, addFilter, removeFilter, removeAllFilters, showMobileFilters, handleCloseMobileFilters }) {
    const [showNewlyListed, setShowNewlyListed] = useState(false);
    const [showColor, setShowColor] = useState(false);
    const [showSellerProfiles, setShowSellerProfiles] = useState(false);
    const [matchingStores, setMatchingStores] = useState([]);
    const [searchedSeller, setSearchedSeller] = useState("");
    const [searchTimer, setSearchTimer] = useState(null);

    const fetchMatchingSellers = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/getAllMatchingStoreNames`, {
                method: "GET",
                headers: {
                    matchingtext: searchedSeller
                }
            });
            const y = await x.json();
            if (y.success)
                setMatchingStores(y.stores);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (searchedSeller.length > 0) {
            if (searchTimer)
                clearTimeout(searchTimer);
            setSearchTimer(setTimeout(fetchMatchingSellers, 1500));
        }
        else {
            clearTimeout(searchTimer);
            setSearchTimer(null);
            setMatchingStores([]);
        }
    }, [searchedSeller]);

    useEffect(() => {
        if (!showSellerProfiles)
            setSearchedSeller("");
    }, [showSellerProfiles]);

    return <section className={`${showMobileFilters ? "w-full h-fit mt-[30px] pb-[50px]" : "w-0 h-0"} transition-[width] duration-500 ease-in-out absolute border-y-[0.5px] border-y-black rounded-t-[10px] sticky bg-white top-[20vh] z-50 overflow-y-auto`}>
        <div className="w-full px-[5%] mt-[20px] flex flex-row flex-nowrap items-center justify-between">
            <Image src={Close} alt="close" className="w-[15px] h-[15px]" onClick={handleCloseMobileFilters} />
            <div className="text-xl font-medium">Filter</div>
            <div className="flex flex-row flex-nowrap items-center gap-x-[10px] text-[#B73636]" onClick={removeAllFilters}>
                Reset
                <Image src={Reset} alt="reset" className="w-[15px] h-[15px]" />
            </div>
        </div>
        <section className="mt-[35px] w-full">
            <div className={`w-full h-[1px] bg-[#DDD]`}></div>
            <div className="py-[12px] px-[5%] flex flex-row flex-nowrap items-center justify-between font-medium">
                Newly listed
                <Image src={showNewlyListed ? UpArrow : DownArrow} alt="down" className="w-[11px] h-[5px]" onClick={() => {
                    setShowNewlyListed(x => !x);
                }} />
            </div>
            <div className={`w-full h-[1px] ${showNewlyListed ? "bg-black" : "bg-[#DDD]"}`}></div>
            {
                showNewlyListed && (
                    <>
                        <div className="py-[12px] px-[5%] flex flex-row flex-nowrap items-center justify-between text-sm">
                            <label>Within Last 7 Days</label>
                            <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("newly-listed=7")} onChange={e => {
                                if (e.target.checked)
                                    addFilter("newly-listed=7");
                                else
                                    removeFilter("newly-listed=7");
                            }} />
                        </div>
                        <div className="bg-[#DDD] w-full h-[1px]"></div>
                        <div className="py-[12px] px-[5%] flex flex-row flex-nowrap items-center justify-between text-sm">
                            <label>Within Last 14 Days</label>
                            <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("newly-listed=14")} onChange={e => {
                                if (e.target.checked)
                                    addFilter("newly-listed=14");
                                else
                                    removeFilter("newly-listed=14");
                            }} />
                        </div>
                        <div className="bg-[#DDD] w-full h-[1px]"></div>
                        <div className="py-[12px] px-[5%] flex flex-row flex-nowrap items-center justify-between text-sm">
                            <label>Within Last 30 Days</label>
                            <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("newly-listed=30")} onChange={e => {
                                if (e.target.checked)
                                    addFilter("newly-listed=30");
                                else
                                    removeFilter("newly-listed=30");
                            }} />
                        </div>
                        <div className="bg-[#DDD] w-full h-[1px]"></div>
                    </>
                )
            }
            <div className="py-[12px] px-[5%] flex flex-row flex-nowrap items-center justify-between font-medium">
                By Color
                <Image src={showColor ? UpArrow : DownArrow} alt="down" className="w-[11px] h-[5px]" onClick={() => {
                    setShowColor(x => !x);
                }} />
            </div>
            <div className={`w-full h-[1px] ${showColor ? "bg-black" : "bg-[#DDD]"}`}></div>
            {
                showColor && (
                    <>
                        <ul className="py-[12px] px-[5%] list-none flex flex-col flex-nowrap items-center gap-y-[12px] justify-between text-sm">
                            {
                                availableColors.map((col, i) => (
                                    <>
                                        <li className="w-full flex flex-row flex-nowrap items-center justify-between gap-x-2" key={i}>
                                            <div className="w-[50px] h-[15px]" style={{
                                                backgroundColor: col
                                            }}></div>
                                            <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes(`color=${col}`)} onChange={e => {
                                                if (e.target.checked)
                                                    addFilter(`color=${col}`);
                                                else
                                                    removeFilter(`color=${col}`);
                                            }} />
                                        </li>
                                        <div className="bg-[#DDD] w-full h-[1px]"></div>
                                    </>
                                ))
                            }
                        </ul>
                    </>
                )
            }
            <div className="py-[12px] px-[5%] flex flex-row flex-nowrap items-center justify-between font-medium">
                By Seller Profile
                <Image src={showSellerProfiles ? UpArrow : DownArrow} alt="down" className="w-[11px] h-[5px]" onClick={() => {
                    setShowSellerProfiles(x => !x);
                }} />
            </div>
            <div className={`w-full h-[1px] ${showSellerProfiles ? "bg-black" : "bg-[#DDD]"}`}></div>
            {
                showSellerProfiles && (
                    <div className="my-[15px] relative w-[80%] mx-auto">
                        <input type="text" className="w-full h-[40px] rounded-[8px] border border-black pl-[30px]" placeholder="Search by profile" onChange={e => setSearchedSeller(e.target.value)} />
                        <Image src={Search} alt="search" className="absolute w-[16px] h-[16px] left-2 top-3" />
                    </div>
                )
            }
            {
                showSellerProfiles && searchedSeller.length > 0 && (
                    matchingStores.length > 0 ? (
                        <ul className="px-[5%] list-none flex flex-col gap-y-2">
                            {
                                matchingStores.map((store, index) => (
                                    <li className="w-full flex flex-row flex-nowrap items-center gap-x-2" key={index}>
                                        <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes(`seller=${store.storeName}`)} onChange={e => {
                                            if (e.target.checked)
                                                addFilter(`seller=${store.storeName}`);
                                            else
                                                removeFilter(`seller=${store.storeName}`);
                                        }} />
                                        <label className="text-sm">{store.storeName}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <div className="px-[5%] mt-[30px] text-sm">No matching sellers</div>
                    )
                )
            }
        </section>
    </section>
}