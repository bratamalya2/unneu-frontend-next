"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useUnneuDataStore } from "@/store/store";

import Illustration from "@/../public/footer-illustration.svg";
import DeleteItemFromCart from "@/../public/delete-cart-item.svg";

export default function CartItem({ itemId }) {
    const removeFromCart = useUnneuDataStore(store => store.removeFromCart);
    const [itemDetails, setItemDetails] = useState(null);
    const [itemFiles, setItemFiles] = useState([]);
    const [imgUrl, setImgUrl] = useState("");

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

    useEffect(() => {
        if (itemId) {
            fetchItemDetails();
            fetchFiles();
        }
    }, [itemId]);

    useEffect(() => {
        console.log(itemDetails);
    }, [itemDetails]);

    useEffect(() => {
        if (itemFiles.length > 0)
            fetchImgUrl();
    }, [itemFiles]);

    if (itemFiles.length === 0 || !itemDetails)
        return null;

    return <div className="relative w-full flex flex-row flex-nowrap justify-between p-[2%] border-[0.5px] border-[#00000066] rounded-[24px]" style={{
        boxShadow: "0px 11px 30px 4px rgba(81, 69, 55, 0.10)"
    }}>
        <Image src={DeleteItemFromCart} alt="delete" className="absolute w-[14px] lg:w-[24px] h-[14px] lg:h-[24px] right-[20px] lg:right-[25px] bottom-[15px] lg:top-[25px] hover:cursor-pointer" onClick={() => {
            removeFromCart(itemId);
        }} />
        <Image src={Illustration} alt="bg" className="absolute w-full h-full top-0 left-0 z-[-10] opacity-55" />
        {
            ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[0].split(".")[itemFiles[0].split(".").length - 1]) ?
                (
                    <img src={imgUrl} alt="item image" className="w-[40%] lg:w-[30%] h-full rounded-[24px]" />
                ) : (
                    <video className="w-[40%] lg:w-[30%] h-full rounded-[24px]" loop={true} autoPlay="autoplay" muted>
                        <source src={imgUrl} />
                    </video>
                )
        }
        <div className="w-[55%] h-full">
            <p className="text-[15px] font-medium lg:font-normal lg:text-lg max-w-[70%] max-h-[60px] overflow-hidden">{itemDetails.itemName}</p>
            <p className="mt-[10px] text-[15px] lg:text-lg font-semibold">₹ {itemDetails.sellingPrice} <span className="text-sm lg:text-base text-[#00000066] font-normal line-through">₹ {itemDetails.marketPrice}</span></p>
        </div>
    </div>
}