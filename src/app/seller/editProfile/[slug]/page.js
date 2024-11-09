"use client";

import { useState, useEffect } from "react";
import Error from "next/error";
import { useRouter } from "next/navigation";

import { useUnneuDataStore } from "@/store/store";

import RegisterStage from "@/components/sellerRegister/registerStage";
import PersonalInfoForm from "@/components/sellerEditProfile/personalInfoForm";
import SellerPickupProfile from "@/components/sellerRegister/sellerPickupProfile";
import SellerPickupForm from "@/components/sellerRegister/sellerPickupForm";
import SetupPaymentType from "@/components/sellerRegister/setupPaymentType";

export default function Register({ params }) {
    const router = useRouter();
    const [sellerDetails, setSellerDetails] = useState();
    const [jwtToken, setJwtToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const setJwtTokenAtStore = useUnneuDataStore(store => store.setJwtToken);
    const setRefreshTokenAtStore = useUnneuDataStore(store => store.setRefreshToken);

    const fetchSellerDetails = async () => {
        try {
            console.log("fetching!");
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/getSellerDetails`, {
                method: "GET",
                headers: {
                    "jwttoken": jwtToken,
                    "refreshtoken": refreshToken
                }
            });
            const y = await x.json();
            console.log(y);
            if (y.success)
                setSellerDetails(y.sellerDetails);
            else {
                if (y.err === "Refresh JWT Token!") {
                    setJwtToken(y.jwt);
                    setJwtTokenAtStore(y.jwt);
                    const x2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/getSellerDetails`, {
                        method: "GET",
                        headers: {
                            "jwttoken": y.jwt,
                            "refreshtoken": refreshToken
                        }
                    });
                    const y2 = await x2.json();
                    if (y2.success)
                        setSellerDetails(y2.sellerDetails);
                    else {
                        setJwtTokenAtStore("");
                        setRefreshTokenAtStore("");
                        router.push("/");
                    }
                }
                else {
                    setJwtTokenAtStore("");
                    setRefreshTokenAtStore("");
                    router.push("/");
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem("unneuDataStore")).state;
        setJwtToken(store.jwtToken);
        setRefreshToken(store.refreshToken);
        if (isNaN(parseInt(params.slug)) || parseInt(params.slug) > 3 || parseInt(params.slug) < 1)
            return;

    }, [params.slug]);

    useEffect(() => {
        if (jwtToken.length > 0 && refreshToken.length > 0)
            fetchSellerDetails();
    }, [jwtToken, refreshToken]);

    if (isNaN(parseInt(params.slug)) || parseInt(params.slug) > 3 || parseInt(params.slug) < 1)
        return <Error statusCode={404} />

    return <main className="relative top-[80px]">
        <RegisterStage stage={params.slug} />
        {params.slug === "1" && <PersonalInfoForm sellerDetails={sellerDetails} />}
        {params.slug === "2" && <SellerPickupProfile />}
        {params.slug === "2" && <SellerPickupForm />}
        {params.slug === "3" && <SetupPaymentType />}
    </main>
}