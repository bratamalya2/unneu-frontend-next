import { useState, useEffect } from "react";
import Image from "next/image";

import Options from "@/../public/options (2).png";
import Options2 from "@/../public/options (2) dark.png";
import Likes from "@/../public/like (2).png";

function Item({ itemDetail }) {
    const [itemFile, setItemFile] = useState(null);
    const [itemUrl, setItemUrl] = useState(null);

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
                setItemFile(y.itemFiles[0]);
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchImageURL = async (key) => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/fetchImage`, {
                method: "GET",
                headers: {
                    imageKey: key
                }
            });
            const y = await x.json();
            if (y.success)
                setItemUrl(y.imgUrl);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(itemDetail);
        if (itemDetail)
            fetchItemFiles();
    }, [itemDetail]);

    useEffect(() => {
        if (itemFile) {
            console.log(itemFile);
            fetchImageURL(itemFile);
        }
    }, [itemFile]);

    if (!itemFile || !itemUrl)
        return null;
    return <div className="w-[45%] lg:w-[25%] h-[350px] flex flex-col flex-nowrap relative z-0">
        {
            ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFile.split(".")[itemFile.split(".").length - 1]) ? (
                <img src={itemUrl} alt="item image" className="w-full h-[240px] lg:h-[270px] rounded-[6px]" />
            ) : (
                <video className="w-full h-[240px] lg:h-[270px] rounded-[6px] object-cover" loop={true} autoPlay="autoplay" muted>
                    <source src={itemUrl} />
                </video>
            )
        }
        <Image src={Options} alt="options" className="hidden lg:inline-block absolute w-[40px] h-[40px] top-2 right-2 z-10 hover:cursor-pointer" />
        <div className="absolute block lg:hidden flex flex-row flex-nowrap items-center gap-x-[8px] top-[200px] right-2 bg-white py-[4px] px-[10px] rounded-[6px]">
            <p className="text-sm font-medium">{itemDetail.noOfLikes}</p>
            <Image src={Likes} alt="likes" className="w-[14px] h-[13px]" />
        </div>
        <div className="px-2 mt-[16px] w-full flex flex-row items-center justify-between">
            <p className="text-sm lg:text-[18px] font-medium max-w-[70%]">{itemDetail.itemName}</p>
            <div className="hidden lg:block flex flex-row flex-nowrap items-center gap-x-2">
                <p className="font-medium">{itemDetail.noOfLikes}</p>
                <Image src={Likes} alt="likes" className="w-[18px] h-[16px]" />
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