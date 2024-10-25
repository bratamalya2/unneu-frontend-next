"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
];

export default function Left({ itemId, itemDetails }) {
    const [itemFiles, setItemFiles] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [uploadDate, setUploadDate] = useState("");
    const [itemWidth, setItemWidth] = useState(0);
    const [itemHeight, setItemHeight] = useState(0);

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

    useEffect(() => {
        if (itemId)
            fetchFiles();
    }, [itemId]);

    useEffect(() => {
        if (itemFiles.length > 0)
            fetchImgUrls();
    }, [itemFiles]);

    useEffect(() => {
        const width = window.innerWidth;
        if (width < 1024) {
            setItemWidth(0.9 * width);
            setItemHeight(0.8 * 560);
        }
        else if (width < 1280) {
            setItemWidth(0.9 * width * 0.5 * 0.75);
            setItemHeight(560);
        }
        else if (width >= 1400 && width < 1536) {
            setItemWidth(0.9 * width * 0.45 * 0.8);
            setItemHeight(560);
        }
        else {
            setItemWidth(0.9 * width * 0.4 * 0.75);
            setItemHeight(560);
        }
    }, []);

    useEffect(() => {
        const date = new Date(itemDetails.uploadDateTime);
        let dateSuffix;
        switch (date.getDate()) {
            case 1:
                dateSuffix = "st";
                break;
            case 2:
                dateSuffix = "nd";
                break;
            case 3:
                dateSuffix = "rd";
                break;
            default:
                dateSuffix = "th";
                break;
        }
        setUploadDate(`${date.getDate()}${dateSuffix} ${months[date.getMonth()]} ${date.getFullYear()}`);
    }, [itemDetails]);

    if (imgUrls.length === 0)
        return null;

    return <aside className="relative lg:w-[50%] min-[1400px]:w-[55%] h-[600px] lg:h-[950px] flex flex-col-reverse lg:flex-row justify-between">
        <div className={`w-full lg:w-[20%] min-[1400px]:w-[20%] 2xl:w-[15%] flex ${window.innerWidth < 1024 ? "flex-row" : "flex-col"} gap-x-[5px] lg:gap-x-0 lg:gap-y-[6px] h-[15%] lg:h-full`}>
            {
                imgUrls.map((url, tmpIndex) => {
                    return ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[tmpIndex].split(".")[itemFiles[tmpIndex].split(".").length - 1]) ? (
                        <img src={url} alt="item image" className={`w-[19%] lg:w-full h-full lg:h-[15%] rounded-[8px] hover:cursor-pointer ${currentIndex === tmpIndex && "border-[3px] border-[#101010]"}`} onClick={() => setCurrentIndex(tmpIndex)} />
                    ) : (
                        <video className={`w-[19%] lg:w-full h-full lg:h-[19%] rounded-[8px] object-cover hover:cursor-pointer ${currentIndex === tmpIndex && "border-[3px] border-[#101010]"}`} loop={true} autoPlay="autoplay" muted onClick={() => setCurrentIndex(tmpIndex)} >
                            <source src={url} />
                        </video>
                    )

                })
            }
            <p className="lg:hidden absolute bottom-[-20px] left-0 text-[#A4A2A2] text-xs">
                Product listed on {uploadDate}
            </p>
        </div>
        <div className="relative lg:w-[75%] min-[1400px]:w-[75%] 2xl:w-[80%] h-[80%] lg:h-full">
            {
                ["jpg", "jpeg", "png", "gif", "tiff", "tif", "bmp", "svg", "webp", "heif", "heic", "raw"].includes(itemFiles[currentIndex].split(".")[itemFiles[currentIndex].split(".").length - 1]) ? (
                    //<img src={imgUrls[currentIndex]} alt="item image" className="w-full h-full rounded-[24px] hover:cursor-pointer" />
                    <div className="w-full h-full rounded-[24px] default-background-svg"
                        style={{
                            backgroundImage: `url("${imgUrls[currentIndex]}")`
                        }}
                    />
                ) : (
                    <video className="w-full h-full rounded-[24px] object-cover" loop={true} autoPlay="autoplay" muted >
                        <source src={imgUrls[currentIndex]} />
                    </video>
                )
            }
            <p className="hidden lg:block pl-5 absolute bottom-[-50px] left-0 text-[#A4A2A2] text-[15px]">
                Product listed on {uploadDate}
            </p>
        </div>
    </aside>
}