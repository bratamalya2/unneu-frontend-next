"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useUnneuDataStore } from "@/store/store";

import SignInPopup from "../signInPopup";
import SignUpPopup from "../signUpPopup";

import Location from "@/../public/location.png";
import RatingSelected from "@/../public/rating-selected.png";
import RatingUnselected from "@/../public/rating-unselected.png";
import Verified from "@/../public/verified.png";

export default function Seller({ seller, index }) {
    const [sellerProfilePhotoUrl, setSellerProfilePhotoUrl] = useState("");
    const [ratingArr, setRatingArr] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowingModified, setIsFollowingModified] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const setJwtTokenAtStore = useUnneuDataStore(store => store.setJwtToken);
    const setShowSignIn = useUnneuDataStore(store => store.setShowSignIn);
    const setShowSignUp = useUnneuDataStore(store => store.setShowSignUp);

    const isSellerFollowed = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/isSellerFollowedByBuyer`, {
                method: "GET",
                headers: {
                    jwttoken: jwtToken,
                    refreshtoken: refreshToken,
                    sellerid: seller.sellerId.S
                }
            });
            const y = await x.json();
            if (!y.success) {
                if (y.err === "Refresh JWT Token!") {
                    setJwtToken(y.jwt);
                    setJwtTokenAtStore(y.jwt);
                    const x2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/isSellerFollowedByBuyer`, {
                        method: "GET",
                        headers: {
                            jwttoken: y.jwt,
                            refreshtoken: refreshToken,
                            sellerid: seller.sellerId.S
                        }
                    });
                    const y2 = await x2.json();
                    if (y2.success)
                        setIsFollowing(y2.doesBuyerFollowSeller);
                }
            }
            else {
                setIsFollowing(y.doesBuyerFollowSeller);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchSellerProfilePhotoUrl = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/fetchImage`, {
                method: "GET",
                headers: {
                    imagekey: seller.profilePhoto.S
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

    const hideSignIn = () => {
        setShowSignIn(false);
    };

    const hideSignUp = () => {
        setShowSignUp(false);
    };

    const modifyFollow = async () => {
        try {
            if (!jwtToken) {
                setShowSignUp(true);
            }
            let URL = "";
            if (isFollowing)
                URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/removeFromFollowlist`;
            else
                URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/addToFollowlist`;
            const x = await fetch(URL, {
                method: "POST",
                headers: {
                    jwttoken: jwtToken,
                    refreshtoken: refreshToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sellerId: seller.sellerId.S
                })
            });
            const y = await x.json();
            if (!y.success) {
                if (y.err === "Refresh JWT Token!") {
                    setJwtToken(y.jwt);
                    setJwtTokenAtStore(y.jwt);
                    const x2 = await fetch(URL, {
                        method: "POST",
                        headers: {
                            jwttoken: y.jwt,
                            refreshtoken: refreshToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            sellerId: seller.sellerId.S
                        })
                    });
                    const y2 = await x2.json();
                    if (y2.success) {
                        setIsFollowingModified(true);
                    }
                    else
                        setShowSignUp(true);
                }
                else
                    setShowSignUp(true);
            }
            else {
                setIsFollowingModified(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (seller) {
            //console.log(seller);
            const store = JSON.parse(localStorage.getItem("unneuDataStore")).state;
            setJwtToken(store.jwtToken);
            setRefreshToken(store.refreshToken);
            fetchSellerProfilePhotoUrl();
            const a = [];
            for (let i = 0; i < 5; i++) {
                const avgRating = parseInt(seller.avgRating.N);
                if (i < avgRating)
                    a.push(true);
                else
                    a.push(false);
            }
            setRatingArr(a);
        }
    }, [seller]);

    useEffect(() => {
        if (seller && jwtToken && refreshToken)
            isSellerFollowed();
        if (isFollowingModified)
            setIsFollowingModified(false);
    }, [seller, jwtToken, refreshToken, isFollowingModified]);

    if (!seller)
        return null;

    return <div className={`relative inline-flex ${index > 0 && "ml-[20px] lg:ml-[48px]"} bg-[#FFF] rounded-[24px] w-[170px] lg:w-[271px] h-[300px] lg:h-[344px] flex-col items-center`} style={{
        boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
    }}>
        <Image src={sellerProfilePhotoUrl} alt="profile photo" width={88} height={88} className="mt-[24px] rounded-[100%]" />
        {
            seller.isVerified.BOOL && (
                <Image src={Verified} alt="verified" className="absolute w-[20px] h-[20px] top-[80px] left-[65%] lg:left-[60%]" />
            )
        }
        <Link href={`/seller?sellerId=${seller.sellerId.S}`}>
            <p className="mt-[20px] text-sm lg:text-[18px] font-medium hover:underline">{seller.storeName.S}</p>
        </Link>
        <p className="mt-[8px] flex flex-row items-center gap-x-[3px] lg:gap-x-[7px] text-[#9C9C9C] text-xs lg:text-[18px] font-medium">
            <Image src={Location} alt="loc" className="w-[14px] h-[20px] opacity-45" />
            {seller.city.S}, {seller.state.S}
        </p>
        <div className="mt-[15px] flex flex-row flex-nowrap items-center gap-x-[3px] lg:gap-x-[7px]">
            {
                ratingArr.map((isRated, index) => (
                    <Image src={isRated ? RatingSelected : RatingUnselected} alt="rating" className="w-[13px] lg:w-[15px] h-[13px] lg:h-[15px]" key={index} />
                ))
            }
            <div className="ml-1 lg:ml-3 text-[#8D8D8D] text-sm">({seller.numberOfReviews.N})</div>
        </div>
        <button className={`mt-[20px] lg:mt-[40px] ${isFollowing ? "bg-green-500" : "bg-[#FBC246]"} rounded-[16px] py-[7px] lg:py-[12px] px-[15px] px-[50px] font-medium flex flex-row flex-nowrap items-center text-sm lg:text-base`} onClick={modifyFollow}>
            {
                isFollowing ? (
                    <>
                        Following
                    </>
                ) : (
                    <>
                        Follow <span className="text-xl">+</span>
                    </>
                )
            }
        </button>
    </div>
}