import { useState, useEffect } from "react";
import Image from "next/image";

import Options from "@/../public/options (2).png";
import Options2 from "@/../public/options (2) dark.png";
import Likes from "@/../public/like (2).png";
import LeftArrowLight from "@/../public/light arrow.svg";
import RightArrowDark from "@/../public/dark arrow.svg";

function Item({ itemDetail }) {
    const [itemFiles, setItemFiles] = useState([]);
    const [itemUrls, setItemUrls] = useState([]);

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
                <img src={itemUrls[0]} alt="item image" className="w-full h-[300px] lg:h-[370px] rounded-[6px]" />
            ) : (
                <video className="w-full h-[300px] lg:h-[370px] rounded-[6px] object-cover" loop={true} autoPlay="autoplay" muted>
                    <source src={itemUrls[0]} />
                </video>
            )
        }
        <Image src={Options} alt="options" className="hidden lg:inline-block absolute w-[40px] h-[40px] top-2 right-2 z-10 hover:cursor-pointer" />
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
    </div>
}

export default Item;