"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Error from "next/error";

import Nav from "@/components/purchase/nav";
import Cart from "@/components/purchase/cart";
import Address from "@/components/purchase/address";

import Payment from "@/components/purchase/payment";

export default function Purchase() {
    const searchParams = useSearchParams();
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const slug = searchParams.get("slug");
        switch (slug) {
            case "cart":
                setStage(1);
                break;
            case "address":
                setStage(2);
                break;
            case "payment":
                setStage(3);
                break;
            default:
                setStage(0);
        }
    }, []);

    if (!stage)
        return <Error statusCode={404} />

    return <main className="w-full relative mt-[80px] lg:mt-[120px]">
        <Nav stage={stage} />
        {
            stage === 1 && <Cart />
        }
        {
            stage === 2 && <Address />
        }
        {
            stage === 3 && <Payment />
        }
    </main>
}