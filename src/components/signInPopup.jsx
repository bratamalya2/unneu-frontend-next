"use client";

import { Libre_Baskerville } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";

import LeftLeaf from "@/../public/left-leaf.png";
import RightLeaf from "@/../public/right-leaf.png";
import LoginSide from "@/../public/login-side.png";

const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"]
});

export default function SignInPopup({ showSignIn, hideSignIn }) {
    const router = useRouter();
    const [isSellerSelected, setIsSellerSelected] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(null);
    const [timerObj, setTimerObj] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const submitOTP = async () => {
        try {
            if (otp.length === 6) {
                console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        phoneNumber,
                        otp
                    })
                });
                const y = await x.json();
                if (!y.success) {
                    setShowError(true);
                    setErrorMessage(y.err);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
                }
                else {
                    router.push(`/home`);
                }
            }
            else {
                setShowError(true);
                setErrorMessage("Enter a 6 digit OTP!");
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            }
            setTimeout(() => {
                hideSignIn();
            }, 3000);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!showSignIn) {
            setTimer(null);
            setTimerObj(null);
            setPhoneNumber("");
            setIsOTPSent(false);
            setOtp("");
        };
    }, [showSignIn]);

    useEffect(() => {
        if (isOTPSent) {
            if (!timerObj) {
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
            <Modal.Body className="bg-[#FEE9BC] rounded-[32px] flex flex-row flex-nowrap">
                <Image src={LoginSide} alt="login-side" className="w-[50%] hidden sm:inline-block" />
                <div className="w-full sm:w-[50%] px-4 inline-flex flex-col flex-nowrap items-center">
                    <div className={`flex flex-row flex-nowrap items-center justify-center ${libreBaskerville.className} text-[20px] mt-8 sm:mt-0`}>
                        <div
                            className={`py-[9px] sm:py-[3px] px-[36px] rounded-tl-[8px] rounded-bl-[8px] ${isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-l-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-l-2 border-[#CECECE]"}`}
                            onClick={() => setIsSellerSelected(true)}
                        >
                            Seller
                        </div>
                        <div
                            className={`py-[9px] sm:py-[3px] px-[36px] rounded-tr-[8px] rounded-br-[8px] ${!isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-r-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-r-2 border-[#CECECE]"}`}
                            onClick={() => setIsSellerSelected(false)}
                        >
                            Buyer
                        </div>
                    </div>
                    <p className="text-[15px] sm:text-[12px] text-center text-[#646464] my-4 sm:my-0">Enter your contact Number to log in</p>
                    <p className="text-[#646464] font-medium sm:text-sm self-start">Enter phone number</p>
                    <input
                        type="text"
                        className="rounded-[12px] py-[10px] sm:py-[5px] px-[12px] border-2 border-[#E05F1D] my-2 self-start max-w-[100%]"
                        placeholder="+91 94XXXXXXXX"
                        style={{
                            boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                        }}
                        onChange={e => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                    />
                    {
                        !isOTPSent && (
                            <button className="w-full mx-auto rounded-[16px] text-white bg-[#FE9135] py-[10px] sm:py-[5px] text-[20px] sm:text-normal font-semibold my-4 sm:my-1 max-w-[100%]" onClick={() => {
                                setIsOTPSent(true);
                            }}>Verify</button>
                        )
                    }
                    {
                        isOTPSent && (
                            <>
                                <input
                                    type="number"
                                    className="rounded-[12px] py-[10px] sm:py-[5px] px-[16px] border-2 border-[#E05F1D] my-2 self-start max-w-[100%]"
                                    style={{
                                        boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                    placeholder="OTP"
                                    onChange={e => setOtp(e.target.value)}
                                    value={otp}
                                />
                                <button className="w-full mx-auto rounded-[16px] text-white bg-[#FE9135] py-[10px] text-[20px] font-semibold mt-4" onClick={submitOTP}>
                                    Verify OTP
                                </button>
                            </>
                        )
                    }
                    {
                        showError && (
                            <p className="text-[#8F8F8F] text-[14px] sm:text-xs text-red-500 font-bold text-center my-2">{errorMessage}</p>
                        )
                    }
                    {
                        isOTPSent && (
                            <p className="text-[#8F8F8F] text-[14px] sm:text-xs text-center mt-3">Didnt get OTP ? <span className={`text-[#6C6C6C] font-medium ${timer === 0 ? "hover:cursor-pointer" : "hover:cursor-wait"}`} onClick={resendOTP}>Resend</span> {
                                timer > 0 && timer && (
                                    <span>
                                        OTP in <span className="text-red-500">{timer} seconds</span>
                                    </span>
                                )}
                            </p>
                        )
                    }
                    <div className="sm:hidden flex flex-row flex-nowrap items-center justify-around w-full">
                        <Image src={LeftLeaf} alt="left-leaf" className="w-[48%]" />
                        <Image src={RightLeaf} alt="right-leaf" className="w-[48%]" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>;
}