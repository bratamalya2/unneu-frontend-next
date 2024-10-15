"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import UpArrow from "@/../public/up-arrow.png";
import DownArrow from "@/../public/down-arrow.png";
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

export default function Filters({ appliedFilters, addFilter, removeFilter }) {
    const [showNewlyListed, setShowNewlyListed] = useState(false);
    const [showOccasion, setShowOccasion] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
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
        if (!showProfile)
            setSearchedSeller("");
    }, [showProfile]);

    return <aside className="lg:w-[20%]">
        <p className="mb-[70px] lg:text-3xl">Filters</p>
        <div className="w-full flex flex-row flex-nowrap items-center justify-between">
            <p className="text-xl">Newly Listed</p>
            <Image src={showNewlyListed ? UpArrow : DownArrow} alt="show/hide" className="w-[11px] h-[5px] hover:cursor-pointer" onClick={() => {
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
            <p className="text-xl">By Occasion</p>
            <Image src={showOccasion ? UpArrow : DownArrow} alt="show/hide" className="w-[11px] h-[5px] hover:cursor-pointer" onClick={() => {
                setShowOccasion(x => !x);
            }} />
        </div>
        {
            showOccasion && <ul className="mt-[30px] list-none flex flex-col gap-y-2">
                <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                    <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("occasion=New Arrivals")} onChange={e => {
                        if (e.target.checked)
                            addFilter("occasion=New Arrivals");
                        else
                            removeFilter("occasion=New Arrivals");
                    }} />
                    <label>New Arrivals</label>
                </li>
                <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                    <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("occasion=Festive Wear")} onChange={e => {
                        if (e.target.checked)
                            addFilter("occasion=Festive Wear");
                        else
                            removeFilter("occasion=Festive Wear");
                    }} />
                    <label>Festive Wear</label>
                </li>
                <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                    <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("occasion=Bridal Wear")} onChange={e => {
                        if (e.target.checked)
                            addFilter("occasion=Bridal Wear");
                        else
                            removeFilter("occasion=Bridal Wear");
                    }} />
                    <label>Bridal Wear</label>
                </li>
                <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                    <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("occasion=Party Wear")} onChange={e => {
                        if (e.target.checked)
                            addFilter("occasion=Party Wear");
                        else
                            removeFilter("occasion=Party Wear");
                    }} />
                    <label>Party Wear</label>
                </li>
                <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                    <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("occasion=Casual Wear")} onChange={e => {
                        if (e.target.checked)
                            addFilter("occasion=Casual Wear");
                        else
                            removeFilter("occasion=Casual Wear");
                    }} />
                    <label>Casual Wear</label>
                </li>
                <li className="w-full flex flex-row flex-nowrap items-center gap-x-2">
                    <input type="checkbox" className="custom-filter-checkbox" checked={appliedFilters.includes("occasion=Daily Wear")} onChange={e => {
                        if (e.target.checked)
                            addFilter("occasion=Daily Wear");
                        else
                            removeFilter("occasion=Daily Wear");
                    }} />
                    <label>Daily Wear</label>
                </li>
            </ul>
        }
        <div className="mt-[25px] w-full flex flex-row flex-nowrap items-center justify-between">
            <p className="text-xl">By Color</p>
            <Image src={showColors ? UpArrow : DownArrow} alt="show/hide" className="w-[11px] h-[5px] hover:cursor-pointer" onClick={() => {
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
                            <div className="w-[50px] h-[15px]" style={{
                                backgroundColor: col
                            }}></div>
                        </li>
                    ))
                }
            </ul>
        }
        <div className="my-[25px] w-full flex flex-row flex-nowrap items-center justify-between">
            <p className="text-xl">By Seller Profile</p>
            <Image src={showProfile ? UpArrow : DownArrow} alt="show/hide" className="w-[11px] h-[5px] hover:cursor-pointer" onClick={() => {
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
}