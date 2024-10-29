"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";

import { useUnneuDataStore } from "@/store/store";

import Like from "@/../public/like.png";
import Liked from "@/../public/like (2).png";
import Share from "@/../public/share-seller-profile.png";
import Options from "@/../public/options.png";
import Verified from "@/../public/verified.png";
import RatingSelected from "@/../public/rating-selected.png";
import RatingUnselected from "@/../public/rating-unselected.png";
import UpArrow from "@/../public/up-arrow.png";
import DownArrow from "@/../public/down-arrow.png";
import Facebook from "@/../public/facebook-share.svg";
import Linkedin from "@/../public/linkedin-share.svg";
import X from "@/../public/x-share.svg";
import Whatsapp from "@/../public/whatsapp-share.svg";
import ShareLink from "@/../public/share-link.svg";
import Close from "@/../public/close.png";

export default function Right({ itemId, itemDetails }) {
    const pageUrl = encodeURIComponent(`https://unneu.com/buyer/item?itemId=${itemId}`);
    const shareText = encodeURIComponent("Check out this awesome page!");
    const [sellerProfilePhotoUrl, setSellerProfilePhotoUrl] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isWishlistModified, setIsWishlistModified] = useState(false);
    const [sellerFullName, setSellerFullName] = useState("");
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isSellerVerified, setIsSellerVerified] = useState(false);
    const [avgSellerRating, setAvgSellerRating] = useState("0");
    const [numberOfReviews, setNumberOfReviews] = useState("0");
    const [sellerCity, setSellerCity] = useState("");
    const [sellerState, setSellerState] = useState("");
    const [ratingsArr, setRatingsArr] = useState([]);
    const [showCondition, setShowCondition] = useState(false);
    const [showProductHistory, setShowProductHistory] = useState(false);
    const [showValue, setShowValue] = useState(false);
    const setShowSignIn = useUnneuDataStore(store => store.setShowSignIn);
    const setShowSignUp = useUnneuDataStore(store => store.setShowSignUp);
    const addToCart = useUnneuDataStore(store => store.addToCart);
    const [showShareModal, setShowShareModal] = useState(false);

    const handleCloseShareModal = () => setShowShareModal(false);
    const handleShowShareModal = () => setShowShareModal(true);

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
                    itemId
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
                            itemId
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
                    itemId
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
                            itemId
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
                    itemid: itemId
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
                            itemid: itemId
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

    const openShareLink = (url) => {
        window.open(url, "_blank");
    };

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem("unneuDataStore"));
        setJwtToken(store.state.jwtToken);
        setRefreshToken(store.state.refreshToken);
    }, []);

    useEffect(() => {
        if (itemDetails)
            fetchSellerProfilePhotoUrl();
        if (itemId)
            fetchSellerDetails();
    }, [itemId, itemDetails]);

    useEffect(() => {
        if (itemId && jwtToken && refreshToken)
            isItemWishlisted();
        if (isWishlistModified)
            setIsWishlistModified(false);
    }, [itemId, jwtToken, refreshToken, isWishlistModified]);

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

    return <>
        <Modal show={showShareModal} onHide={handleCloseShareModal} className="lg:w-[65%] lg:left-[17.5%] xl:w-[55%] xl:left-[22.5%] mt-[200px]">
            <Modal.Body className="relative bg-[#F6F6F6] rounded-[20px] px-[25px] py-[15px]" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                <Image src={Close} alt="close" onClick={handleCloseShareModal} className="w-[18px] h-[18px] absolute top-5 right-5 hover:cursor-pointer" />
                <p className="text-2xl text-[#FE9135] font-semibold">Social Share</p>
                <p className="mt-[30px] text-[18px] font-medium">
                    Share this link via
                </p>
                <div className="mt-[15px] flex flex-row flex-nowrap items-center gap-x-[16px]">
                    <Image src={Facebook} alt="facebook" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
                    }} />
                    <Image src={Linkedin} alt="linkedin" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`);
                    }} />
                    <Image src={X} alt="x" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`);
                    }} />
                    <Image src={Whatsapp} alt="whatsapp" className="w-[50px] h-[54px] hover:cursor-pointer" onClick={() => {
                        openShareLink(`https://api.whatsapp.com/send?text=${shareText}%20${pageUrl}`);
                    }} />
                </div>
                <p className="mt-[20px] font-medium">
                    Copy link
                </p>
                <div className="mt-[12px] w-full border-[1.5px] border-[#5AA7BB] py-[23px] px-[17px] rounded-[8px] flex flex-row items-center flex-nowrap gap-x-1">
                    <Image src={ShareLink} alt="copy-link" className="w-[27px] h-[19px]" />
                    <p className="text-xs lg:text-sm">https://unneu.com/buyer/item?itemId={itemId}</p>
                </div>
                <button className="mt-[25px] bg-[#FE9135] text-white w-full py-[10px] rounded-[8px] text-xl font-medium active:bg-[#FBC246]" onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(`https://unneu.com/buyer/item?itemId=${itemId}`);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }}>
                    Copy
                </button>
            </Modal.Body>
        </Modal>
        <aside className="relative w-full lg:w-[45%] min-[1400px]:w-[40%] mt-[50px] lg:mt-0">
            <div className="w-full flex flex-row flex-nowrap justify-between">
                <p className="lg:text-xl max-w-[65%]">{itemDetails.itemName}</p>
                <div className="lg:w-[20%] xl:w-[15%] min-[1400px]:w-[12%] 2xl:w-[10%] flex flex-row flex-nowrap gap-x-[20px] pt-1 lg:pt-2">
                    <Image src={isWishlisted ? Liked : Like} alt="like" className="w-[18px] h-[16px]" onClick={() => {
                        if (isWishlisted)
                            removeFromWishlist();
                        else
                            addToWishlist();
                    }} />
                    <Image src={Share} alt="share" className="w-[13px] h-[16px]" onClick={handleShowShareModal} />
                    <Image src={Options} alt="Options" className="w-[4px] h-[16px]" />
                </div>
            </div>
            <p className="mt-[20px] flex flex-row flex-nowrap items-center gap-x-[12px]">
                <span className="text-[18px] lg:text-[22px] font-semibold">MRP ₹ <span className="text-xl">{itemDetails.marketPrice}</span></span>
                <span className="text-sm lg:text-[17px] text-[#00000066] line-through">₹ {itemDetails.sellingPrice}</span>
            </p>
            <p className="mt-[8px] text-xs lg:text-sm text-[#A4A2A2]">(Inclusive of all taxes)</p>
            <div className="relative mt-[24px] w-full h-[110px] lg:h-[140px] bg-[#FEEECB] rounded-[16px] pl-[12px] py-[12px] lg:p-[16px] flex flex-row flex-nowrap gap-x-[20px] lg:gap-x-[20px] xl:gap-x-[40px]">
                <Image src={sellerProfilePhotoUrl} alt="seller" width={64} height={64} className="w-[46px] lg:w-[64px] h-[46px] lg:h-[64px] rounded-[100%]" />
                {
                    isSellerVerified && (
                        <Image src={Verified} alt="verified" className="absolute left-[45px] lg:left-[60px] top-[50px] lg:top-[60px] w-[12px] lg:w-[16px] h-[12px] lg:h-[16px] rounded-[100%]" />
                    )
                }
                <div className="w-[70%] h-full">
                    <p className="text-xs lg:text-sm xl:text-[15px] font-semibold overflow-hidden max-h-[20px]">{sellerFullName}</p>
                    <p className="mt-[6px] text-xs lg:text-sm xl:text-base overflow-hidden max-h-[24px]">{sellerCity}, {sellerState}</p>
                    {
                        isSellerVerified && (
                            <div className="mt-[6px] text-xs flex flex-row items-center gap-x-[5px] lg:text-sm xl:text-base">
                                Verified Profile
                                <Image src={Verified} alt="verified" className="w-[12px] lg:w-[16px] xl:w-[20px] h-[12px] lg:h-[16px] xl:h-[20px] rounded-[100%]" />
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
                    <p className="text-xs lg:text-sm xl:text-base text-[#5148BA] underline w-[70px] lg:w-[80px] xl:w-[120px]">
                        View Store
                    </p>
                </Link>
            </div>
            <button className="my-[14px] lg:my-[32px] py-[19px] w-full rounded-[24px] bg-[#FE9135] text-[15px] lg:text-[22px] font-semibold lg:font-medium xl:font-semibold text-white active:bg-yellow-200" onClick={() => {
                addToCart(itemId);
            }}>Add to cart</button>
            <p className="mb-[12px] text-[15px] lg:text-[18px] font-semibold">Product Description</p>
            <p className="text-sm lg:text-base overflow-hidden">{itemDetails.description}</p>
            <p className="my-[32px] text-[15px] lg:text-[18px] font-semibold flex flex-row flex-nowrap items-center gap-x-[13px]">Category&nbsp;:<span className="text-[15px] lg:text-base font-normal">{itemDetails.category}</span></p>
            <div className="mb-[32px] text-[15px] lg:text-[18px] font-semibold flex flex-row flex-nowrap items-center gap-x-[13px]">Color&nbsp;:
                <div className="w-[20px] lg:w-[32px] h-[20px] lg:h-[32px] rounded-[100%] border border-black flex flex-row items-center justify-center bg-white">
                    <div className="w-[16px] lg:w-[20px] h-[16px] lg:h-[20px] rounded-[100%]" style={{
                        backgroundColor: itemDetails.color
                    }}></div>
                </div>
            </div>
            <div className="w-full py-[12px] px-[17px] flex flex-row flex-nowrap items-center justify-between text-[15px] lg:text-[18px] font-semibold rounded-[12px] bg-[#FAFAFA]" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                Condition
                <div className="w-[20px] lg:w-[40px] h-[20px] lg:h-[40px] rounded-[100%] bg-[#D9D9D9] flex flex-row flex-nowrap items-center justify-center">
                    <Image src={showCondition ? UpArrow : DownArrow} alt="arrow" className="w-[8px] lg:w-[20px] h-[5px] lg:h-[12px]" onClick={() => setShowCondition(x => !x)} />
                </div>
            </div>
            <div className={`${showCondition ? "mt-[6px] w-full min-h-[56px] lg:min-h-[72px] py-[12px] px-[17px]" : "mt-0 w-0 min-h-0 py-0 px-0"} text-sm lg:text-base transition-[height] duration-500 ease-in-out rounded-[20px] bg-[#FEEECB] flex flex-row flex-nowrap items-center`}>
                {showCondition && <span>{itemDetails.condition}</span>}
            </div>
            {
                itemDetails.productHistory.length > 0 && (
                    <>
                        <div className="w-full mt-[32px] py-[12px] px-[17px] flex flex-row flex-nowrap items-center justify-between text-[15px] lg:text-[18px] font-semibold rounded-[12px] bg-[#FAFAFA]" style={{
                            boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
                        }}>
                            Product history
                            <div className="w-[20px] lg:w-[40px] h-[20px] lg:h-[40px] rounded-[100%] bg-[#D9D9D9] flex flex-row flex-nowrap items-center justify-center">
                                <Image src={showProductHistory ? UpArrow : DownArrow} alt="arrow" className="w-[8px] lg:w-[20px] h-[5px] lg:h-[12px]" onClick={() => setShowProductHistory(x => !x)} />
                            </div>
                        </div>
                        <div className={`${showProductHistory ? "mt-[6px] w-full min-h-[56px] lg:min-h-[72px] py-[12px] px-[17px]" : "mt-0 w-0 min-h-0 py-0 px-0"} text-sm lg:text-base transition-[height] duration-500 ease-in-out rounded-[20px] bg-[#FEEECB] flex flex-row flex-nowrap items-center`}>
                            {showProductHistory && <span>{itemDetails.productHistory}</span>}
                        </div>
                    </>
                )
            }
            <div className="w-full mt-[32px] py-[12px] px-[17px] flex flex-row flex-nowrap items-center justify-between text-[15px] lg:text-[18px] font-semibold rounded-[12px] bg-[#FAFAFA]" style={{
                boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
            }}>
                Value
                <div className="w-[20px] lg:w-[40px] h-[20px] lg:h-[40px] rounded-[100%] bg-[#D9D9D9] flex flex-row flex-nowrap items-center justify-center">
                    <Image src={showValue ? UpArrow : DownArrow} alt="arrow" className="w-[8px] lg:w-[20px] h-[5px] lg:h-[12px]" onClick={() => setShowValue(x => !x)} />
                </div>
            </div>
            <div className={`${showValue ? "mt-[6px] w-full min-h-[56px] lg:min-h-[72px] py-[12px] px-[17px]" : "mt-0 w-0 min-h-0 py-0 px-0"} text-sm lg:text-base transition-[height] duration-500 ease-in-out rounded-[20px] bg-[#FEEECB] flex flex-col flex-nowrap justify-center`}>
                {showValue && <div>Market Price: ₹ {itemDetails.marketPrice}</div>}
                {showValue && <div>Seller Price: ₹ {itemDetails.sellingPrice}</div>}
            </div>
        </aside>
    </>
}