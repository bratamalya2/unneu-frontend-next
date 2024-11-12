import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "react-bootstrap/Modal";

import { useUnneuDataStore } from "@/store/store";

import Options from "@/../public/options (2).png";
import Options2 from "@/../public/options (2) dark.png";
import Likes from "@/../public/like (2).png";
import Delete from "@/../public/delete.png";
import Close from "@/../public/close.png";
import LeftLightArrow from "@/../public/light arrow.svg";
import LeftDarkArrow from "@/../public/left dark arrow.svg";
import RightLightArrow from "@/../public/right light arrow.svg";
import RightDarkArrow from "@/../public/dark arrow.svg";

function Item({ itemDetail, sellerId, setIsItemDeleted }) {
    const router = useRouter();
    const [itemFiles, setItemFiles] = useState([]);
    const [itemUrls, setItemUrls] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [itemHeight, setItemHeight] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const [itemImagesOffset, setItemImagesOffset] = useState(0);
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const setJwtTokenAtStore = useUnneuDataStore(store => store.setJwtToken);
    const [mobileLikesHeight, setMobileLikesHeight] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reduceCurrentIndex = () => {
        if (currentIndex > 0)
            setCurrentIndex(curr => curr - 1);
    };

    const increaseCurrentIndex = () => {
        if (currentIndex < itemUrls.length - 1)
            setCurrentIndex(curr => curr + 1);
    };

    const deleteItem = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/deleteItem`, {
                method: "POST",
                headers: {
                    jwttoken: jwtToken,
                    refreshtoken: refreshToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemId: itemDetail.itemId
                })
            });
            const y = await x.json();
            if (y.success)
                setIsItemDeleted(true);
            else if (y.err === "Refresh JWT Token!") {
                setJwtTokenAtStore(y.jwt);
                setJwtToken(y.jwt);
                const x2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/deleteItem`, {
                    method: "POST",
                    headers: {
                        jwttoken: y.jwt,
                        refreshtoken: refreshToken,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        itemId: itemDetail.itemId
                    })
                });
                const y2 = await x2.json();
                if (y2.success)
                    setIsItemDeleted(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchItemFiles = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/getItemImagesAndVideos`, {
                method: "GET",
                headers: {
                    itemid: itemDetail.itemId
                }
            });
            const y = await x.json();
            if (y.success) {
                setItemFiles(y.itemFiles);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchImageURL = async (key) => {
        try {
            const arr = [];
            for (let i = 0; i < itemFiles.length; i++) {
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/fetchImage`, {
                    method: "GET",
                    headers: {
                        imageKey: itemFiles[i]
                    }
                });
                const y = await x.json();
                if (y.success)
                    arr.push(y.imgUrl)
            }
            setItemUrls(arr);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (itemDetail)
            fetchItemFiles();
    }, [itemDetail]);

    useEffect(() => {
        if (itemFiles) {
            fetchImageURL();
        }
    }, [itemFiles]);

    useEffect(() => {
        setItemImagesOffset((itemUrls.length / 2) * 12);
    }, [itemUrls]);

    useEffect(() => {
        setMobileLikesHeight(itemHeight - 40);
    }, [itemHeight]);

    useEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 1024) {
            setItemWidth(0.45 * windowWidth * 0.9);
            setItemHeight(250);
        }
        else if (windowWidth < 1280) {
            setItemWidth(0.23 * windowWidth * 0.9);
            setItemHeight(500);
        }
        else {
            setItemWidth(0.19 * windowWidth * 0.9);
            setItemHeight(450);
        }
        const store = JSON.parse(localStorage.getItem("unneuDataStore"));
        setJwtToken(store.state.jwtToken);
        setRefreshToken(store.state.refreshToken);
    }, []);

    if (!itemFiles.length || !itemUrls.length)
        return null;
    return <div className="relative w-[45%] lg:w-[24%] xl:w-[23%] 2xl:w-[19%] flex flex-col flex-nowrap relative z-0">
        {
            ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[0].split(".")[itemFiles[0].split(".").length - 1]) ? (
                <div className={`h-[${itemHeight}px] w-full object-cover rounded-[6px] z-0`}>
                    <Image src={itemUrls[0]} height={itemHeight} width={itemWidth} alt="item image" className={`h-full w-full object-cover rounded-[6px] z-0`} onClick={handleShow} />
                </div>
            ) : (
                <div className={`h-[${itemHeight}px] w-full rounded-[6px] z-0`}>
                    <video className={`w-full h-full rounded-[6px] object-cover z-0`} loop={true} autoPlay="autoplay" muted onClick={handleShow}>
                        <source src={itemUrls[0]} />
                    </video>
                </div>
            )
        }
        <Image src={Options} alt="options" className="hidden lg:inline-block absolute w-[40px] h-[40px] top-2 right-2 z-10 hover:cursor-pointer" onClick={() => {
            setShowOptions(x => !x);
        }} />
        <div className={`${showOptions ? "block" : "hidden"} z-[500] max-h-[85px] absolute w-[120px] flex flex-col flex-nowrap items-center font-medium bg-[#E2E2E2] bottom-[-50px] right-0 lg:top-[50px] lg:right-2`}>
            <div className="w-full py-[8px] text-center hover:cursor-pointer" onClick={() => {
                router.push(`/seller/editItem?sellerId=${sellerId}&itemId=${itemDetail.itemId}`);
            }}>Edit listing</div>
            <div className="h-[1px] w-full bg-black"></div>
            <div className="w-full py-[8px] text-center flex flex-row flex-nowrap items-center justify-center gap-x-2 hover:cursor-pointer" onClick={() => {
                deleteItem();
                setShowOptions(false);
            }} >
                <Image src={Delete} alt="delete" className="w-[16px] h-[16px]" />
                Delete
            </div>
        </div>
        <div className={`absolute block lg:hidden flex flex-row flex-nowrap items-center gap-x-[8px] top-[${mobileLikesHeight}px] right-2 bg-white py-[4px] px-[10px] rounded-[6px]`}>
            <p className="text-sm font-medium">{itemDetail.noOfLikes}</p>
            <Image src={Likes} alt="likes" className="w-[14px] h-[13px]" />
        </div>
        <div className="px-2 mt-[16px] w-full flex flex-row justify-between">
            <p className="text-sm lg:text-[18px] font-medium max-w-[70%]">{itemDetail.itemName}</p>
            <div className="hidden lg:flex flex-row flex-nowrap gap-x-2">
                <p className="font-medium">{itemDetail.noOfLikes}</p>
                <Image src={Likes} alt="likes" className="relative w-[18px] h-[16px] top-1" />
            </div>
            <Image src={Options2} alt="options" className="lg:hidden hover:cursor-pointer w-[30px] h-[30px]" onClick={() => setShowOptions(x => !x)} />
        </div>
        <div className="w-full px-2 w-full flex flex-row flex-nowrap items-center">
            <p className="text-[#2E9E33] lg:text-xl font-medium">₹ {itemDetail.sellingPrice}</p>
            <p className="line-through ml-[15px] text-sm lg:text-base">₹ {itemDetail.marketPrice}</p>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body className="max-h-[600px] lg:max-h-[800px]">
                <Image src={Close} alt="close" className="absolute w-[18px] h-[18px] right-5 top-5 hover:cursor-pointer" onClick={handleClose} />
                {
                    ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[currentIndex].split(".")[itemFiles[currentIndex].split(".").length - 1]) ? (
                        <img src={itemUrls[currentIndex]} alt="item image" className="mx-auto h-[500px] lg:h-[750px] max-w-[94%] rounded-[6px]" />
                    ) : (
                        <video className="mx-auto h-[500px] lg:h-[750px] max-w-[94%] rounded-[6px] object-cover" loop={true} autoPlay="autoplay" muted>
                            <source src={itemUrls[currentIndex]} />
                        </video>
                    )
                }
                {
                    currentIndex === 0 ? (
                        <div className="absolute w-[50px] h-[50px] top-[50%] left-2 flex flex-row flex-nowrap items-center justify-center bg-white border border-gray-600 rounded-[100%]">
                            <Image src={LeftLightArrow} alt="left-arrow" className=" w-[25px] h-[25px]" />
                        </div>
                    ) : (
                        <Image src={LeftDarkArrow} alt="left-arrow" className="absolute w-[50px] h-[50px] top-[50%] left-2" onClick={reduceCurrentIndex} />
                    )
                }
                {
                    currentIndex === itemUrls.length - 1 ? (
                        <Image src={RightLightArrow} alt="right-arrow" className="absolute w-[50px] h-[50px] top-[50%] right-2" />
                    ) : (
                        <div className="absolute w-[50px] h-[50px] top-[50%] right-2 flex flex-row flex-nowrap items-center justify-center bg-white border border-gray-600 rounded-[100%]" onClick={increaseCurrentIndex}>
                            <Image src={RightDarkArrow} alt="right-arrow" className="absolute w-[25px] h-[25px]" />
                        </div>
                    )
                }
                <div className="absolute flex flex-row flex-nowrap items-center bottom-5 gap-x-[7px]" style={{
                    left: `calc(50% - ${itemImagesOffset}px)`
                }}>
                    {
                        itemUrls.map((url, i) => <div className={`w-[10px] lg:w-[14px] h-[10px] lg:h-[14px] ${i === currentIndex ? "bg-[#FE9135]" : "bg-white"} rounded-[100%]`} key={i}></div>)
                    }
                </div>
            </Modal.Body>
        </Modal>
    </div>
}

export default Item;