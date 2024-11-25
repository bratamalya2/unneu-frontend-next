"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useUnneuDataStore } from "@/store/store";

import Illustration from "@/../public/footer-illustration.svg";
import DeleteItemFromCart from "@/../public/delete-cart-item.svg";
import Like from "@/../public/like.png";
import Liked from "@/../public/like (2).png";

export default function CartItem({ itemId }) {
    const removeFromCart = useUnneuDataStore(store => store.removeFromCart);
    const [itemDetails, setItemDetails] = useState(null);
    const [itemFiles, setItemFiles] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isWishlistModified, setIsWishlistModified] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const setShowSignIn = useUnneuDataStore(store => store.setShowSignIn);
    const setShowSignUp = useUnneuDataStore(store => store.setShowSignUp);

    const fetchItemDetails = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/fetchSingleItemDetails`, {
                method: "GET",
                headers: {
                    itemid: itemId
                }
            });
            const y = await x.json();
            if (y.success) {
                setItemDetails(y.itemDetails);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchFiles = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/getAllFilesOfAnItem`, {
                method: "GET",
                headers: {
                    itemid: itemId
                }
            });
            const y = await x.json();
            if (y.success)
                setItemFiles(y.itemFiles);
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchImgUrl = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/fetchImage`, {
                method: "GET",
                headers: {
                    imagekey: itemFiles[0]
                }
            });
            const y = await x.json();
            if (y.success)
                setImgUrl(y.imgUrl);
        }
        catch (err) {
            console.log(err);
        }
    };

    const addToWishlist = async () => {
        try {
            const store = JSON.parse(localStorage.getItem("unneuDataStore"));
            const jwt = store.state.jwtToken;
            const refresh = store.state.refreshToken;
            setJwtToken(jwt);
            setRefreshToken(refresh);
            if (!jwt) {
                setShowSignUp(true);
            }
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/addToWishlist`, {
                method: "POST",
                headers: {
                    jwttoken: jwt,
                    refreshToken: refresh,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemId: item.itemId.S
                })
            });
            const y = await x.json();
            if (!y.success) {
                if (y.err === "Refresh JWT Token!") {
                    setJwtTokenAtStore(y.jwt);
                    setJwtToken(y.jwt);
                    const x2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/addToWishlist`, {
                        method: "POST",
                        headers: {
                            jwttoken: y.jwt,
                            refreshToken: refresh,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            itemId: item.itemId.S
                        })
                    });
                    const y2 = await x2.json();
                    if (y2.success)
                        setIsWishlistModified(true);
                    else
                        setShowSignUp(true);
                }
                else
                    setShowSignUp(true);
            }
            else {
                setIsWishlistModified(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const removeFromWishlist = async () => {
        try {
            const store = JSON.parse(localStorage.getItem("unneuDataStore"));
            const jwt = store.state.jwtToken;
            const refresh = store.state.refreshToken;
            setJwtToken(jwt);
            setRefreshToken(refresh);
            if (!jwt) {
                setShowSignUp(true);
            }
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/removeFromWishlist`, {
                method: "POST",
                headers: {
                    jwttoken: jwt,
                    refreshToken: refresh,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemId: item.itemId.S
                })
            });
            const y = await x.json();
            if (!y.success) {
                if (y.err === "Refresh JWT Token!") {
                    setJwtTokenAtStore(y.jwt);
                    setJwtToken(y.jwt);
                    const x2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/removeFromWishlist`, {
                        method: "POST",
                        headers: {
                            jwttoken: y.jwt,
                            refreshToken: refresh,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            itemId: item.itemId.S
                        })
                    });
                    const y2 = await x2.json();
                    if (y2.success)
                        setIsWishlistModified(true);
                    else
                        setShowSignUp(true);
                }
                else
                    setShowSignUp(true);
            }
            else {
                setIsWishlistModified(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const isItemWishlisted = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/isItemWishlisted`, {
                method: "GET",
                headers: {
                    jwttoken: jwtToken,
                    refreshToken: refreshToken,
                    itemid: item.itemId.S
                }
            });
            const y = await x.json();
            if (!y.success) {
                if (y.err === "Refresh JWT Token!") {
                    setJwtTokenAtStore(y.jwt);
                    setJwtToken(y.jwt);
                    const x2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/isItemWishlisted`, {
                        method: "GET",
                        headers: {
                            jwttoken: y.jwt,
                            refreshToken: refreshToken,
                            itemid: item.itemId.S
                        }
                    });
                    const y2 = await x2.json();
                    if (y2.success) {
                        setIsWishlisted(y2.isItemWishlisted);
                    }
                }
            }
            else {
                setIsWishlisted(y.isItemWishlisted);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (itemId) {
            fetchItemDetails();
            fetchFiles();
        }
    }, [itemId]);

    useEffect(() => {
        if (itemFiles.length > 0)
            fetchImgUrl();
    }, [itemFiles]);

    useEffect(() => {
        if (jwtToken && refreshToken)
            isItemWishlisted();
        if (isWishlistModified) {
            isItemWishlisted();
            setIsWishlistModified(false);
        }
    }, [jwtToken, refreshToken, isWishlistModified]);

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem("unneuDataStore"));
        setJwtToken(store.state.jwtToken);
        setRefreshToken(store.state.refreshToken);
    }, []);

    if (itemFiles.length === 0 || !itemDetails)
        return null;

    return <div className="relative w-full flex flex-row flex-nowrap p-[2%] gap-x-[7%] border-[0.5px] border-[#00000066] rounded-[24px]" style={{
        boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
    }}>
        <Image src={DeleteItemFromCart} alt="delete" className="absolute w-[14px] lg:w-[24px] h-[14px] lg:h-[24px] right-[20px] lg:right-[25px] bottom-[15px] lg:top-[25px] hover:cursor-pointer" onClick={() => {
            removeFromCart(itemId);
        }} />
        <Image src={Illustration} alt="bg" className="absolute w-full h-full top-0 left-0 z-[-10] opacity-55" />
        {
            ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[0].split(".")[itemFiles[0].split(".").length - 1]) ?
                (
                    <img src={imgUrl} alt="item image" className="w-[40%] h-full rounded-[24px]" />
                ) : (
                    <video className="w-[40%] lg:w-[30%] h-full rounded-[24px]" loop={true} autoPlay="autoplay" muted>
                        <source src={imgUrl} />
                    </video>
                )
        }
        <div className="relative w-[45%] h-full">
            <p className="text-[15px] font-medium lg:font-normal lg:text-lg max-w-[70%] max-h-[60px] overflow-hidden">{itemDetails.itemName}</p>
            <p className="mt-[10px] text-[15px] lg:text-lg font-semibold">₹ {itemDetails.sellingPrice} <span className="text-sm lg:text-base text-[#00000066] font-normal line-through">₹ {itemDetails.marketPrice}</span></p>
            <div className="mt-[20px] hidden lg:flex flex-row flex-nowrap items-center gap-x-[7px]">
                <Image src={isWishlisted ? Liked : Like} alt="like" className="w-[18px] h-[16px] hover:cursor-pointer" onClick={() => {
                    if (isWishlisted)
                        removeFromWishlist();
                    else
                        addToWishlist();
                }} />
                {
                    isWishlisted ? (
                        <span className="text-sm">Wishlisted</span>
                    ) : (
                        <span className="text-sm">Save for later</span>
                    )
                }
            </div>
        </div>
        <div className="lg:hidden absolute left-[46%] bottom-[12px] flex flex-row flex-nowrap items-center gap-x-[7px]">
            <Image src={isWishlisted ? Liked : Like} alt="like" className="w-[11px] h-[10px] hover:cursor-pointer" onClick={() => {
                if (isWishlisted)
                    removeFromWishlist();
                else
                    addToWishlist();
            }} />
            {
                isWishlisted ? (
                    <span className="text-xs">Wishlisted</span>
                ) : (
                    <span className="text-xs">Save for later</span>
                )
            }
        </div>
    </div>
}