"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Like from "@/../public/like.png";
import Liked from "@/../public/like (2).png";
import Share from "@/../public/share-seller-profile.png";
import Options from "@/../public/options.png";
import Verified from "@/../public/verified.png";
import RatingSelected from "@/../public/rating-selected.png";
import RatingUnselected from "@/../public/rating-unselected.png";
import UpArrow from "@/../public/up-arrow.png";
import DownArrow from "@/../public/down-arrow.png";

export default function Right({ itemId, itemDetails }) {
    console.log(itemId);
    console.log(itemDetails);

    const [sellerProfilePhotoUrl, setSellerProfilePhotoUrl] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [sellerFullName, setSellerFullName] = useState("");
    const [isSellerVerified, setIsSellerVerified] = useState(false);
    const [avgSellerRating, setAvgSellerRating] = useState("0");
    const [numberOfReviews, setNumberOfReviews] = useState("0");
    const [sellerCity, setSellerCity] = useState("");
    const [sellerState, setSellerState] = useState("");
    const [ratingsArr, setRatingsArr] = useState([]);
    const [showCondition, setShowCondition] = useState(false);
    const [showProductHistory, setShowProductHistory] = useState(false);
    const [showValue, setShowValue] = useState(false);

    const fetchSellerDetails = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/getAllSellerDetailsOfAnItem`, {
                method: "GET",
                headers: {
                    itemid: itemId
                }
            });
            const y = await x.json();
            console.log(y);
            if (y.success) {
                //setSellerProfilePhoto(y.profilePhoto);
                setSellerId(y.sellerId);
                setIsSellerVerified(y.isVerified);
                setAvgSellerRating(y.avgRating);
                setNumberOfReviews(y.numberOfReviews);
                setSellerCity(y.city);
                setSellerState(y.state);
                setSellerFullName(y.sellerFullName);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchSellerProfilePhotoUrl = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/fetchImage`, {
                method: "GET",
                headers: {
                    imagekey: itemDetails.sellerProfilePhoto
                }
            });
            const y = await x.json();
            if (y.success)
                setSellerProfilePhotoUrl(y.imgUrl);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (itemDetails)
            fetchSellerProfilePhotoUrl();
        if (itemId)
            fetchSellerDetails();
    }, [itemId, itemDetails]);

    useEffect(() => {
        const avgRating = parseInt(avgSellerRating);
        const arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < avgRating)
                arr.push(true);
            else
                arr.push(false);
        }
        setRatingsArr(arr);
    }, [avgSellerRating]);

    return <aside className="relative lg:w-[45%] min-[1400px]:w-[50%] 2xl:w-[55%]">
        <div className="w-full flex flex-row flex-nowrap justify-between">
            <p className="text-xl max-w-[65%]">{itemDetails.itemName}</p>
            <div className="lg:w-[20%] xl:w-[15%] min-[1400px]:w-[12%] 2xl:w-[10%] flex flex-row flex-nowrap gap-x-[20px] pt-2">
                <Image src={Like} alt="like" className="w-[18px] h-[16px]" />
                <Image src={Share} alt="share" className="w-[13px] h-[16px]" />
                <Image src={Options} alt="Options" className="w-[4px] h-[16px]" />
            </div>
        </div>
        <p className="mt-[20px] flex flex-row flex-nowrap items-center gap-x-[12px]">
            <span className="text-[22px] font-semibold">MRP ₹ <span className="text-xl">{itemDetails.marketPrice}</span></span>
            <span className="text-[17px] text-[#00000066] line-through">₹ {itemDetails.sellingPrice}</span>
        </p>
        <p className="mt-[8px] text-sm text-[#A4A2A2]">(Inclusive of all taxes)</p>
        <div className="relative mt-[24px] w-full h-[140px] bg-[#FEEECB] rounded-[16px] p-[16px] flex flex-row flex-nowrap lg:gap-x-[20px] xl:gap-x-[40px]">
            <Image src={sellerProfilePhotoUrl} alt="seller" width={64} height={64} className="w-[64px] h-[64px] rounded-[100%]" />
            {
                isSellerVerified && (
                    <Image src={Verified} alt="verified" className="absolute left-[60px] top-[60px] w-[16px] h-[16px] rounded-[100%]" />
                )
            }
            <div className="w-[70%] h-full">
                <p className="lg:text-sm xl:text-[15px] font-semibold overflow-hidden max-h-[20px]">{sellerFullName}</p>
                <p className="mt-[6px] lg:text-sm xl:text-base overflow-hidden max-h-[24px]">{sellerCity}, {sellerState}</p>
                {
                    isSellerVerified && (
                        <div className="mt-[6px] flex flex-row items-center gap-x-[5px] lg:text-sm xl:text-base">
                            Verified Profile
                            <Image src={Verified} alt="verified" className="lg:w-[16px] xl:w-[20px] lg:h-[16px] xl:h-[20px] rounded-[100%]" />
                        </div>
                    )
                }
                <div className="mt-[6px] flex flex-row flex-nowrap items-center gap-x-[8px]">
                    <div className="flex flex-row flex-nowrap items-center gap-x-[4px]">
                        {
                            ratingsArr.map((isRated, index) => {
                                if (isRated)
                                    return <Image src={RatingSelected} alt="rated" className="w-[15px] h-[14px]" key={index} />
                                else
                                    return <Image src={RatingUnselected} alt="not-rated" className="w-[15px] h-[14px]" key={index} />
                            })
                        }
                    </div>
                    <p className="text-sm text-[#A4A2A2]">({numberOfReviews})</p>
                </div>
            </div>
            <Link href={`/seller?sellerId=${itemDetails.sellerId}`}>
                <p className="lg:text-sm xl:text-base text-[#5148BA] underline lg:w-[80px] xl:w-[120px]">
                    View Store
                </p>
            </Link>
        </div>
        <button className="my-[32px] py-[19px] w-full rounded-[24px] bg-[#FE9135] text-[22px] lg:font-medium xl:font-semibold text-white">Add to cart</button>
        <p className="mb-[12px] text-[18px] font-semibold">Product Description</p>
        <p>{itemDetails.description}</p>
        <p className="my-[32px] text-[18px] font-semibold flex flex-row flex-nowrap items-center gap-x-[13px]">Category&nbsp;:<span className="text-base font-normal">{itemDetails.category}</span></p>
        <div className="mb-[32px] text-[18px] font-semibold flex flex-row flex-nowrap items-center gap-x-[13px]">Color&nbsp;:
            <div className="w-[32px] h-[32px] rounded-[100%] border border-black flex flex-row items-center justify-center bg-white">
                <div className="w-[20px] h-[20px] rounded-[100%]" style={{
                    backgroundColor: itemDetails.color
                }}></div>
            </div>
        </div>
        <div className="w-full py-[12px] px-[17px] flex flex-row flex-nowrap items-center justify-between text-[18px] font-semibold rounded-[12px] bg-[#FAFAFA]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            Condition
            <div className="w-[40px] h-[40px] rounded-[100%] bg-[#D9D9D9] flex flex-row flex-nowrap items-center justify-center">
                <Image src={showCondition ? UpArrow : DownArrow} alt="arrow" className="w-[20px] h-[12px]" onClick={() => setShowCondition(x => !x)} />
            </div>
        </div>
        <div className={`${showCondition ? "mt-[6px] w-full min-h-[72px] py-[12px] px-[17px]" : "mt-0 w-0 min-h-0 py-0 px-0"} transition-[height] duration-500 ease-in-out rounded-[20px] bg-[#FEEECB] flex flex-row flex-nowrap items-center`}>
            {showCondition && <span>{itemDetails.condition}</span>}
        </div>
        {
            itemDetails.productHistory.length > 0 && (
                <>
                    <div className="w-full mt-[32px] py-[12px] px-[17px] flex flex-row flex-nowrap items-center justify-between text-[18px] font-semibold rounded-[12px] bg-[#FAFAFA]" style={{
                        boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                    }}>
                        Product history
                        <div className="w-[40px] h-[40px] rounded-[100%] bg-[#D9D9D9] flex flex-row flex-nowrap items-center justify-center">
                            <Image src={showProductHistory ? UpArrow : DownArrow} alt="arrow" className="w-[20px] h-[12px]" onClick={() => setShowProductHistory(x => !x)} />
                        </div>
                    </div>
                    <div className={`${showProductHistory ? "mt-[6px] w-full min-h-[72px] py-[12px] px-[17px]" : "mt-0 w-0 min-h-0 py-0 px-0"} transition-[height] duration-500 ease-in-out rounded-[20px] bg-[#FEEECB] flex flex-row flex-nowrap items-center`}>
                        {showProductHistory && <span>{itemDetails.productHistory}</span>}
                    </div>
                </>
            )
        }
        <div className="w-full mt-[32px] py-[12px] px-[17px] flex flex-row flex-nowrap items-center justify-between text-[18px] font-semibold rounded-[12px] bg-[#FAFAFA]" style={{
            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
        }}>
            Value
            <div className="w-[40px] h-[40px] rounded-[100%] bg-[#D9D9D9] flex flex-row flex-nowrap items-center justify-center">
                <Image src={showValue ? UpArrow : DownArrow} alt="arrow" className="w-[20px] h-[12px]" onClick={() => setShowValue(x => !x)} />
            </div>
        </div>
        <div className={`${showValue ? "mt-[6px] w-full min-h-[72px] py-[12px] px-[17px]" : "mt-0 w-0 min-h-0 py-0 px-0"} transition-[height] duration-500 ease-in-out rounded-[20px] bg-[#FEEECB] flex flex-col flex-nowrap justify-center`}>
            {showValue && <div>Market Price: ₹ {itemDetails.marketPrice}</div>}
            {showValue && <div>Seller Price: ₹ {itemDetails.sellingPrice}</div>}
        </div>
    </aside>
}