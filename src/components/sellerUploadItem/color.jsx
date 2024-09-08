"use client";

import { useState } from "react";
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

export default function Color() {
    const [selectedColor, setSelectedColor] = useState(null);

    return <section className="mt-[20px] w-full rounded-[26px] border border-[#CACACA] p-[25px]">
        <p className="text-[18px] font-medium">Select color *</p>
        <div className="mt-[20px] w-full flex flex-row items-center justify-between">
            <Image src={NoSelection} alt="no-color" className="w-[26px] h-[26px] hover:cursor-pointer" onClick={() => setSelectedColor(null)} />
            {
                availableColors.map((color, i) => (
                    <div key={i} className={`w-[38px] h-[38px] rounded-[100%] border ${selectedColor === color ? "!border-[#FE9135]" : "!border-transparent"} flex flex-row flex-nowrap items-center justify-center`}>
                        <div className={`w-[26px] h-[26px] rounded-[100%] bg-[${color}] hover:cursor-pointer`} onClick={() => setSelectedColor(color)}></div>
                    </div>
                ))
            }
        </div>
    </section>
}