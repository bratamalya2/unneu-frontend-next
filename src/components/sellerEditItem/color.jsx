"use client";

import { useEffect } from "react";
import Image from "next/image";

import NoSelection from "@/../public/no-color-selected.png";

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

export default function Color({ itemDetails, selectedColor, setSelectedColor }) {
    useEffect(() => {
        if (itemDetails)
            setSelectedColor(itemDetails.color);
    }, [itemDetails]);

    return <section className="mt-[20px] w-full rounded-[26px] border border-[#CACACA] p-[20px] lg:p-[25px]">
        <p className="text-[18px] font-medium">Select color <span className="text-[#B63636]">*</span></p>
        <div className="mt-[20px] w-full flex flex-row flex-wrap items-center lg:justify-between gap-x-1.5 lg:gap-x-0">
            <Image src={NoSelection} alt="no-color" className="mx-[6px] lg:mx-0 w-[24px] lg:w-[26px] h-[24px] lg:h-[26px] hover:cursor-pointer" onClick={() => setSelectedColor("#FFF")} />
            {
                availableColors.map((color, i) => (
                    <div key={i} className={`w-[36px] h-[36px] rounded-[100%] border ${selectedColor === color ? "!border-[#FE9135]" : "!border-transparent"} flex flex-row flex-nowrap items-center justify-center`}>
                        <div className={`w-[24px] lg:w-[26px] h-[24px] lg:h-[26px] rounded-[100%] hover:cursor-pointer`} onClick={() => setSelectedColor(color)} style={{
                            backgroundColor: color
                        }}></div>
                    </div>
                ))
            }
        </div>
    </section>
}