"use client";

import { useState, useEffect, useCallback } from "react";
import { useUnneuDataStore } from "@/store/store";
import { useRouter } from "next/navigation";

import SellerHomeHero from "@/components/sellerHome/sellerHomeHero";
import SellerHomeStepsToStartSelling from "@/components/sellerHome/sellerHomeStepsToStartSelling";
import SellerHomeWhySellWithUs from "@/components/sellerHome/sellerHomeWhySellWithUs";

export default function Home() {
    const router = useRouter();
    const phoneNumber = useUnneuDataStore(store => store.phoneNumber);
    const [x, setX] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStage = useCallback(async () => {
        try {
            if (phoneNumber.length) {
                setIsLoading(true);
                const a = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register/getStage`, {
                    method: "GET",
                    headers: {
                        "phonenumber": phoneNumber
                    }
                });
                const b = await a.json();
                setX(b);
            }
            else
                setIsLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (!phoneNumber.length)
            router.push(`/seller/register/1`);
    }, [phoneNumber, router]);

    useEffect(() => {
        fetchStage();
    }, [fetchStage]);

    useEffect(() => {
        if (x) {
            if (isLoading)
                setIsLoading(false);
            if (x.success) {
                if (x.stage === '4')
                    router.push("/seller");
                else if (x.stage === '0')
                    router.push("/seller/home");
                else
                    router.push(`/seller/register/${x.stage}`);
            }
        }
    }, [x, isLoading, router]);

    if (isLoading)
        return null;

    return <main className="relative">
        <SellerHomeHero />
        <SellerHomeStepsToStartSelling />
        <SellerHomeWhySellWithUs />
    </main>
}