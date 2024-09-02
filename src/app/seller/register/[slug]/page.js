"use client";

import Error from "next/error";

import RegisterStage from "@/components/sellerRegister/registerStage";
import PersonalInfoForm from "@/components/sellerRegister/personalInfoForm";
import SellerPickupProfile from "@/components/sellerRegister/sellerPickupProfile";
import SellerPickupForm from "@/components/sellerRegister/sellerPickupForm";
import SetupPaymentType from "@/components/sellerRegister/setupPaymentType";

export default function Register({ params }) {
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