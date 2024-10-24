"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Error from "next/error";

import Left from "@/components/itemDetailsPage/left";
import Right from "@/components/itemDetailsPage/right";

export default function ItemHome() {
    const searchParams = useSearchParams();
    const [isItemProfileExists, setIsItemProfileExists] = useState(false);
    const [itemDetails, setItemDetails] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchItemDetails = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buyer/fetchSingleItemDetails`, {
                method: "GET",
                headers: {
                    itemid: searchParams.get("itemId")
                }
            });
            const y = await x.json();
            if (y.success) {
                setItemDetails(y.itemDetails);
                setIsItemProfileExists(true);
                setIsLoaded(true);
            }
            else {
                setIsItemProfileExists(false);
                setIsLoaded(true);
            }
        }
        catch (err) {
            console.log(err);
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        //fetch user details
        if (searchParams.get("itemId")) {
            fetchItemDetails();
        }
        else
            setIsLoaded(true);
    }, []);

    return <main className="w-full relative my-[12px] lg:my-[48px] px-[5%]">
        {
            searchParams.get("itemId") && isItemProfileExists && isLoaded && <>
                <p className="text-sm lg:text-base mt-[16px] lg:mt-[35px] mb-[20px] text-[#494949]">Home / shop / {itemDetails.itemName}</p>
                <section className="w-full flex flex-col lg:flex-row flex-nowrap justify-between pb-[30px] lg:pb-[100px]">
                    <Left itemId={searchParams.get("itemId")} itemDetails={itemDetails} />
                    <Right itemId={searchParams.get("itemId")} itemDetails={itemDetails} />
                </section>
            </>
        }
        {
            !isItemProfileExists && isLoaded && (
                <Error statusCode={404} />
            )
        }
    </main>
}