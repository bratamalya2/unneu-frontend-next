"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { Libre_Baskerville } from "next/font/google";

import { useUnneuDataStore } from "@/store/store";

import UPI from "@/../public/upi-icon.svg";
import Bank from "@/../public/bank.png";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function SetupPaymentType() {
    const router = useRouter();
    const sellerPhoneNumber = useUnneuDataStore(store => store.phoneNumber);
    const [selectedPaymentType, setSelectedPaymentType] = useState("");
    const [upiId, setUpiId] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountNumber2, setAccountNumber2] = useState("");
    const [accountNumberErrorText, setAccountNumberErrorText] = useState("");
    const [branch, setBranch] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [accountType, setAccountType] = useState("");

    const handleSubmit = async () => {
        try {
            if (accountNumber.length === accountNumber2.length && accountNumber2.length === 0 && selectedPaymentType === "bank") {
                enqueueSnackbar("Please enter bank account number!", {
                    variant: "error"
                });
            }
            else if (accountNumber.length === accountNumber2.length) {
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register/3`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "phoneNumber": sellerPhoneNumber,
                        "paymentType": selectedPaymentType,
                        "upiId": upiId,
                        "accountHolderName": accountHolderName,
                        "bankName": bankName,
                        "accountType": accountType,
                        "accountNumber": accountNumber,
                        "branch": branch,
                        "ifscCode": ifscCode
                    })
                });
                const y = await x.json();
                if (y.success)
                    router.push("/seller");
                else
                    enqueueSnackbar(y.err, {
                        variant: "error"
                    });
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (accountNumber.length > 0 && accountNumber2.length > 0 && accountNumber !== accountNumber2)
            setAccountNumberErrorText("Bank account numbers don't match!");
        else
            setAccountNumberErrorText("");
    }, [accountNumber, accountNumber2]);

    return <section className="mt-[105px] px-[10%]">
        <p className={`${lbFont.className} text-4xl`}>Set up Payment type</p>
        <div className="relative mt-[56px] w-[60%] h-[95px] rounded-[24px] border border-[#BFBFBF]">
            <Image src={UPI} alt="upi" className="w-[74px] h-[20px] absolute top-[40%] left-[3%]" />
            <p className="absolute text-[18px] font-medium top-[35%] left-[15%]">Enter UPI ID</p>
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
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                        />
                        <button className="w-[25%] rounded-[24px] py-[20px] bg-[#FE9135] text-white text-xl font-medium">Verify</button>
                    </div>
                </>
            )
        }
        <div className="relative mt-[56px] w-[60%] h-[95px] rounded-[24px] border border-[#BFBFBF]">
            <Image src={Bank} alt="bank" className="w-[24px] h-[24px] absolute top-[40%] left-[3%]" />
            <p className="absolute text-[18px] font-medium top-[40%] left-[9%]">Enter bank details</p>
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
                        value={accountHolderName}
                        onChange={e => setAccountHolderName(e.target.value)}
                    />
                    <p className="mt-[36px] text-xl font-medium">Bank name</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="HDFC , Kotak etc.."
                        value={bankName}
                        onChange={e => setBankName(e.target.value)}
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
                        value={accountNumber}
                        onChange={e => setAccountNumber(e.target.value)}
                    />
                    <p className="mt-[36px] text-xl font-medium">Re-enter Bank account number</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="Type here"
                        value={accountNumber2}
                        onChange={e => setAccountNumber2(e.target.value)}
                    />
                    {
                        accountNumberErrorText.length > 0 && (
                            <p className="mt-[12px] text-sm font-medium text-red-500">{accountNumberErrorText}</p>
                        )
                    }
                    <p className="mt-[36px] text-xl font-medium">Branch</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="Type here"
                        value={branch}
                        onChange={e => setBranch(e.target.value)}
                    />
                    <p className="mt-[36px] text-xl font-medium">IFSC code</p>
                    <input
                        type="text"
                        className="mt-[18px] w-full h-[64px] border-[0.6px] border-[#00000080] bg-[#F9F9F9] rounded-[12px] px-3"
                        placeholder="Type here"
                        value={ifscCode}
                        onChange={e => setIfscCode(e.target.value)}
                    />
                </div>
            )
        }
        <button className="mt-[36px] bg-[#FE9135] rounded-[24px] py-[25px] w-[60%] text-xl font-medium text-white" onClick={handleSubmit}>Save & submit</button>
    </section >
}