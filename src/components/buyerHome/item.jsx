"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";

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
import Facebook from "@/../public/facebook-share.svg";
import Linkedin from "@/../public/linkedin-share.svg";
import X from "@/../public/x-share.svg";
import Whatsapp from "@/../public/whatsapp-share.svg";
import ShareLink from "@/../public/share-link.svg";
import Options from "@/../public/options.png";

export default function Item({ item }) {
    const pageUrl = encodeURIComponent(`https://unneu.com/buyer/item?itemId=${item.sellerId}`);
    const shareText = encodeURIComponent("Check out this awesome page!");
    const [itemFiles, setItemFiles] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [itemImagesOffset, setItemImagesOffset] = useState(0);
    const [sellerStoreName, setSellerStoreName] = useState(null);
    const [sellerProfilePhoto, setSellerProfilePhoto] = useState(null);
    const [sellerProfilePhotoUrl, setSellerProfilePhotoUrl] = useState("");
    const [showAnimation, setShowAnimation] = useState(false);
    const [showMobileShare, setShowMobileShare] = useState(false);
    const [showWishlistAndShare, setShowWishlistAndShare] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
    const [showQuickView, setShowQuickView] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isWishlistModified, setIsWishlistModified] = useState(false);
    const setJwtTokenAtStore = useUnneuDataStore(store => store.setJwtToken);
    const [showShareModal, setShowShareModal] = useState(false);
    const setShowSignIn = useUnneuDataStore(store => store.setShowSignIn);
    const setShowSignUp = useUnneuDataStore(store => store.setShowSignUp);

    const handleCloseShareModal = () => setShowShareModal(false);
    const handleShowShareModal = () => setShowShareModal(true);

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

    const openShareLink = (url) => {
        window.open(url, "_blank");
    };

    useEffect(() => {
        if (item) {
            //console.log(item);
            fetchFiles();
            fetchSellerDetails();
            const store = JSON.parse(localStorage.getItem("unneuDataStore"));
            setJwtToken(store.state.jwtToken);
            setRefreshToken(store.state.refreshToken);
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
        setItemImagesOffset((imgUrls.length / 2) * 12);
    }, [imgUrls]);

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
        <div className="bg-[#F4F4F4] lg:bg-white relative shadow-xl w-[48%] lg:w-[31%] xl:w-[28%] min-[1400px]:w-[22%] 2xl:w-[23%] min-[1715px]:w-[20%] h-[370px] lg:h-[470px] xl:h-[550px] min-[1400px]:h-[450px] 2xl:h-[500px] min-[1715px]:h-[550px] rounded-t-[32px]" onMouseEnter={() => setShowWishlistAndShare(true)} onMouseLeave={() => setShowWishlistAndShare(false)}>
            {
                ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[currentIndex].split(".")[itemFiles[currentIndex].split(".").length - 1]) ? (
                    <img src={imgUrls[currentIndex]} alt="item image" className="h-[55%] lg:h-[55%] min-[1400px]:h-[55%] w-full rounded-t-[32px] hover:cursor-pointer" onMouseEnter={() => {
                        if (window.innerWidth >= 1024)
                            setShowAnimation(true);
                    }}
                        onMouseLeave={() => {
                            if (window.innerWidth >= 1024);
                            setShowAnimation(false);
                        }} />
                ) : (
                    <video className="h-[55%] lg:h-[55%] min-[1400px]:h-[60%] w-full rounded-t-[32px] object-cover hover:cursor-pointer" loop={true} autoPlay="autoplay" muted onMouseEnter={() => {
                        if (window.innerWidth >= 1024)
                            setShowAnimation(true);
                    }}
                        onMouseLeave={() => {
                            if (window.innerWidth >= 1024)
                                setShowAnimation(false);
                        }}>
                        <source src={imgUrls[currentIndex]} />
                    </video>
                )
            }
            <aside className="lg:hidden absolute w-[75px] h-[40px] bottom-[46%] left-[25%] flex flex-row flex-nowrap items-center justify-between">
                <div className="w-[29px] h-[29px] rounded-[100%] bg-white flex flex-row flex-nowrap items-center justify-center">
                    <Image src={isWishlisted ? Like2 : Like} alt="wishlist" className="w-[18px] h-[15px]" onClick={() => {
                        if (isWishlisted)
                            removeFromWishlist();
                        else
                            addToWishlist();
                    }} />
                </div>
                <div className="w-[29px] h-[29px] rounded-[100%] bg-white flex flex-row flex-nowrap items-center justify-center">
                    <Image src={QuickView} alt="quick-view" className="w-[15px] h-[18px]" onClick={handleShowQuickView} />
                </div>
            </aside>
            {
                showAnimation && imgUrls.length > 1 && (
                    <div className="hidden absolute bottom-[46%] lg:flex flex-row items-center gap-x-[7px]" style={{
                        left: `calc(50% - ${itemImagesOffset}px)`
                    }}>
                        {
                            imgUrls.map((img, index) => (
                                <div className={`bg-${index === currentIndex ? "[#FE9135]" : "white"} w-[5px] h-[5px] rounded-[100%]`} key={index}>

                                </div>
                            ))
                        }
                    </div>
                )
            }
            <div className="px-[5%] mt-[20px] lg:mt-[30px] w-full flex flex-row flex-nowrap justify-between">
                <p className="lg:max-w-[65%] max-h-[20px] text-sm lg:text-[18px] overflow-y-hidden text-ellipsis">{item.itemName.S}</p>
                <Image src={QuickView} alt="expand" className="hidden lg:block w-[27px] h-[24px] hover:cursor-pointer" onClick={handleShowQuickView} />
            </div>
            <div className="px-[5%] mt-[10px] w-full flex flex-row flex-nowrap items-center gap-x-[10px]">
                <img src={sellerProfilePhotoUrl} alt="seller-img" className="w-[24px] lg:w-[36px] h-[24px] lg:h-[36px] rounded-[100%]" />
                <Link href={`/seller?sellerId=${item.sellerId}`}>
                    <p className="text-xs lg:text-sm max-h-[30px] overflow-y-hidden text-ellipsis hover:underline">{sellerStoreName}</p>
                </Link>
            </div>
            <div className="px-[5%] mt-[10px] w-full flex flex-row flex-nowrap items-center gap-x-[10px]">
                <p className="lg:text-xl font-medium">₹ {item.sellingPrice.N}</p>
                <p className="text-sm lg:text-base text-[#00000066] line-through">₹ {item.marketPrice.N}</p>
            </div>
            <div className="relative lg:hidden px-[5%] mt-[15px] w-full flex flex-row flex-nowrap items-center justify-between">
                {
                    showMobileShare && (
                        <div className="z-50 absolute py-[8px] px-[18px] text-sm border-[0.5px] border-[#E0E0E0] bg-white flex flex-row flex-nowrap items-center gap-x-[9px] right-2 top-[-50px]" style={{
                            boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                        }} onClick={() => {
                            setShowMobileShare(false);
                            handleShowShareModal();
                        }}>
                            <Image src={ShareProfile} alt="share" className="w-[12px] h-[14px]" />
                            Share
                        </div>
                    )
                }
                <button className="py-[5px] px-[24px] rounded-[4px] bg-[#FE9135] active:bg-[#FBC246] text-white text-sm font-medium">Add to cart</button>
                <Image src={Options} alt="options" className="w-[5px] h-[22px]" onClick={() => setShowMobileShare(x => !x)} />
            </div>
            {
                showWishlistAndShare && (
                    <div className="px-[1%] hidden absolute bg-gray-200 left-0 bottom-0 w-full lg:flex flex-row items-center justify-between bg-[#FFF]">
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
                        }} onClick={handleShowShareModal}>
                            <Image src={ShareProfile} alt="share-profile" className="w-[15px] h-[18px]" />
                            <p className="font-light">Share</p>
                        </div>
                    </div>
                )
            }
        </div>
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
                    <p className="text-sm">https://unneu.com/buyer/item?itemId={item.sellerId}</p>
                </div>
                <button className="mt-[25px] bg-[#FE9135] text-white w-full py-[10px] rounded-[8px] text-xl font-medium active:bg-[#FBC246]" onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(`https://unneu.com/buyer/item?itemId=${item.sellerId}`);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }}>
                    Copy
                </button>
            </Modal.Body>
        </Modal>
        <Modal show={showQuickView} onHide={handleCloseQuickView} className="left-[20%] lg:left-0 w-[60%] lg:w-full mt-[100px] lg:max-w-[70%] lg:left-[15%] xl:max-w-[55%] xl:left-[22.5%] 2xl:max-w-[45%] 2xl:left-[27.5%] rounded-b-[16px] rounded-t-[16px] lg:rounded-b-0">
            <Modal.Body className="w-full h-[450px] flex flex-col lg:flex-row lg:justify-between p-0 overflow-y-hidden rounded-b-[16px] rounded-t-[16px] lg:rounded-b-0">
                <section className="relative w-full lg:w-[45%] h-[60%] lg:h-full">
                    <Image src={Close} alt="close" className="lg:hidden absolute top-4 right-4 w-[16px] h-[16px] hover:cursor-pointer z-10" onClick={handleCloseQuickView} />
                    <img src={imgUrls[modalCurrentIndex]} alt="item-img" className="absolute z-0 w-full h-full lg:rounded-l-[32px] lg:rounded-r-0" />
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
                    {
                        imgUrls.length > 1 && (
                            <div className="absolute bottom-2 flex flex-row flex-nowrap items-center gap-x-[7px]" style={{
                                left: `calc(50% - ${itemImagesOffset}px)`
                            }}>
                                {
                                    imgUrls.map((url, index) => (
                                        <div className={`w-[8px] h-[8px] rounded-[100%] bg-[${index === modalCurrentIndex ? "#FBC246" : "#D9D9D9"}]`} key={index}>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </section>
                <section className="relative w-full lg:w-[50%] h-[40%] lg:h-full">
                    <Image src={LeftLeaf} alt="leaf" className="hidden lg:block absolute h-[70px] w-[218px] top-[-10px] left-[-30px]" />
                    <Image src={RightLeaf} alt="leaf" className="hidden lg:block absolute h-[70px] w-[218px] top-[-10px] right-[30px]" />
                    <Image src={Close} alt="close" className="hidden lg:block absolute top-10 right-4 w-[16px] h-[16px] hover:cursor-pointer" onClick={handleCloseQuickView} />
                    <div className="mt-[15px] px-[5%] lg:hidden flex flex-row flex-nowrap items-center justify-between">
                        <div className="font-medium text-[15px] max-w-[65%] max-h-[20px] overflow-hidden">{item.itemName.S}</div>
                        <div className="font-semibold text-[17px] max-w-[30%]">₹ {item.sellingPrice.N}</div>
                    </div>
                    <p className="hidden lg:block lg:mt-[60px] font-medium text-[18px]">{item.itemName.S}</p>
                    <div className="px-[5%] lg:px-0 mt-[10px] lg:mt-[20px] flex flex-row flex-nowrap items-center gap-x-[10px]">
                        <img src={sellerProfilePhotoUrl} alt="seller-img" className="w-[36px] h-[36px] rounded-[100%]" />
                        <Link href={`/seller?sellerId=${item.sellerId}`}>
                            <p className="text-sm">{sellerStoreName}</p>
                        </Link>
                    </div>
                    <div className="hidden mt-[20px] w-full lg:flex flex-row flex-nowrap items-center gap-x-[10px]">
                        <p className="text-xl font-medium">₹ {item.sellingPrice.N}</p>
                        <p className="text-[#00000066] line-through">₹ {item.marketPrice.N}</p>
                    </div>
                    <p className="hidden lg:block mt-[15px] text-sm font-medium">Condition: <span className="font-normal">{item.condition.S}</span></p>
                    <p className="hidden lg:block mt-[15px] text-sm font-medium">Category: <span className="font-normal">{item.category.S}</span></p>
                    <button className="hidden lg:block mt-[30px] bg-[#FE9135] text-white rounded-[24px] py-[10px] px-[100px] font-medium">Add to cart</button>
                    <button className="hidden lg:block mt-[20px] border border-[#9D9D9D] rounded-[24px] py-[10px] px-[95px] font-medium">More Details</button>
                    <div className="lg:hidden w-full absolute bottom-0 left-0 flex flex-row flex-nowrap items-center justify-between">
                        <div className="py-[12px] w-[50%] text-white text-[15px] font-medium bg-[#FE9135] text-center">Add to cart</div>
                        <div className="py-[12px] w-[50%] text-[#787878] text-[15px] font-medium text-center border-t border-t-[#C8C8C8]">More details</div>
                    </div>
                </section>
            </Modal.Body>
        </Modal>
    </>
}