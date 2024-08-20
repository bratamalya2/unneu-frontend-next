"use client";

import { Libre_Baskerville } from "next/font/google";
import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";

import LeftLeaf from "@/../public/left-leaf.png";
import RightLeaf from "@/../public/right-leaf.png";

const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"]
});

export default function SignUpPopup({ showSignUp, hideSignUp }) {
    const [isSellerSelected, setIsSellerSelected] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(null);
    const [timerObj, setTimerObj] = useState(null);

    useEffect(() => {
        if (isOTPSent) {
            if (!timerObj)
                setTimer(60);
            setTimerObj(setInterval(() => {
                setTimer(x => {
                    if (x > 0)
                        return x - 1;
                    else
                        return x;
                });
            }, 1000));
        }
    }, [isOTPSent, timerObj]);

    useEffect(() => {
        if (timer === 0) {
            clearInterval(timerObj);
            setTimerObj(null);
        }
    }, [timer, timerObj]);

    const resendOTP = () => {
        if (timer === 0) {
            setTimerObj(null);
            setIsOTPSent(false);
            setTimeout(() => {
                setIsOTPSent(true);
            }, 1000);
            //send OTP; communicate with backend
        }
    };

    return <>
        <Modal show={showSignUp} onHide={hideSignUp} className="mt-[100px]">
            <Modal.Body className="px-4 flex flex-col flex-nowrap items-center rounded-[32px]">
                <p className={`${libreBaskerville.className} text-[32px] text-[#4C4C4C]`}>Sign up</p>
                <div className={`flex flex-row flex-nowrap items-center justify-center ${libreBaskerville.className} text-[20px] mt-8`}>
                    <div
                        className={`py-[9px] px-[36px] rounded-tl-[8px] rounded-bl-[8px] ${isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-l-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-l-2 border-[#CECECE]"}`}
                        onClick={() => setIsSellerSelected(true)}
                    >
                        Seller
                    </div>
                    <div
                        className={`py-[9px] px-[36px] rounded-tr-[8px] rounded-br-[8px] ${!isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-r-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-r-2 border-[#CECECE]"}`}
                        onClick={() => setIsSellerSelected(false)}
                    >
                        Buyer
                    </div>
                </div>
                <p className={`${libreBaskerville.className} text-2xl uppercase mt-8 mb-4`}>{isSellerSelected ? "For Reseller" : "For Buyer"}</p>
                {
                    isSellerSelected ? (
                        <>
                            <p className="text-3xl font-light uppercase mt-3 mb-2">
                                GET <span className="font-semibold text-[#FE9135]">RS 100 /- </span> EXTRA
                            </p>
                            <p className="text-[15px] font-light">on selling your first item.</p>
                        </>
                    ) : (
                        <>
                            <p className="text-3xl font-light uppercase mt-3 mb-2">
                                GET <span className="font-semibold text-[#FE9135]">RS 100 /- </span> OFF
                            </p>
                            <p className="text-[15px] font-light">on your first purchase.</p>
                        </>
                    )
                }
                {
                    isSellerSelected && (
                        <button className="bg-[#FE9135] text-white uppercase font-semibold text-xl py-[12px] px-[50px] rounded-[16px] mt-[80px] mb-[30px]">
                            start selling
                        </button>
                    )
                }
                {
                    !isSellerSelected && (
                        <>
                            <p className="text-[#646464] font-medium self-start mt-10">Enter phone number</p>
                            <input
                                type="text"
                                className="rounded-[12px] w-full py-[10px] px-[16px] border-2 border-[#E05F1D] my-2 self-start"
                                placeholder="+91 94XXXXXXXX"
                                style={{
                                    boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                }}
                                onChange={e => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                        </>
                    )
                }
                {
                    !isOTPSent && !isSellerSelected && (
                        <button className="w-full mx-auto rounded-[16px] text-white bg-[#FE9135] py-[10px] text-[20px] font-semibold my-4" onClick={() => {
                            setIsOTPSent(true);
                        }}>Verify</button>
                    )
                }
                {
                    isOTPSent && !isSellerSelected && (
                        <>
                            <input
                                type="number"
                                className="rounded-[12px] w-full py-[10px] px-[16px] border-2 border-[#E05F1D] my-2 self-start"
                                style={{
                                    boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                }}
                                placeholder="OTP"
                                onChange={e => setOtp(e.target.value)}
                                value={otp}
                            />
                            <button className="w-full mx-auto rounded-[16px] text-white bg-[#FE9135] py-[10px] text-[20px] font-semibold my-4">
                                Verify OTP
                            </button>
                            <p className="text-[#8F8F8F] text-[14px] text-center">Didnt get OTP ? <span className={`text-[#6C6C6C] font-medium ${timer === 0 ? "hover:cursor-pointer" : "hover:cursor-wait"}`} onClick={resendOTP}>Resend</span> {
                                timer > 0 && timer && (
                                    <span>
                                        OTP in <span className="text-red-500">{timer} seconds</span>
                                    </span>
                                )}
                            </p>
                            <p className="text-xs mt-3">By selecting sign up, you agree to our terms of service and privacy policy</p>
                        </>
                    )
                }
            </Modal.Body>
        </Modal>
    </>
}