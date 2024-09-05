"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUnneuDataStore } from "@/store/store";

export default function Home() {
    const router = useRouter();
    const jwtToken = useUnneuDataStore(store => store.jwtToken);
    const refreshToken = useUnneuDataStore(store => store.refreshToken);

    useEffect(() => {
        //fetch user details
    }, [jwtToken, refreshToken, router]);

    return <main className="relative"></main>
}