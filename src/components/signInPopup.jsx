"use client";

import { Libre_Baskerville } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";

import { useUnneuDataStore } from "@/store/store";

import LeftLeaf from "@/../public/left-leaf.png";
import RightLeaf from "@/../public/right-leaf.png";
import LoginSide from "@/../public/login-side.png";

const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"]
});

export default function SignInPopup({ showSignIn, hideSignIn }) {
    const router = useRouter();
    const [isSellerSelected, setIsSellerSelected] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(null);
    const [timerObj, setTimerObj] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const setJwtToken = useUnneuDataStore(store => store.setJwtToken);
    const setRefreshToken = useUnneuDataStore(store => store.setRefreshToken);
    const setBuyerSelected = useUnneuDataStore(store => store.setBuyerSelected);
    const setSellerSelected = useUnneuDataStore(store => store.setSellerSelected);

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
                    setJwtToken(y.jwtToken);
                    setRefreshToken(y.refreshToken);
                    if (isSellerSelected)
                        router.push("/seller/home");
                    else
                        router.push("/buyer/home");
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
            clearInterval(timerObj);
            setTimer(null);
            setTimerObj(null);
            setPhoneNumber("");
            setIsOTPSent(false);
            setOtp("");
        };
    }, [showSignIn, timerObj]);

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

    useEffect(() => {
        if (isSellerSelected) {
            setSellerSelected();
        }
        else {
            setBuyerSelected();
        }
    }, [isSellerSelected, setBuyerSelected, setSellerSelected]);

    return <>
        <Modal show={showSignIn} onHide={hideSignIn} className="mt-[150px] mb-[50px]">
            <Modal.Body className="bg-[#FEE9BC] rounded-[32px] flex flex-row flex-nowrap sm:justify-between sm:h-[500px] md:h-[640px]">
                <Image src={LoginSide} alt="login-side" className="h-full max-w-[57%] hidden sm:inline-block" />
                <div className="w-full sm:max-w-[40%] px-1 inline-flex flex-col flex-nowrap items-center justify-center">
                    <p className={`text-[#4C4C4C] ${libreBaskerville.className} text-2xl mb-3`}>Log in</p>
                    <div className={`max-w-[90%] flex flex-row flex-nowrap items-center justify-center ${libreBaskerville.className} text-[20px] lg:text-2xl mt-8 sm:mt-0`}>
                        <div
                            className={`py-[9px] sm:py-[3px] px-[25px] sm:px-[12px] rounded-tl-[8px] rounded-bl-[8px] ${isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-l-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-l-2 border-[#CECECE]"}`}
                            onClick={() => setIsSellerSelected(true)}
                        >
                            Seller
                        </div>
                        <div
                            className={`py-[9px] sm:py-[3px] px-[25px] sm:px-[12px] rounded-tr-[8px] rounded-br-[8px] ${!isSellerSelected ? "bg-[#E05F1D] text-white border-y-2 border-r-2 border-[#E05F1D]" : "bg-white text-[#4C4C4C] border-y-2 border-r-2 border-[#CECECE]"}`}
                            onClick={() => setIsSellerSelected(false)}
                        >
                            Buyer
                        </div>
                    </div>
                    <p className="text-[15px] sm:text-sm text-center text-[#646464] my-4 sm:my-0 lg:my-4">Enter your contact number to log in</p>
                    <p className="text-[#646464] font-medium sm:text-sm lg:text-base self-start">Enter phone number</p>
                    <input
                        type="text"
                        className="rounded-[12px] py-[10px] sm:py-[5px] lg:py-[10px] px-[12px] border-2 border-[#E05F1D] my-2 self-start w-[100%]"
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
                                    className="rounded-[12px] py-[10px] sm:py-[5px] lg:py-[10px] px-[16px] border-2 border-[#E05F1D] my-2 self-start w-[100%]"
                                    style={{
                                        boxShadow: "0px 11px 40px 4px rgba(81, 69, 55, 0.05)"
                                    }}
                                    placeholder="OTP"
                                    onChange={e => setOtp(e.target.value)}
                                    value={otp}
                                />
                                <button className="w-full mx-auto rounded-[16px] text-white bg-[#FE9135] py-[10px] sm:py-[5px] text-[20px] font-semibold mt-4" onClick={submitOTP}>
                                    Verify OTP
                                </button>
                            </>
                        )
                    }
                    {
                        showError && (
                            <p className="text-[#8F8F8F] text-[14px] sm:text-xs text-red-500 font-bold text-center my-2 lg:my-4">{errorMessage}</p>
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