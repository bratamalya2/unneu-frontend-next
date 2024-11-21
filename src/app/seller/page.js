"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import Error from "next/error";

import { useUnneuDataStore } from "@/store/store";

import ProfileSection from "@/components/seller/profileSection";
import ItemsSections from "@/components/seller/itemsSections";
import ProfileSectionForBuyer from "@/components/sellerProfileForBuyer/profileSection";
import ItemsSectionsForBuyer from "@/components/sellerProfileForBuyer/itemsSections";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [sellerDetails, setSellerDetails] = useState(null);
    const [isSellerProfileExists, setIsSellerProfileExists] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const setJwtTokenGlobal = useUnneuDataStore(store => store.setJwtToken);
    const phoneNumber = useUnneuDataStore(store => store.phoneNumber);
    const [x, setX] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsSellerProfileExists(true);
                setSellerDetails(y.sellerDetails);
                setIsLoaded(true);
            }
        }
        catch (err) {
            console.log(err);
            setIsSellerProfileExists(false);
            setIsLoaded(true);
        }
    }, [jwtToken, refreshToken, router, setJwtToken]);

    const fetchSellerDetailsForBuyer = async () => {
        try {
            const sellerid = searchParams.get("sellerId");
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/sellerProfileForBuyer`, {
                method: "GET",
                headers: {
                    sellerid
                }
            });
            const y = await x.json();
            if (y.success) {
                setIsSellerProfileExists(true);
                setSellerDetails(y.sellerDetails);
            }
            else
                setIsSellerProfileExists(false);
            setIsLoaded(true);
        }
        catch (err) {
            console.log(err);
            setIsLoaded(true);
        }
    };

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
            else {
                setIsLoading(false);
                setX({
                    success: true,
                    stage: "0"
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (!searchParams.get("sellerId")) {
            fetchStage();
        }
    }, [fetchStage, searchParams.get("sellerId")]);

    useEffect(() => {
        //fetch user details
        if (jwtToken && refreshToken && !searchParams.get("sellerId"))
            fetchSellerDetails();
    }, [jwtToken, refreshToken, router, fetchSellerDetails]);

    useEffect(() => {
        //fetch for buyer
        if (searchParams.get("sellerId")) {
            setIsLoading(false);
            fetchSellerDetailsForBuyer();
        }
    }, [searchParams.get("sellerId")]);

    useEffect(() => {
        const unneuDataStore = JSON.parse(localStorage.getItem("unneuDataStore"));
        const store = unneuDataStore.state;
        setJwtToken(store.jwtToken);
        setRefreshToken(store.refreshToken);
    }, []);

    useEffect(() => {
        if (x && !searchParams.get("sellerId")) {
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

    console.log(isLoading);

    if (isLoading)
        return null;

    if (!isLoaded)
        return null;

    return <main className="relative top-[80px]">
        {
            !searchParams.get("sellerId") && isLoaded && <>
                <ProfileSection sellerDetails={sellerDetails} />
                <ItemsSections sellerDetails={sellerDetails} />
            </>
        }
        {
            searchParams.get("sellerId") && isSellerProfileExists && isLoaded && <>
                <ProfileSectionForBuyer sellerDetails={sellerDetails} />
                <ItemsSectionsForBuyer sellerDetails={sellerDetails} />
            </>
        }
        {
            !isSellerProfileExists && isLoaded && (
                <Error statusCode={404} />
            )
        }
    </main>
}