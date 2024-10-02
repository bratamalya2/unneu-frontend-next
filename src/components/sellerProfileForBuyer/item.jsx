import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";

import Options2 from "@/../public/options (2) dark.png";
import Likes from "@/../public/like (2).png";
import Close from "@/../public/close.png";
import LeftLightArrow from "@/../public/light arrow.svg";
import LeftDarkArrow from "@/../public/left dark arrow.svg";
import RightLightArrow from "@/../public/right light arrow.svg";
import RightDarkArrow from "@/../public/dark arrow.svg";

function Item({ itemDetail }) {
    const [itemFiles, setItemFiles] = useState([]);
    const [itemUrls, setItemUrls] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [show, setShow] = useState(false);

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

    const fetchItemFiles = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/getItemImagesAndVideos`, {
                method: "GET",
                headers: {
                    itemid: itemDetail.itemId
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

    if (!itemFiles.length || !itemUrls.length)
        return null;
    return <div className="w-[45%] lg:w-[24%] xl:w-[21%] max-h-[600px] flex flex-col flex-nowrap relative z-0">
        {
            ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[0].split(".")[itemFiles[0].split(".").length - 1]) ? (
                <img src={itemUrls[0]} alt="item image" className="w-full h-[300px] lg:h-[370px] rounded-[6px]" onClick={handleShow} />
            ) : (
                <video className="w-full h-[300px] lg:h-[370px] rounded-[6px] object-cover" loop={true} autoPlay="autoplay" muted onClick={handleShow}>
                    <source src={itemUrls[0]} />
                </video>
            )
        }
        <div className="absolute block lg:hidden flex flex-row flex-nowrap items-center gap-x-[8px] top-[260px] right-2 bg-white py-[4px] px-[10px] rounded-[6px]">
            <p className="text-sm font-medium">{itemDetail.noOfLikes}</p>
            <Image src={Likes} alt="likes" className="w-[14px] h-[13px]" />
        </div>
        <div className="px-2 mt-[16px] w-full flex flex-row justify-between">
            <p className="text-sm lg:text-[18px] font-medium max-w-[70%]">{itemDetail.itemName}</p>
            <div className="hidden lg:flex flex-row flex-nowrap items-start gap-x-2">
                <p className="font-medium">{itemDetail.noOfLikes}</p>
                <Image src={Likes} alt="likes" className="relative w-[18px] h-[16px] top-1" />
            </div>
            <Image src={Options2} alt="options" className="lg:hidden hover:cursor-pointer w-[30px] h-[30px]" />
        </div>
        <div className="w-full px-2 w-full flex flex-row flex-nowrap items-center">
            <p className="text-[#2E9E33] lg:text-xl font-medium">₹ {itemDetail.sellingPrice}</p>
            <p className="line-through ml-[15px] text-sm lg:text-base">₹ {itemDetail.marketPrice}</p>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Image src={Close} alt="close" className="absolute w-[18px] h-[18px] right-5 top-5 hover:cursor-pointer" onClick={handleClose} />
                {
                    ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[0].split(".")[itemFiles[0].split(".").length - 1]) ? (
                        <img src={itemUrls[currentIndex]} alt="item image" className="mx-auto h-full max-w-[94%] rounded-[6px]" />
                    ) : (
                        <video className="mx-auto h-full max-w-[94%] rounded-[6px] object-cover" loop={true} autoPlay="autoplay" muted>
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
                <div className="absolute flex flex-row flex-nowrap items-center bottom-5 left-[45%] gap-x-[7px]">
                    {
                        itemUrls.map((url, i) => <div className={`w-[14px] h-[14px] ${i === currentIndex ? "bg-[#FE9135]" : "bg-white"} rounded-[100%]`} key={i}></div>)
                    }
                </div>
            </Modal.Body>
        </Modal>
    </div>
}

export default Item;