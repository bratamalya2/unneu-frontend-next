"use client";

import Image from "next/image";
import { useState } from "react";

import DownArrow from "@/../public/select-tag-down-arrow.png";

const categories = [
    "New Arrivals",
    "Festive Wear",
    "Bridal Wear",
    "Party Wear",
    "Casual Wear",
    "Daily Wear"
];

export default function Right() {
    const [showCategories, setShowCategories] = useState(false);
    const [showConditions, setShowConditions] = useState(false);

    return <section className="relative w-[48%] rounded-[26px] border border-[#CACACA] p-[24px] z-0">
        <p className="text-2xl text-[#393939] font-medium">Item detail</p>
        <p className="mt-[24px] text-[18px] font-medium">Product name *</p>
        <input type="text" placeholder="Emerald Green Kanjivaram Silk Saree" className="mt-[16px] w-full p-[15px] rounded-[16px] bg-[#F4F4F4] text-[18px]" />
        <div className="mt-[20px] flex flex-row flex-nowrap items-center justify-between">
            <div className="w-[46%] flex flex-col gap-y-[16px]">
                <p className="text-[18px] font-medium">Base Price *</p>
                <input type="number" placeholder="₹2,500" className="w-full p-[15px] rounded-[16px] bg-[#F4F4F4] text-[18px]" />
            </div>
            <div className="w-[46%] flex flex-col gap-y-[16px]">
                <p className="text-[18px] font-medium">Market Price *</p>
                <input type="number" placeholder="₹5,000" className="w-full p-[15px] rounded-[16px] bg-[#F4F4F4] text-[18px]" />
            </div>
        </div>
        <p className="mt-[34px] text-[18px] font-medium">Description *</p>
        <textarea
            placeholder="This beautiful Emerald Green Kanjivaram Silk Saree features intricate golden zari work with traditional motifs......"
            className="mt-[16px] w-full h-[200px] p-[16px] rounded-[16px] bg-[#F4F4F4]"
        />
        <p className="mt-[24px] text-[18px] font-medium">Category *</p>
        <div className={`mt-[12px] w-full h-[60px] relative ${showCategories ? "" : "rounded-[16px]"} p-[16px] bg-[#F4F4F4] flex flex-row flex-nowrap items-center justify-between`}>
            <div className="text-[#ABABAB] text-[18px]">Select a category</div>
            <Image src={DownArrow} alt="arrow-down" className="w-[18px] h-[10px] hover:cursor-pointer" onClick={() => setShowCategories(curr => !curr)} />
            {
                showCategories && (
                    <div className={`${showCategories ? "z-50" : "z-0"} absolute top-[100%] left-0 w-full`}>
                        {
                            categories.map((cat, i) => {
                                if (i === 0)
                                    return <div key={i} className="w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between bg-white">{cat}</div>
                                else
                                    return <div key={i} className="w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between border-t border-t-black bg-white">{cat}</div>
                            })
                        }
                    </div>
                )
            }
        </div>
        <p className="mt-[24px] text-[18px] font-medium">Condition</p>
        <div className={`mt-[12px] w-full h-[60px] relative ${showConditions ? "" : "rounded-[16px]"} p-[16px] bg-[#F4F4F4] flex flex-row flex-nowrap items-center justify-between`}>
            <div className="text-[#ABABAB] text-[18px]">Select condition</div>
            <Image src={DownArrow} alt="arrow-down" className="w-[18px] h-[10px] hover:cursor-pointer" onClick={() => setShowConditions(curr => !curr)} />
            {
                showConditions && (
                    <div className={`${showCategories ? "z-50" : "z-0"} absolute top-[100%] left-0 w-full`}>
                        {
                            categories.map((cat, i) => {
                                if (i === 0)
                                    return <div key={i} className="w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between bg-white">{cat}</div>
                                else
                                    return <div key={i} className="w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between border-t border-t-black bg-white">{cat}</div>
                            })
                        }
                    </div>
                )
            }
        </div>
        <p className="mt-[40px] text-[18px] font-medium">History of Product <span className="text-[#9B9B9B]">(Optional)</span></p>
        <textarea
            placeholder="This saree has been cherished and worn only twice for family gatherings. It was originally purchased from a renowned silk emporium in Chennai,"
            className="mt-[15px] w-full h-[200px] rounded-[16px] bg-[#F4F4F4] p-[16px]"
        />
        <button className="mt-[40px] w-full bg-[#FE9135] rounded-[16px] p-[20px] text-white text-[18px] font-medium">Publish Product</button>
    </section>
}