"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Error from "next/error";

import Nav from "@/components/purchase/nav";
import Cart from "@/components/purchase/cart";

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

    return <main className="w-full relative">
        <Nav stage={stage} />
        {
            stage === 1 && <Cart />
        }
    </main>
}