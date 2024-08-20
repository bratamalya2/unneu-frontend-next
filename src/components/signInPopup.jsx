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

export default function SignInPopup({ showSignIn, hideSignIn }) {
    const [isSellerSelected, setIsSellerSelected] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(null);
    const [timerObj, setTimerObj] = useState(null);

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

    return <>
        <Modal show={showSignIn} onHide={hideSignIn} className="mt-[150px]">
            <Modal.Body className="px-4 flex flex-col flex-nowrap items-center bg-[#FEE9BC] rounded-[32px]">
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
                <p className="text-[15px] text-center text-[#646464] my-4">Enter your contact Number to log in</p>
                <p className="text-[#646464] font-medium self-start">Enter phone number</p>
                <input
                    type="text"
                    className="rounded-[12px] py-[10px] px-[16px] border-2 border-[#E05F1D] my-2 self-start"
                    placeholder="+91 94XXXXXXXX"
                    style={{
                        boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                    }}
                    onChange={e => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
                {
                    !isOTPSent && (
                        <button className="w-full mx-auto rounded-[16px] text-white bg-[#FE9135] py-[10px] text-[20px] font-semibold my-4" onClick={() => {
                            setIsOTPSent(true);
                        }}>Verify</button>
                    )
                }
                {
                    isOTPSent && (
                        <>
                            <input
                                type="number"
                                className="rounded-[12px] py-[10px] px-[16px] border-2 border-[#E05F1D] my-2 self-start"
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
                        </>
                    )
                }
                <div className="flex flex-row flex-nowrap items-center justify-around w-full">
                    <Image src={LeftLeaf} alt="left-leaf" className="w-[48%]" />
                    <Image src={RightLeaf} alt="right-leaf" className="w-[48%]" />
                </div>
            </Modal.Body>
        </Modal>
    </>;
}