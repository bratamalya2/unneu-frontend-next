"use client";

import { useState, useRef } from "react";
import { Libre_Baskerville } from "next/font/google";

import "@/styles/personalInfoForm.css";

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });

export default function PersonalInfoForm() {
    const [email, setEmail] = useState("");
    const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
    const [phoneOtp, setPhoneOtp] = useState("");
    const [pan, setPan] = useState("");
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [gst, setGst] = useState("");
    const dateRef = useRef(null);

    return <section className="mt-[105px] flex flex-row flex-nowrap justify-between pr-[5%]">
        <aside className="h-[900px] w-[46%] rounded-tr-[36px] rounded-br-[36px]" id="seller-register-personal-info-form-hero"></aside>
        <aside className="w-[50%]">
            <p className={`${lbFont.className} text-3xl`}>Add Personal info</p>
            {
                !isEmailOtpSent && (
                    <>
                        <p className="mt-[42px] text-xl">Enter email ID <span className="text-[#B73636]">*</span></p>
                        <div className="relative">
                            <input
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter your email"
                                className="mt-[18px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                style={{
                                    boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                }}
                            />
                            <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={() => {
                                setIsEmailOtpSent(true);
                            }}>Send OTP</div>
                        </div>
                    </>
                )
            }
            {
                isEmailOtpSent && (
                    <>
                        <p className="mt-[42px] text-xl">Enter OTP sent to email <span className="text-[#B73636]">*</span></p>
                        <div className="relative">
                            <input
                                type="number"
                                onChange={e => setEmailOtp(e.target.value)}
                                value={emailOtp}
                                placeholder="Enter OTP"
                                className="mt-[18px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                style={{
                                    boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                }}
                            />
                            <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={() => {
                                setIsEmailOtpSent(true);
                            }}>Verify OTP</div>
                        </div>
                    </>
                )
            }
            {
                !isPhoneOtpSent && (
                    <>
                        <p className="mt-[42px] text-xl">Enter email ID <span className="text-[#B73636]">*</span></p>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={e => setPhoneNo(e.target.value)}
                                value={phoneNo}
                                placeholder="+91 (Enter 10 digit phone number)"
                                className="mt-[18px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                style={{
                                    boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                }}
                            />
                            <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={() => {
                                setIsPhoneOtpSent(true);
                            }}>Send OTP</div>
                        </div>
                    </>
                )
            }
            {
                isPhoneOtpSent && (
                    <>
                        <p className="mt-[42px] text-xl">Enter OTP sent to phone <span className="text-[#B73636]">*</span></p>
                        <div className="relative">
                            <input
                                type="number"
                                onChange={e => setPhoneOtp(e.target.value)}
                                value={phoneOtp}
                                placeholder="Enter OTP"
                                className="mt-[18px] w-full py-[12px] pl-5 pr-[100px] rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                                style={{
                                    boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                                }}
                            />
                            <div className="absolute top-[28px] right-2 text-[18px] text-[#00000080] hover:cursor-pointer" onClick={() => {
                                setIsPhoneOtpSent(true);
                            }}>Verify OTP</div>
                        </div>
                    </>
                )
            }
            <p className="mt-[42px] text-xl">Enter PAN details <span className="text-[#B73636]">*</span></p>
            <input
                type="text"
                value={pan}
                onChange={e => setPan(e.target.value)}
                placeholder="PAN No."
                className="mt-[18px] w-full py-[12px] pl-5 pr-5 rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                style={{
                    boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                }}
            />
            <div className="mt-[18px] flex flex-row flex-nowrap items-center justify-between">
                <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Full name"
                    className="w-[48%] py-[12px] pl-5 pr-5 rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                    style={{
                        boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                    }}
                />
                <div className="relative w-[48%]" id="seller-details-dob-container">
                    <input
                        type="text"
                        value={dob}
                        ref={dateRef}
                        onFocus={() => {
                            dateRef.current.type = "date";
                        }}
                        onBlur={() => {
                            dateRef.current.type = "text";
                        }}
                        onChange={e => setDob(e.target.value)}
                        placeholder="Date of birth"
                        id="seller-details-dob"
                        className="w-full py-[12px] pl-[15%] pr-5 rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                        style={{
                            boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                        }}
                    />
                </div>
            </div>
            <p className="mt-[42px] text-xl">Enter GSTIN <span className="text-[#ADA6A6]">(optional)</span></p>
            <input
                type="text"
                value={gst}
                onChange={e => setGst(e.target.value)}
                placeholder="15 digit GST number"
                className="mt-[18px] w-full py-[12px] pl-5 pr-5 rounded-[12px] border-[0.6px] border-[#00000080] bg-[#F9F9F9]"
                style={{
                    boxShadow: " 0px 11px 53.8px 4px rgba(81, 69, 55, 0.05)"
                }}
            />
            <button className="bg-[#FE9135] rounded-[24px] w-full py-[25px] text-xl mt-[50px] text-white">Save and Continue</button>
        </aside>
    </section>
}