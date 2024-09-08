"use client";

import { useState, useEffect, useCallback } from "react";
import { useUnneuDataStore } from "@/store/store";
import { useRouter } from "next/navigation";

import Error from "next/error";

import RegisterStage from "@/components/sellerRegister/registerStage";
import PersonalInfoForm from "@/components/sellerRegister/personalInfoForm";
import SellerPickupProfile from "@/components/sellerRegister/sellerPickupProfile";
import SellerPickupForm from "@/components/sellerRegister/sellerPickupForm";
import SetupPaymentType from "@/components/sellerRegister/setupPaymentType";

export default function Register({ params }) {
    const router = useRouter();
    const phoneNumber = useUnneuDataStore(store => store.phoneNumber);
    const [x, setX] = useState(null);

    const fetchStage = useCallback(async () => {
        try {
            if (phoneNumber.length) {
                const a = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register/getStage`, {
                    method: "GET",
                    headers: {
                        "phonenumber": phoneNumber
                    }
                });
                const b = await a.json();
                setX(b);
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [phoneNumber]);

    /*
    useEffect(() => {
        if (!phoneNumber.length)
            router.push(`/seller/register/1`);
    }, [phoneNumber, router]);

    useEffect(() => {
        fetchStage();
    }, [fetchStage]);

    useEffect(() => {
        if (x) {
            if (x.success) {
                console.log(x.stage, params.slug);
                if (x.stage !== params.slug) {
                    if (x.stage === '4')
                        router.push("/seller");
                    else if (x.stage === '0')
                        router.push("/seller/register/1");
                    else
                        router.push(`/seller/register/${x.stage}`);
                }
            }
        }
    }, [x, router, params.slug]);
    */

    if (isNaN(parseInt(params.slug)) || parseInt(params.slug) > 3 || parseInt(params.slug) < 1)
        return <Error statusCode={404} />

    return <main className="relative">
        <RegisterStage stage={params.slug} />
        {params.slug === "1" && <PersonalInfoForm />}
        {params.slug === "2" && <SellerPickupProfile />}
        {params.slug === "2" && <SellerPickupForm />}
        {params.slug === "3" && <SetupPaymentType />}
    </main>
}