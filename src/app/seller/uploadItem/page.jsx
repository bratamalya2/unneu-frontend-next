"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import { useUnneuDataStore } from "@/store/store";

import Left from "@/components/sellerUploadItem/left";
import Right from "@/components/sellerUploadItem/right";
import Color from "@/components/sellerUploadItem/color";

export default function UploadItem() {
    const router = useRouter();
    const [jwtToken, setJwtToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const setJwtTokenGlobal = useUnneuDataStore(store => store.setJwtToken);
    const [sellerDetails, setSellerDetails] = useState(null);

    useEffect(() => {
        const unneuDataStore = JSON.parse(localStorage.getItem("unneuDataStore"));
        const store = unneuDataStore.state;
        setJwtToken(store.jwtToken);
        setRefreshToken(store.refreshToken);
    }, []);

    return <main className="relative px-[5%] mb-[90px]">
        <p className="mt-[60px] mb-[45px] text-4xl font-medium">Product information</p>
        <div className="flex flex-row flex-nowrap justify-between">
            <div className="w-[48%] flex flex-col flex-nowrap items-center">
                <Left />
                <Color />
            </div>
            <Right />
        </div>
    </main>
}