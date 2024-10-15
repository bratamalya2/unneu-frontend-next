"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/navigation";

import { useUnneuDataStore } from "@/store/store";

import QuickView from "@/../public/buyer-page-quick-view.svg";
import Like from "@/../public/like.png";
import Like2 from "@/../public/like (2).png";
import ShareProfile from "@/../public/share-seller-profile.png";
import RightDarkArrow from "@/../public/dark arrow.svg"; //only arrow
import LeftDarkArrow from "@/../public/left dark arrow.svg";
import LeftLightArrow from "@/../public/light arrow.svg"; //only arrow
import RightLightArrow from "@/../public/right light arrow.svg";
import LeftLeaf from "@/../public/buyer-home-left-leaf.svg";
import RightLeaf from "@/../public/buyer-home-right-leaf.svg";
import Close from "@/../public/close.png";

export default function Item({ item }) {
    const router = useRouter();
    const [itemFiles, setItemFiles] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [sellerStoreName, setSellerStoreName] = useState(null);
    const [sellerProfilePhoto, setSellerProfilePhoto] = useState(null);
    const [sellerProfilePhotoUrl, setSellerProfilePhotoUrl] = useState("");
    const [showAnimation, setShowAnimation] = useState(false);
    const [showWishlistAndShare, setShowWishlistAndShare] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
    const [showQuickView, setShowQuickView] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isWishlistModified, setIsWishlistModified] = useState(false);
    const setJwtTokenAtStore = useUnneuDataStore(store => store.setJwtToken);
    const [top10Sellers, setTop10Sellers] = useState([]);

    const handleCloseQuickView = () => setShowQuickView(false);
    const handleShowQuickView = () => setShowQuickView(true);

    const reduceModalCurrentIndex = () => {
        setModalCurrentIndex((curr) => {
            if (curr > 0)
                return curr - 1;
        });
    };

    const increaseModalCurrentIndex = () => {
        setModalCurrentIndex((curr) => {
            if (curr < imgUrls.length - 1)
                return curr + 1;
        });
    };

    const fetchFiles = async () => {
        try {
            const itemId = item.itemId.S;
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

    const fetchSellerDetails = async () => {
        try {
            const itemId = item.itemId.S;
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/getAllSellerDetailsOfAnItem`, {
                method: "GET",
                headers: {
                    itemid: itemId
                }
            });
            const y = await x.json();
            if (y.success) {
                setSellerProfilePhoto(y.profilePhoto);
                setSellerStoreName(y.storeName);
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
                    imagekey: sellerProfilePhoto
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

    const fetchImgUrls = async () => {
        try {
            const arr = [];
            for (let i = 0; i < itemFiles.length; i++) {
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/fetchImage`, {
                    method: "GET",
                    headers: {
                        imagekey: itemFiles[i]
                    }
                });
                const y = await x.json();
                if (y.success)
                    arr.push(y.imgUrl);
            }
            setImgUrls(arr);
        }
        catch (err) {
            console.log(err);
        }
    };

    const addToWishlist = async () => {
        try {
            console.log(item.itemId.S);
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/addToWishlist`, {
                method: "POST",
                headers: {
                    jwttoken: jwtToken,
                    refreshToken: refreshToken,
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
                            jwttoken: jwtToken,
                            refreshToken: refreshToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            itemId: item.itemId.S
                        })
                    });
                    const y2 = await x2.json();
                    if (y2.success)
                        setIsWishlistModified(true);
                }
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
            console.log(item.itemId.S);
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/removeFromWishlist`, {
                method: "POST",
                headers: {
                    jwttoken: jwtToken,
                    refreshToken: refreshToken,
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
                            jwttoken: jwtToken,
                            refreshToken: refreshToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            itemId: item.itemId.S
                        })
                    });
                    const y2 = await x2.json();
                    if (y2.success)
                        setIsWishlistModified(true);
                }
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
        if (item) {
            //console.log(item);
            fetchFiles();
            fetchSellerDetails();
            const store = JSON.parse(localStorage.getItem("unneuDataStore")).state;
            setJwtToken(store.jwtToken);
            setRefreshToken(store.refreshToken);
        }
    }, [item]);

    useEffect(() => {
        if (item && jwtToken && refreshToken)
            isItemWishlisted();
        if (isWishlistModified)
            setIsWishlistModified(false);
    }, [item, jwtToken, refreshToken, isWishlistModified]);

    useEffect(() => {
        if (itemFiles.length > 0)
            fetchImgUrls();
    }, [itemFiles]);

    useEffect(() => {
        if (sellerProfilePhoto)
            fetchSellerProfilePhotoUrl();
    }, [sellerProfilePhoto]);

    useEffect(() => {
        let x;
        if (showAnimation) {
            x = setInterval(() => {
                setCurrentIndex(i => {
                    if (i === imgUrls.length - 1)
                        return 0;
                    else
                        return i + 1;
                });
            }, 2000);
        }
        else {
            setCurrentIndex(0);
            clearInterval(x);
        }
        return () => clearInterval(x);
    }, [showAnimation]);

    if (itemFiles.length === 0)
        return null;

    return <>
        <div className="relative shadow-xl lg:w-[46%] xl:w-[30%] h-[630px] rounded-t-[32px]" onMouseEnter={() => setShowWishlistAndShare(true)} onMouseLeave={() => setShowWishlistAndShare(false)}>
            {
                ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[currentIndex].split(".")[itemFiles[currentIndex].split(".").length - 1]) ? (
                    <img src={imgUrls[currentIndex]} alt="item image" className="h-[70%] w-full rounded-t-[32px] hover:cursor-pointer" onMouseEnter={() => setShowAnimation(true)} onMouseLeave={() => setShowAnimation(false)} />
                ) : (
                    <video className="h-[70%] w-full rounded-t-[32px] object-cover hover:cursor-pointer" loop={true} autoPlay="autoplay" muted onMouseEnter={() => setShowAnimation(true)} onMouseLeave={() => setShowAnimation(false)}>
                        <source src={imgUrls[currentIndex]} />
                    </video>
                )
            }
            {
                showAnimation && (
                    <div className="absolute bottom-[35%] left-[40%] flex flex-row items-center gap-x-[7px]">
                        {
                            imgUrls.map((img, index) => (
                                <div className={`bg-${index === currentIndex ? "[#FE9135]" : "white"} w-[5px] h-[5px] rounded-[100%]`} key={index}>

                                </div>
                            ))
                        }
                    </div>
                )
            }
            <div className="px-[5%] mt-[20px] w-full flex flex-row flex-nowrap justify-between">
                <p className="max-w-[65%] max-h-[30px] text-[18px] overflow-y-hidden text-ellipsis">{item.itemName.S}</p>
                <Image src={QuickView} alt="expand" className="w-[27px] h-[24px] hover:cursor-pointer" onClick={handleShowQuickView} />
            </div>
            <div className="px-[5%] mt-[10px] w-full flex flex-row flex-nowrap items-center gap-x-[10px]">
                <img src={sellerProfilePhotoUrl} alt="seller-img" className="w-[36px] h-[36px] rounded-[100%]" />
                <Link href={`/seller?sellerId=${item.sellerId}`}>
                    <p className="text-sm max-h-[30px] overflow-y-hidden text-ellipsis hover:underline">{sellerStoreName}</p>
                </Link>
            </div>
            <div className="px-[5%] mt-[10px] w-full flex flex-row flex-nowrap items-center gap-x-[10px]">
                <p className="text-xl font-medium">₹ {item.sellingPrice.N}</p>
                <p className="text-[#00000066] line-through">₹ {item.marketPrice.N}</p>
            </div>
            {
                showWishlistAndShare && (
                    <div className="absolute bg-gray-200 left-0 bottom-0 w-full flex flex-row items-center justify-between bg-[#FFF]">
                        {
                            !isWishlisted ? (
                                <div className="py-[12px] w-[50%] flex flex-row items-center justify-center gap-x-[10px] hover:cursor-pointer" style={{
                                    boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                }} onClick={addToWishlist}>
                                    <Image src={Like} alt="like" className="w-[18px] h-[16px]" />
                                    <p className="font-light">Wishlist</p>
                                </div>
                            ) : (
                                <div className="py-[12px] w-[50%] flex flex-row items-center justify-center gap-x-[10px] hover:cursor-pointer" style={{
                                    boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                }} onClick={removeFromWishlist}>
                                    <Image src={Like2} alt="like" className="w-[18px] h-[16px]" />
                                    <p className="font-light">Wishlisted</p>
                                </div>
                            )
                        }
                        <div className="py-[12px] w-[50%] flex flex-row items-center justify-center gap-x-[10px] hover:cursor-pointer" style={{
                            boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                        }}>
                            <Image src={ShareProfile} alt="share-profile" className="w-[15px] h-[18px]" />
                            <p className="font-light">Share</p>
                        </div>
                    </div>
                )
            }
        </div>
        <Modal show={showQuickView} onHide={handleCloseQuickView} className="mt-[100px] lg:max-w-[70%] lg:left-[15%] xl:max-w-[55%] xl:left-[22.5%] 2xl:max-w-[45%] 2xl:left-[27.5%]">
            <Modal.Body className="w-full h-[450px] flex flex-row justify-between p-0 overflow-y-hidden">
                <section className="relative w-[45%] h-full">
                    <img src={imgUrls[modalCurrentIndex]} alt="item-img" className="absolute z-0 w-full h-full rounded-l-[32px]" />
                    {
                        modalCurrentIndex === 0 ? (
                            <div className="absolute z-10 w-[42px] h-[42px] rounded-[100%] bg-[#FFFFFF] hover:cursor-pointer top-[45%] left-3 flex flex-row flex-nowrap items-center justify-center">
                                <Image src={LeftLightArrow} alt="arrow" className="w-[50%] h-[40%]" />
                            </div>
                        ) : (
                            <Image src={LeftDarkArrow} alt="arrow" className="absolute z-10 w-[42px] h-[42px] hover:cursor-pointer top-[45%] left-3" onClick={reduceModalCurrentIndex} />
                        )
                    }
                    {
                        modalCurrentIndex === imgUrls.length - 1 ? (
                            <Image src={RightLightArrow} alt="arrow" className="absolute z-10 w-[42px] h-[42px] hover:cursor-pointer top-[45%] right-3" />
                        ) : (
                            <div className="absolute z-10 w-[42px] h-[42px] rounded-[100%] bg-[#FFFFFF] hover:cursor-pointer top-[45%] right-3 flex flex-row flex-nowrap items-center justify-center" onClick={increaseModalCurrentIndex}>
                                <Image src={RightDarkArrow} alt="arrow" className="w-[50%] h-[40%]" />
                            </div>
                        )
                    }
                    <div className="absolute bottom-2 left-[35%] flex flex-row flex-nowrap items-center gap-x-[7px]">
                        {
                            imgUrls.map((url, index) => (
                                <div className={`w-[8px] h-[8px] rounded-[100%] bg-[${index === modalCurrentIndex ? "#FBC246" : "#D9D9D9"}]`} key={index}>
                                </div>
                            ))
                        }
                    </div>
                </section>
                <section className="relative w-[50%] h-full">
                    <Image src={LeftLeaf} alt="leaf" className="absolute h-[70px] w-[218px] top-[-10px] left-[-30px]" />
                    <Image src={RightLeaf} alt="leaf" className="absolute h-[70px] w-[218px] top-[-10px] right-[30px]" />
                    <Image src={Close} alt="close" className="absolute top-10 right-4 w-[16px] h-[16px] hover:cursor-pointer" onClick={handleCloseQuickView} />
                    <p className="mt-[60px] font-medium text-[18px]">{item.itemName.S}</p>
                    <div className="mt-[20px] flex flex-row flex-nowrap items-center gap-x-[10px]">
                        <img src={sellerProfilePhotoUrl} alt="seller-img" className="w-[36px] h-[36px] rounded-[100%]" />
                        <p className="text-sm">{sellerStoreName}</p>
                    </div>
                    <div className="mt-[20px] w-full flex flex-row flex-nowrap items-center gap-x-[10px]">
                        <p className="text-xl font-medium">₹ {item.sellingPrice.N}</p>
                        <p className="text-[#00000066] line-through">₹ {item.marketPrice.N}</p>
                    </div>
                    <p className="mt-[15px] text-sm font-medium">Condition: <span className="font-normal">{item.condition.S}</span></p>
                    <p className="mt-[15px] text-sm font-medium">Category: <span className="font-normal">{item.category.S}</span></p>
                    <button className="block mt-[30px] bg-[#FE9135] text-white rounded-[24px] py-[10px] px-[100px] font-medium">Add to cart</button>
                    <button className="block mt-[20px] border border-[#9D9D9D] rounded-[24px] py-[10px] px-[95px] font-medium">More Details</button>
                </section>
            </Modal.Body>
        </Modal>
    </>
}