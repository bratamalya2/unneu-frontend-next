"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

import { useUnneuDataStore } from "@/store/store";

import DownArrow from "@/../public/select-tag-down-arrow.png";

const categories = [
    "New Arrivals",
    "Festive Wear",
    "Bridal Wear",
    "Party Wear",
    "Casual Wear",
    "Daily Wear"
];

const conditions = [
    "New/ Unused product",
    "Next to new",
    "Gently used",
    "Few defects",
    "Defective piece"
];

export default function Right({ itemId, itemDetails, file1, file2, file3, file4, file5, selectedColor }) {
    const router = useRouter();
    const [isPublishing, setIsPublishing] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const setJwtTokenGlobal = useUnneuDataStore(store => store.setJwtToken);
    const [itemName, setItemName] = useState("");
    const [sellingPrice, setSellingPrice] = useState(0);
    const [marketPrice, setMarketPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [showCategories, setShowCategories] = useState(false);
    const [showConditions, setShowConditions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");
    const [productHistory, setProductHistory] = useState("");

    const modifyCategory = (cat) => {
        setSelectedCategory(cat);
        setShowCategories(curr => !curr);
    };

    const handleSubmit = async () => {
        try {
            console.log("Inside handle submit!");
            if (isPublishing)
                return;
            setIsPublishing(true);
            const formdata = new FormData();
            formdata.append("itemId", itemId);
            formdata.append("itemName", itemName);
            formdata.append("sellingPrice", sellingPrice);
            formdata.append("marketPrice", marketPrice);
            formdata.append("description", description);
            formdata.append("category", selectedCategory);
            formdata.append("condition", selectedCondition);
            formdata.append("productHistory", productHistory);
            formdata.append("color", selectedColor);
            if (file1)
                formdata.append("file", file1);
            if (file2)
                formdata.append("file", file2);
            if (file3)
                formdata.append("file", file3);
            if (file4)
                formdata.append("file", file4);
            if (file5)
                formdata.append("file", file5);
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/editSellerItem`, {
                method: "POST",
                headers: {
                    "jwttoken": jwtToken,
                    "refreshtoken": refreshToken
                },
                body: formdata
            });
            const y = await x.json();
            if (!y.success) {
                if (y.err === "No token provided!") {
                    router.push("/");
                    setIsPublishing(false);
                }
                else if (y.err === "Refresh JWT Token!") {
                    setJwtTokenGlobal(y.jwt);
                    setJwtToken(y.jwt);
                    const x2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/editSellerItem`, {
                        method: "POST",
                        headers: {
                            "jwttoken": y.jwt,
                            "refreshtoken": refreshToken
                        },
                        body: formdata
                    });
                    const y2 = await x2.json();
                    if (!y2.success)
                        enqueueSnackbar(y2.err, {
                            variant: "error"
                        });
                    else {
                        //y2.itemId
                        enqueueSnackbar("Item uploaded successfully!", {
                            variant: "success"
                        });
                        router.push("/seller");
                    }
                    setIsPublishing(false);
                }
                else {
                    enqueueSnackbar(y.err, {
                        variant: "error"
                    });
                    setIsPublishing(false);
                }
            }
            else {
                setIsPublishing(false);
                enqueueSnackbar("Item uploaded successfully!", {
                    variant: "success"
                });
                router.push("/seller");
            }
        }
        catch (err) {
            console.log(err);
            setIsPublishing(false);
        }
    };

    useEffect(() => {
        const unneuDataStore = JSON.parse(localStorage.getItem("unneuDataStore"));
        const store = unneuDataStore.state;
        setJwtToken(store.jwtToken);
        setRefreshToken(store.refreshToken);
    }, []);

    useEffect(() => {
        if (itemDetails) {
            setItemName(itemDetails.itemName);
            setSellingPrice(parseFloat(itemDetails.sellingPrice));
            setMarketPrice(parseFloat(itemDetails.marketPrice));
            setDescription(itemDetails.description);
            setSelectedCategory(itemDetails.category);
            setSelectedCondition(itemDetails.condition);
            setProductHistory(itemDetails.productHistory);
        }
    }, [itemDetails]);

    return <section className="mt-[20px] lg:mt-0 relative w-full lg:w-[48%] rounded-[26px] border border-[#CACACA] p-[24px] z-0">
        <p className="text-xl lg:text-2xl text-[#393939] font-medium">Item detail</p>
        <p className="mt-[24px] text-[15px] lg:text-[18px] font-medium">Product name <span className="text-[#B63636]">*</span></p>
        <input
            type="text"
            placeholder="Emerald Green Kanjivaram Silk Saree"
            className="mt-[12px] lg:mt-[16px] w-full p-[12px] lg:p-[15px] rounded-[16px] bg-[#F4F4F4] text-[15px] lg:text-[18px]"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
        />
        <div className="mt-[20px] flex flex-row flex-nowrap items-center justify-between">
            <div className="w-[46%] flex flex-col gap-y-[12px] lg:gap-y-[16px]">
                <p className="text-[15px] lg:text-[18px] font-medium">Selling Price <span className="text-[#B63636]">*</span></p>
                <input
                    type="number"
                    placeholder="₹2,500"
                    className="w-full p-[12px] lg:p-[15px] rounded-[16px] bg-[#F4F4F4] text-[15px] lg:text-[18px]"
                    value={sellingPrice}
                    onChange={e => setSellingPrice(e.target.value)}
                />
            </div>
            <div className="w-[46%] flex flex-col gap-y-[12px] lg:gap-y-[16px]">
                <p className="text-[15px] lg:text-[18px] font-medium">Market Price <span className="text-[#B63636]">*</span></p>
                <input
                    type="number"
                    placeholder="₹5,000"
                    className="w-full p-[12px] lg:p-[15px] rounded-[16px] bg-[#F4F4F4] text-[15px] lg:text-[18px]"
                    value={marketPrice}
                    onChange={e => setMarketPrice(e.target.value)}
                />
            </div>
        </div>
        <p className="mt-[24px] lg:mt-[34px] text-[15px] lg:text-[18px] font-medium">Description <span className="text-[#B63636]">*</span></p>
        <textarea
            placeholder="This beautiful Emerald Green Kanjivaram Silk Saree features intricate golden zari work with traditional motifs......"
            className="mt-[12px] lg:mt-[16px] w-full h-[170px] lg:h-[200px] p-[12px] lg:p-[16px] rounded-[16px] bg-[#F4F4F4]"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        <p className="mt-[24px] text-[15px] lg:text-[18px] font-medium">Category <span className="text-[#B63636]">*</span></p>
        <div className={`mt-[12px] w-full h-[60px] relative ${showCategories ? "" : "rounded-[16px]"} p-[12px] lg:p-[16px] bg-[#F4F4F4] flex flex-row flex-nowrap items-center justify-between`}>
            <div className="text-[#ABABAB] text-[15px] lg:text-[18px]">{!selectedCategory ? "Select a category" : selectedCategory}</div>
            <Image src={DownArrow} alt="arrow-down" className="w-[18px] h-[10px] hover:cursor-pointer" onClick={() => setShowCategories(curr => !curr)} />
            {
                showCategories && (
                    <div className={`${showCategories ? "z-50" : "z-0"} absolute top-[100%] left-0 w-full`}>
                        {
                            categories.map((cat, i) => {
                                if (i === 0)
                                    return <div key={i} className="relative w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between bg-white">
                                        {cat}
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={cat === selectedCategory}
                                            className="absolute right-3 custom-radio hover:cursor-pointer"
                                            onChange={() => modifyCategory(cat)}
                                        />
                                    </div>
                                else
                                    return <div key={i} className="relative w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between border-t border-t-black bg-white">
                                        {cat}
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={cat === selectedCategory}
                                            className="absolute right-3 custom-radio hover:cursor-pointer"
                                            onChange={() => modifyCategory(cat)}
                                        />
                                    </div>
                            })
                        }
                    </div>
                )
            }
        </div>
        <p className="mt-[24px] text-[15px] lg:text-[18px] font-medium">Condition <span className="text-[#B63636]">*</span></p>
        <div className={`mt-[12px] w-full h-[60px] relative ${showConditions ? "" : "rounded-[16px]"} p-[12px] lg:p-[16px] bg-[#F4F4F4] flex flex-row flex-nowrap items-center justify-between`}>
            <div className="text-[#ABABAB] text-[15px] lg:text-[18px]">{!selectedCondition ? "Select condition" : selectedCondition}</div>
            <Image src={DownArrow} alt="arrow-down" className="w-[18px] h-[10px] hover:cursor-pointer" onClick={() => setShowConditions(curr => !curr)} />
            {
                showConditions && (
                    <div className={`${showConditions ? "z-50" : "z-0"} absolute top-[100%] left-0 w-full`}>
                        {
                            conditions.map((condition, i) => {
                                if (i === 0)
                                    return <div key={i} className="w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between bg-white">
                                        {condition}
                                        <input
                                            type="radio"
                                            name="condition"
                                            className="absolute right-3 custom-radio hover:cursor-pointer"
                                            checked={condition === selectedCondition}
                                            onChange={() => {
                                                setSelectedCondition(condition);
                                                setShowConditions(curr => !curr);
                                            }}
                                        />
                                    </div>
                                else
                                    return <div key={i} className="w-full h-[60px] p-[16px] flex flex-row flex-nowrap items-center justify-between border-t border-t-black bg-white">
                                        {condition}
                                        <input
                                            type="radio"
                                            name="condition"
                                            className="absolute right-3 custom-radio hover:cursor-pointer"
                                            checked={condition === selectedCondition}
                                            onChange={() => {
                                                setSelectedCondition(condition);
                                                setShowConditions(curr => !curr);
                                            }}
                                        />
                                    </div>
                            })
                        }
                    </div>
                )
            }
        </div>
        <p className="mt-[24px] lg:mt-[40px] text-[15px] lg:text-[18px] font-medium">History of Product <span className="text-[#9B9B9B]">(Optional)</span></p>
        <textarea
            placeholder="This saree has been cherished and worn only twice for family gatherings. It was originally purchased from a renowned silk emporium in Chennai,"
            className="mt-[15px] w-full h-[170px] lg:h-[200px] rounded-[16px] bg-[#F4F4F4] p-[16px]"
            value={productHistory}
            onChange={e => setProductHistory(e.target.value)}
        />
        <button className="mt-[30px] lg:mt-[40px] w-full bg-[#FE9135] rounded-[16px] p-[12px] lg:p-[20px] text-white lg:text-[18px] font-semibold lg:font-medium" onClick={handleSubmit}>
            {isPublishing ? "Publishing..." : "Publish Product"}
        </button>
    </section>
}