"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import { useUnneuDataStore } from "@/store/store";

import ProfileSection from "@/components/seller/profileSection";
import ItemsSections from "@/components/seller/itemsSections";

export default function Home() {
    const router = useRouter();
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const setJwtTokenGlobal = useUnneuDataStore(store => store.setJwtToken);
    const [sellerDetails, setSellerDetails] = useState(null);

    const fetchSellerDetails = useCallback(async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/sellerProfile`, {
                method: "GET",
                headers: {
                    jwttoken: jwtToken,
                    refreshToken: refreshToken
                }
            });
            const y = await x.json();
            if (!y.success) {
                if (y.err === "Refresh JWT Token!") {
                    setJwtToken(y.jwt);
                    setJwtTokenGlobal(y.jwt);
                    setSellerDetails(null);
                }
                else {
                    setSellerDetails(null);
                    enqueueSnackbar("Please login as a seller to view seller details!", {
                        variant: "error"
                    });
                    router.push("/");
                }
            }
            else {
                setSellerDetails(y.sellerDetails);
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [jwtToken, refreshToken, router, setJwtToken]);

    useEffect(() => {
        //fetch user details
        if (jwtToken && refreshToken)
            fetchSellerDetails();
    }, [jwtToken, refreshToken, router, fetchSellerDetails]);

    useEffect(() => {
        const unneuDataStore = JSON.parse(localStorage.getItem("unneuDataStore"));
        const store = unneuDataStore.state;
        setJwtToken(store.jwtToken);
        setRefreshToken(store.refreshToken);
    }, []);

    if (!sellerDetails)
        return <main className="h-full w-full"></main>

    return <main className="relative">
        <ProfileSection sellerDetails={sellerDetails} />
        <ItemsSections sellerDetails={sellerDetails} />
    </main>
}