"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import UpArrow from "@/../public/up-arrow.png";
import DownArrow from "@/../public/down-arrow.png";
import Search from "@/../public/search.png";
import Sort from "@/../public/items-sort.svg";
import Filter from "@/../public/items-filter.svg";
import Close from "@/../public/close.png";

import "@/styles/buyerPageFilters.css";

const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Listed recently",
    "Listed early"
];

const availableColors = [
    "#FFF",
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

export default function Filters({ appliedFilters, addFilter, removeFilter, handleShowMobileFilters, sortBy, setSortBy }) {
    const [showNewlyListed, setShowNewlyListed] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [matchingStores, setMatchingStores] = useState([]);
    const [searchedSeller, setSearchedSeller] = useState("");
    const [searchTimer, setSearchTimer] = useState(null);
    const [showSortOptions, setShowSortOptions] = useState(false);

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
        if (!showProfile)
            setSearchedSeller("");
    }, [showProfile]);

    return <>
        <aside className="lg:pl-[5%] lg:pr-0 hidden lg:block lg:w-[25%] xl:w-[25%] 2xl:w-[22%]">
            <p className="mb-[70px] lg:text-3xl">Filters</p>
            <div className="w-full flex flex-row flex-nowrap items-center justify-between">
                <p className="text-xl">Newly Listed</p>
                <Image src={showNewlyListed ? UpArrow : DownArrow} alt="show/hide" className="w-[11px] h-[5px] hover:cursor-pointer mr-10" onClick={() => {
                    setShowNewlyListed(x => !x);
                }} />
            </div>
            {
                showNewlyListed && <ul className="mt-[30px] list-none flex flex-col gap-y-2">
                    <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                        <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("newly-listed=7")} onChange={e => {
                            if (e.target.checked)
                                addFilter("newly-listed=7");
                            else
                                removeFilter("newly-listed=7");
                        }} />
                        <label>Within Last 7 Days</label>
                    </li>
                    <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                        <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("newly-listed=14")} onChange={e => {
                            if (e.target.checked)
                                addFilter("newly-listed=14");
                            else
                                removeFilter("newly-listed=14");
                        }} />
                        <label>Within Last 14 Days</label>
                    </li>
                    <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                        <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("newly-listed=30")} onChange={e => {
                            if (e.target.checked)
                                addFilter("newly-listed=30");
                            else
                                removeFilter("newly-listed=30");
                        }} />
                        <label>Within Last 30 Days</label>
                    </li>
                </ul>
            }
            <div className="mt-[25px] w-full flex flex-row flex-nowrap items-center justify-between">
                <p className="text-xl">By Color</p>
                <Image src={showColors ? UpArrow : DownArrow} alt="show/hide" className="w-[11px] h-[5px] hover:cursor-pointer mr-10" onClick={() => {
                    setShowColors(x => !x);
                }} />
            </div>
            {
                showColors && <ul className="mt-[30px] list-none flex flex-col gap-y-2">
                    {
                        availableColors.map((col, i) => (
                            <li className="w-full flex flex-row flex-nowrap items-center gap-x-2" key={i}>
                                <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes(`color=${col}`)} onChange={e => {
                                    if (e.target.checked)
                                        addFilter(`color=${col}`);
                                    else
                                        removeFilter(`color=${col}`);
                                }} />
                                <div className={`w-[50px] h-[15px] ${col === "#FFF" && "border-[0.5px] border-black"}`} style={{
                                    backgroundColor: col
                                }}></div>
                            </li>
                        ))
                    }
                </ul>
            }
            <div className="my-[25px] w-full flex flex-row flex-nowrap items-center justify-between">
                <p className="text-xl">By Seller Profile</p>
                <Image src={showProfile ? UpArrow : DownArrow} alt="show/hide" className="w-[11px] h-[5px] hover:cursor-pointer mr-10" onClick={() => {
                    setShowProfile(x => !x);
                }} />
            </div>
            {
                showProfile && (
                    <div className="mb-[30px] relative w-full">
                        <input type="text" className="w-full h-[40px] rounded-[8px] border border-black pl-[30px]" placeholder="Search by profile" onChange={e => setSearchedSeller(e.target.value)} />
                        <Image src={Search} alt="search" className="absolute w-[16px] h-[16px] left-2 top-3" />
                    </div>
                )
            }
            {
                showProfile && searchedSeller.length > 0 && (
                    matchingStores.length > 0 ? (
                        <ul className="mt-[30px] list-none flex flex-col gap-y-2">
                            {
                                matchingStores.map((store, index) => (
                                    <li className="w-full flex flex-row flex-nowrap items-center gap-x-2" key={index}>
                                        <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes(`seller=${store.storeName}`)} onChange={e => {
                                            if (e.target.checked)
                                                addFilter(`seller=${store.storeName}`);
                                            else
                                                removeFilter(`seller=${store.storeName}`);
                                        }} />
                                        <label>{store.storeName}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <div className="mt-[30px]">No matching sellers</div>
                    )
                )
            }
        </aside>
        <aside className="px-[5%] lg:hidden w-full">
            <section className="mt-[24px] w-full flex flex-row flex-nowrap items-center justify-between">
                <div className="flex flex-row flex-nowrap items-center gap-x-[7px] px-[28px] py-[12px] border-[1.5px] border-[#E9E9E9] rounded-[8px]" onClick={handleShowMobileFilters}>
                    <Image src={Filter} alt="filter" className="w-[20px] h-[17px]" />
                    Filter
                </div>
                <div className="flex flex-row flex-nowrap items-center gap-x-[7px] px-[20px] py-[12px] border-[1.5px] border-[#E9E9E9] rounded-[8px]" onClick={() => {
                    setShowSortOptions(x => !x)
                }}>
                    <Image src={Sort} alt="filter" className="w-[18px] h-[15px]" />
                    Sort by
                </div>
            </section>
        </aside>
        {
            showSortOptions && (
                <aside className="w-[90%] mx-auto lg:hidden bg-white border-b border-x border-x-[#DDD] border-b-[#DDD]">
                    {
                        sortOptions.map((option, i) => (
                            <div key={i} className="w-full">
                                <div className="relative w-[90%] mx-auto py-[13px]  ">
                                    {option}
                                    <input type="radio" className="absolute right-0 w-[21px] custom-radio" checked={sortBy === option} onChange={e => {
                                        if (e.target.checked)
                                            setSortBy(option);
                                    }} />
                                </div>
                                {
                                    i < sortOptions.length - 1 && (
                                        <div className="w-full h-[1px] bg-[#DDD]"></div>
                                    )
                                }
                            </div>
                        ))
                    }
                </aside>
            )
        }
        <section className="mt-[15px] px-[5%] lg:hidden w-full flex flex-row flex-wrap gap-x-[10px] gap-y-[10px]">
            {
                appliedFilters.map((filter, index) => {
                    switch (filter.split("=")[0]) {
                        case "newly-listed":
                            return <div className="bg-[#FEEECB] relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] text-xs" key={index}>Within {filter.split("=")[1]} days
                                <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-[15px] right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                            </div>
                        case "occasion":
                            return <div className="bg-[#FEEECB] relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] text-xs" key={index}>{filter.split("=")[1]}
                                <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-[15px] right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                            </div>
                        case "color":
                            return <div className="bg-[#FEEECB] relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] flex flex-row flex-nowrap text-xs" key={index}>Color: <div className={`ml-3 rounded-[100%] w-[20px] h-[20px]`} style={{
                                backgroundColor: filter.split("=")[1]
                            }}></div>
                                <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-[15px] right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                            </div>
                        case "seller":
                            return <div className="bg-[#FEEECB] relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] text-xs" key={index}>Seller: {filter.split("=")[1]}
                                <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-[15px] right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                            </div>
                    }
                })
            }
        </section>
    </>
}