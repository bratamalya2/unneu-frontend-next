"use client";
import { useState } from "react";
import Image from "next/image";

import Item from "./item";

import DownArrow from "@/../public/down-arrow.png";
import Close from "@/../public/close.png";

const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Listed recently",
    "Listed early"
];

export default function Results({ items, appliedFilters, removeFilter, sortBy, setSortBy }) {
    const [showSortOptions, setShowSortOptions] = useState(false);

    return <>
        <aside className="relative px-[5%] lg:px-[0%] lg:pr-0 hidden lg:block lg:w-[75%] xl:w-[75%] 2xl:w-[78%]">
            <p className="text-3xl">Pre-owned Sarees <span className="text-xl">({items.length} results)</span></p>
            <div className="mt-[2px] w-full h-[1px] bg-gray-500"></div>
            <section className="w-full flex flex-row flex-nowrap justify-between">
                <div className="mt-[20px] lg:w-[61%] xl:w-[70%] 2xl:w-[75%] flex flex-row items-center flex-wrap gap-x-[18px] gap-y-[18px]">
                    {
                        appliedFilters.length > 0 && <p>Applied filters:</p>
                    }
                    {
                        appliedFilters.map((filter, index) => {
                            switch (filter.split("=")[0]) {
                                case "newly-listed":
                                    return <div className="relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] text-sm" key={index}>Within {filter.split("=")[1]} days
                                        <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-4 right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                                    </div>
                                case "occasion":
                                    return <div className="relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] text-sm" key={index}>{filter.split("=")[1]}
                                        <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-4 right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                                    </div>
                                case "color":
                                    return <div className="relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] flex flex-row flex-nowrap text-sm" key={index}>Color: <div className={`ml-3 rounded-[100%] w-[20px] h-[20px] ${filter.split("=")[1] === "#FFF" && "border-[0.5px] border-black"}`} style={{
                                        backgroundColor: filter.split("=")[1]
                                    }}></div>
                                        <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-4 right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                                    </div>
                                case "seller":
                                    return <div className="relative py-[10px] pl-[5px] pr-[25px] rounded-[16px] border border-[#000] text-[#767676] text-sm" key={index}>Seller: {filter.split("=")[1]}
                                        <Image src={Close} alt="remove" className="absolute w-[8px] h-[8px] top-4 right-2 opacity-50 hover:cursor-pointer" onClick={() => removeFilter(filter)} />
                                    </div>
                            }
                        })
                    }
                </div>
                <div className="absolute right-0 mt-[20px] lg:w-[35%] xl:w-[30%] min-[1400px]:w-[25%] 2xl:w-[22%] flex flex-row flex-nowrap justify-end gap-x-[10px] mr-3">
                    <div className="flex flex-row flex-nowrap py-[9px]">
                        <p>Sort by</p>
                    </div>
                    <div className="py-[13px] px-[20px] flex flex-row flex-nowrap self-start gap-x-[16px] rounded-[16px] text-xs border border-black hover:cursor-pointer" onClick={() => {
                        setShowSortOptions(x => !x);
                    }}>
                        {sortBy}
                        <Image src={DownArrow} alt="expand" className="w-[12px] h-[5px] self-center" />
                        {
                            showSortOptions && (
                                <div className="bg-white top-[50px] absolute min-w-[180px] right-0 z-10 border border-black">
                                    {
                                        sortOptions.map((option, i) => (
                                            <>
                                                <div key={i} className="w-full py-[13px] px-[20px] hover:bg-[#FE9135] hover:text-white" onClick={() => {
                                                    setSortBy(option);
                                                }}>{option}</div>
                                                {
                                                    i < sortOptions.length - 1 && (
                                                        <div className="w-full h-[1px] bg-black"></div>
                                                    )
                                                }
                                            </>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
            <section className="pr-[2%] relative mt-[70px] w-full grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-[6px] xl:gap-x-[16px] min-[1400px]:gap-x-[32px] min-[1650px]:gap-x-[40px] min-[1750px]:gap-x-[60px] gap-y-[32px]">
                {
                    items.map((item) => <Item key={item.itemId.S} item={item} />)
                }
            </section>
        </aside>
        <aside className="lg:hidden">
            <section className="px-[2%] mt-[20px] w-full grid grid-cols-2 gap-x-[10px] min-[360px]:gap-x-[15px] gap-y-[50px]">
                {
                    items.map((item) => <Item key={item.itemId.S} item={item} />)
                }
            </section>
        </aside>
    </>
}