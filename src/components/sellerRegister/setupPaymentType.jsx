"use client";

import { useState } from "react";
import Image from "next/image";
import { Libre_Baskerville } from "next/font/google";

import Bank from "@/../public/bank.png";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function SetupPaymentType() {
    const [selectedPaymentType, setSelectedPaymentType] = useState("");
    const [accountType, setAccountType] = useState("");

    return <section className="mt-[105px] px-[10%]">
        <p className={`${lbFont.className} text-4xl`}>Set up Payment type</p>
        <div className="relative mt-[56px] w-[60%] h-[95px] rounded-[24px] border border-[#BFBFBF]">
            <p className="absolute font-medium top-[20px] left-[3%]">Enter UPI ID</p>
            <p className="absolute bottom-[20px] left-[3%]">Pay with installed apps or others</p>
            <input
                type="radio"
                name="payment_type"
                value="upi"
                className="absolute w-[32px] h-[32px] right-[3%] top-[30%] custom-radio"
                onChange={e => setSelectedPaymentType(e.target.value)}
            />
        </div>
        {
            selectedPaymentType === "upi" && (
                <>
                    <div className="mt-[42px] flex flex-row flex-nowrap justify-between items-center w-[60%]">
                        <input
                            type="text"
                            className="w-[70%] border border-[#BFBFBF] bg-[#F9F9F9] rounded-[12px] py-[20px] px-3"
                            placeholder="Enter your UPI Id here"
                        />
                        <button className="w-[25%] rounded-[24px] py-[20px] bg-[#FE9135] text-white text-xl font-medium">Verify</button>
                    </div>
                    <button className="mt-[36px] bg-[#FE9135] rounded-[24px] py-[20px] w-[60%] text-xl font-medium text-white">Save & submit</button>
                </>
            )
        }
        <div className="relative mt-[56px] w-[60%] h-[95px] rounded-[24px] border border-[#BFBFBF]">
            <Image src={Bank} alt="bank" className="w-[24px] h-[24px] absolute top-[20px] left-[3%]" />
            <p className="absolute font-medium top-[20px] left-[9%]">Enter bank details</p>
            <p className="absolute bottom-[20px] left-[3%]">Pay with installed apps or others</p>
            <input
                type="radio"
                name="payment_type"
                value="bank"
                className="absolute w-[32px] h-[32px] right-[3%] top-[30%] custom-radio"
                onChange={e => setSelectedPaymentType(e.target.value)}
            />
        </div>
        {
            selectedPaymentType === "bank" && (
                <div className="mt-[42px] flex flex-col flex-nowrap w-[60%]">
                    <p className="text-xl font-medium">Account holder name</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                    />
                    <p className="mt-[36px] text-xl font-medium">Bank name</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="HDFC , Kotak etc.."
                    />
                    <p className="mt-[36px] text-xl font-medium">Account Type</p>
                    <div className="mt-[18px] w-[70%] flex flex-row items-center justify-between">
                        <div className="flex flex-row flex-nowrap">
                            <input
                                type="radio"
                                name="account_type"
                                value="savings"
                                className="relative w-[32px] h-[32px] custom-radio"
                                onChange={e => setAccountType(e.target.value)}
                            />
                            <label className="text-[18px] ml-5">Savings account</label>
                        </div>
                        <div className="flex flex-row flex-nowrap">
                            <input
                                type="radio"
                                name="account_type"
                                value="current"
                                className="relative w-[32px] h-[32px] custom-radio"
                                onChange={e => setAccountType(e.target.value)}
                            />
                            <label className="text-[18px] ml-5">Current account</label>
                        </div>
                    </div>
                    <p className="mt-[36px] text-xl font-medium">Bank account number</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="Type here"
                    />
                    <p className="mt-[36px] text-xl font-medium">Re-enter Bank account number</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="Type here"
                    />
                    <p className="mt-[36px] text-xl font-medium">Branch</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="Type here"
                    />
                    <p className="mt-[36px] text-xl font-medium">IFSC code</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="Type here"
                    />
                    <button className="mt-[36px] bg-[#FE9135] rounded-[24px] py-[25px] w-full text-xl font-medium text-white">Save & submit</button>
                </div>
            )
        }
    </section >
}